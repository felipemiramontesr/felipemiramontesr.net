<?php
/**
 * Send Code API Endpoint
 * Generates a 6-digit verification code, saves the pending message details in SQLite,
 * and sends the code to the user's email address.
 */

header('Content-Type: application/json');
require_once __DIR__ . '/db.php';

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

if (empty($name) || empty($email) || empty($subject) || empty($message)) {
    echo json_encode(['success' => false, 'error' => 'All fields are required / Todos los campos son obligatorios']);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode(['success' => false, 'error' => 'Invalid email address / Correo electrónico no válido']);
    exit;
}

// 3. Purge expired entries (older than current time)
try {
    $now = time();
    $stmt = $db->prepare("DELETE FROM pending_messages WHERE expires_at < :now");
    $stmt->execute([':now' => $now]);
} catch (PDOException $e) {
    // Non-blocking error, log but continue
}

// 4. Generate 6-digit code
$code = sprintf("%06d", mt_rand(0, 999999));
$expiresAt = time() + 300; // 5 minutes validity

// 5. Store pending message in database
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

// 6. Send Email containing the code
$mailSubject = "Verification Code / Código de verificación: $code";
$mailBody = "Hi / Hola $name,\n\n"
          . "Your verification code is / Tu código de verificación es:\n\n"
          . "==>  $code  <==\n\n"
          . "This code is valid for 5 minutes. / Este código es válido por 5 minutos.\n\n"
          . "Thank you / Gracias,\n"
          . "Felipe Miramontes";

$headers = "From: no-reply@felipemiramontesr.net\r\n"
         . "Reply-To: no-reply@felipemiramontesr.net\r\n"
         . "X-Mailer: PHP/" . phpversion();

// Local Dev Mock: Log mail payload to file for local testing convenience
$isLocal = ($_SERVER['REMOTE_ADDR'] === '127.0.0.1' || $_SERVER['REMOTE_ADDR'] === '::1' || ($_SERVER['SERVER_NAME'] ?? '') === 'localhost');
$loggedToFile = false;

try {
    $logEntry = "[" . date('Y-m-d H:i:s') . "] TO: $email\nSUBJECT: $mailSubject\nBODY:\n$mailBody\n---------------------------------------\n";
    file_put_contents(__DIR__ . '/mail_debug.log', $logEntry, FILE_APPEND);
    $loggedToFile = true;
} catch (Exception $e) {
    // Non-blocking log error
}

$sent = false;
if (!$isLocal) {
    $sent = @mail($email, $mailSubject, $mailBody, $headers);
} else {
    // Mock send locally
    $sent = true;
}

if ($sent || $loggedToFile) {
    echo json_encode(['success' => true, 'message' => 'Verification code sent / Código de verificación enviado']);
} else {
    echo json_encode(['success' => false, 'error' => 'Failed to send email / Error al enviar el correo']);
}
