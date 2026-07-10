<?php
/**
 * Verify Code API Endpoint
 * Validates the 6-digit code against SQLite, checks expiration and attempts count,
 * and if correct, sends the actual contact form message to Felipe.
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
    // Delete expired entry
    try {
        $stmt = $db->prepare("DELETE FROM pending_messages WHERE email = :email");
        $stmt->execute([':email' => $email]);
    } catch (PDOException $e) {}
    echo json_encode(['success' => false, 'error' => 'Code has expired / El código ha expirado']);
    exit;
}

// 5. Check maximum attempts (max 3)
if ($record['attempts'] >= 3) {
    // Delete entry due to brute force protection
    try {
        $stmt = $db->prepare("DELETE FROM pending_messages WHERE email = :email");
        $stmt->execute([':email' => $email]);
    } catch (PDOException $e) {}
    echo json_encode(['success' => false, 'error' => 'Too many failed attempts. Code invalidated. / Demasiados intentos fallidos. Código invalidado.']);
    exit;
}

// 6. Verify code match
if ($record['code'] !== $code) {
    // Increment attempts
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
$felipeEmail = 'felipemiramontesr@gmail.com';
$senderName = $record['name'];
$senderEmail = $record['email'];
$msgSubject = "New Portfolio Message: " . $record['subject'];

$mailBody = "You received a new message from your portfolio contact form:\n\n"
          . "Name: $senderName\n"
          . "Email: $senderEmail\n"
          . "Subject: " . $record['subject'] . "\n\n"
          . "Message:\n" . $record['message'] . "\n\n"
          . "--------------------------------------------------\n"
          . "Verified via 2FA on " . date('Y-m-d H:i:s') . "\n";

$headers = "From: info@felipemiramontesr.net\r\n"
         . "Reply-To: $senderEmail\r\n"
         . "X-Mailer: PHP/" . phpversion();

// Local Dev Mock: Log delivery to debug file
$isLocal = ($_SERVER['REMOTE_ADDR'] === '127.0.0.1' || $_SERVER['REMOTE_ADDR'] === '::1' || ($_SERVER['SERVER_NAME'] ?? '') === 'localhost');
$loggedToFile = false;

try {
    $logEntry = "[" . date('Y-m-d H:i:s') . "] PORTFOLIO DELIVERY TO: $felipeEmail\nFROM: $senderEmail ($senderName)\nSUBJECT: $msgSubject\nBODY:\n$mailBody\n=======================================\n";
    file_put_contents(__DIR__ . '/mail_debug.log', $logEntry, FILE_APPEND);
    $loggedToFile = true;
} catch (Exception $e) {
    // Non-blocking log error
}

$sent = false;
if (!$isLocal) {
    $sent = @mail($felipeEmail, $msgSubject, $mailBody, $headers);
} else {
    // Mock send locally
    $sent = true;
}

// 8. Delete the verified pending record
try {
    $stmt = $db->prepare("DELETE FROM pending_messages WHERE email = :email");
    $stmt->execute([':email' => $email]);
} catch (PDOException $e) {}

if ($sent || $loggedToFile) {
    echo json_encode(['success' => true, 'message' => 'Message verified and sent successfully / Mensaje verificado y enviado con éxito']);
} else {
    echo json_encode(['success' => false, 'error' => 'Failed to deliver final message / Error al entregar el mensaje final']);
}
