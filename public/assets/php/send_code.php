<?php
/**
 * Send Code API Endpoint
 * Generates a 6-digit verification code, saves the pending message details in SQLite,
 * and sends the code to the user's email address using SimpleSMTP.
 */

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');

require_once __DIR__ . '/db.php';
$configFile = __DIR__ . '/config.php';
require_once __DIR__ . '/smtp_helper.php';

if (!file_exists($configFile)) {
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => 'Server configuration missing.']);
    exit;
}
$config = require $configFile;

// 1. Validate request method
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['success' => false, 'error' => 'Invalid request method']);
    exit;
}

// 2. Read input JSON
$input = json_decode(file_get_contents('php://input'), true);
$name = trim($input['name'] ?? '');
$email = trim($input['email'] ?? '');
$subject = trim($input['subject'] ?? '');
$message = trim($input['message'] ?? '');
$lang = trim($input['lang'] ?? 'en');

if (empty($name) || empty($email) || empty($subject) || empty($message)) {
    echo json_encode(['success' => false, 'error' => 'All fields are required / Todos los campos son obligatorios']);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode(['success' => false, 'error' => 'Invalid email address / Correo electrónico no válido']);
    exit;
}

// 3. Purge expired entries
try {
    $now = time();
    $stmt = $db->prepare("DELETE FROM pending_messages WHERE expires_at < :now");
    $stmt->execute([':now' => $now]);
} catch (PDOException $e) {}

// 4. Generate 6-digit code
$code = sprintf("%06d", mt_rand(0, 999999));
$expiresAt = time() + 300; // 5 minutes validity

// 5. Store pending message
try {
    $stmt = $db->prepare("
        INSERT OR REPLACE INTO pending_messages (email, name, subject, message, code, created_at, expires_at, attempts)
        VALUES (:email, :name, :subject, :message, :code, :created_at, :expires_at, 0)
    ");
    $stmt->execute([
        ':email' => $email,
        ':name' => $name,
        ':subject' => $subject,
        ':message' => $message,
        ':code' => $code,
        ':created_at' => $now,
        ':expires_at' => $expiresAt
    ]);
} catch (PDOException $e) {
    echo json_encode(['success' => false, 'error' => 'Failed to save pending message: ' . $e->getMessage()]);
    exit;
}

// 6. Send Email containing the code using SimpleSMTP
$isEs = ($lang === 'es');
$mailSubject = $isEs ? "Código de verificación: $code" : "Verification Code: $code";
$date = date('Y-m-d H:i:s');

$templateFile = $isEs ? '/code_template_es.html' : '/code_template_en.html';
$template = file_get_contents(__DIR__ . $templateFile);
$mailBody = str_replace(
    ['{{NAME}}', '{{CODE}}', '{{DATE}}'],
    [$name, $code, $date],
    $template
);

try {
    $smtp = new SimpleSMTP(
        $config['smtp_host'],
        $config['smtp_port'],
        $config['smtp_secure']
    );

    $smtp->authenticate($config['smtp_user'], $config['smtp_pass']);

    $sent = $smtp->send(
        $config['from_email'],                       // From
        'Felipe Miramontes Web (No-Reply)',          // From Name
        $email,                                      // To
        $mailSubject,                                // Subject
        $mailBody,                                   // Body
        $config['from_email']                        // Reply-To
    );

    if ($sent) {
        echo json_encode(['success' => true, 'message' => 'Verification code sent / Código de verificación enviado']);
    } else {
        throw new Exception('SMTP rejected the message.');
    }

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => 'Failed to send email: ' . $e->getMessage()]);
}
