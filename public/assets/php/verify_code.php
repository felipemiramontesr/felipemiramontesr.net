<?php
/**
 * Verify Code API Endpoint
 * Validates the 6-digit code against SQLite, and if correct, 
 * sends the actual contact form message to Felipe and an auto-reply using SimpleSMTP.
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
$email = trim($input['email'] ?? '');
$code = trim($input['code'] ?? '');

if (empty($email) || empty($code)) {
    echo json_encode(['success' => false, 'error' => 'Email and code are required / Correo y código requeridos']);
    exit;
}

// 3. Query the pending record
try {
    $stmt = $db->prepare("SELECT * FROM pending_messages WHERE email = :email");
    $stmt->execute([':email' => $email]);
    $record = $stmt->fetch(PDO::FETCH_ASSOC);
} catch (PDOException $e) {
    echo json_encode(['success' => false, 'error' => 'Database error: ' . $e->getMessage()]);
    exit;
}

if (!$record) {
    echo json_encode(['success' => false, 'error' => 'No pending request found / No se encontró solicitud pendiente']);
    exit;
}

// 4. Check expiration
$now = time();
if ($now > $record['expires_at']) {
    try {
        $stmt = $db->prepare("DELETE FROM pending_messages WHERE email = :email");
        $stmt->execute([':email' => $email]);
    } catch (PDOException $e) {}
    echo json_encode(['success' => false, 'error' => 'Code has expired / El código ha expirado']);
    exit;
}

// 5. Check maximum attempts
if ($record['attempts'] >= 3) {
    try {
        $stmt = $db->prepare("DELETE FROM pending_messages WHERE email = :email");
        $stmt->execute([':email' => $email]);
    } catch (PDOException $e) {}
    echo json_encode(['success' => false, 'error' => 'Too many failed attempts. Code invalidated. / Demasiados intentos fallidos.']);
    exit;
}

// 6. Verify code match
if ($record['code'] !== $code) {
    $newAttempts = $record['attempts'] + 1;
    try {
        $stmt = $db->prepare("UPDATE pending_messages SET attempts = :attempts WHERE email = :email");
        $stmt->execute([':attempts' => $newAttempts, ':email' => $email]);
    } catch (PDOException $e) {}
    
    $remaining = 3 - $newAttempts;
    echo json_encode([
        'success' => false,
        'error' => "Invalid code. $remaining attempts remaining. / Código inválido. Quedan $remaining intentos."
    ]);
    exit;
}

// 7. Verification Success! Deliver final contact email
$senderName = $record['name'];
$senderEmail = $record['email'];
$subject = $record['subject'];
$message = $record['message'];
$date = date('Y-m-d H:i:s');

// Prepare main email to Felipe
$template = file_get_contents(__DIR__ . '/email_template.html');
$body = str_replace(
    ['{{NAME}}', '{{EMAIL}}', '{{SUBJECT}}', '{{MESSAGE}}', '{{DATE}}'],
    [$senderName, $senderEmail, $subject, $message, $date . " (Verified via 2FA)"],
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
        $config['from_email'],        // From
        $config['from_name'],         // From Name
        $config['from_email'],        // To (Felipe)
        $subject . ' - Contact from felipemiramontesr.net',
        $body,
        $senderEmail                  // Reply-To (Visitor)
    );

    if ($sent) {
        // --- AUTO-REPLY LOGIC START ---
        try {
            $autoTemplate = file_get_contents(__DIR__ . '/autoreply_template.html');
            $autoBody = str_replace(
                ['{{NAME}}', '{{SUBJECT}}', '{{DATE}}'],
                [$senderName, $subject, $date],
                $autoTemplate
            );

            $smtpAuto = new SimpleSMTP(
                $config['smtp_host'],
                $config['smtp_port'],
                $config['smtp_secure']
            );
            $smtpAuto->authenticate($config['smtp_user'], $config['smtp_pass']);
            $smtpAuto->send(
                $config['from_email'],
                'B. Eng. Felipe de Jesús Miramontes Romero',
                $senderEmail,
                'Thank you for contacting B. Eng. Felipe de Jesús Miramontes Romero',
                $autoBody,
                $config['from_email']
            );
        } catch (Exception $e) {}
        // --- AUTO-REPLY LOGIC END ---

        // 8. Delete the verified pending record
        try {
            $stmt = $db->prepare("DELETE FROM pending_messages WHERE email = :email");
            $stmt->execute([':email' => $email]);
        } catch (PDOException $e) {}

        echo json_encode(['success' => true, 'message' => 'Message verified and sent successfully! / Mensaje verificado y enviado con éxito!']);
    } else {
        throw new Exception('SMTP rejected the message.');
    }

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => 'Failed to deliver message: ' . $e->getMessage()]);
}
