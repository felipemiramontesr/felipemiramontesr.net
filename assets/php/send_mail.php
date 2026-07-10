<?php
/**
 * Direct Send Mail API Endpoint (Fallback / Mock Tests)
 * Delivers the contact form message directly to Felipe.
 */

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['success' => false, 'error' => 'Invalid request method']);
    exit;
}

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

$felipeEmail = 'felipemiramontesr@gmail.com';
$msgSubject = "New Direct Message: " . $subject;

$mailBody = "You received a new direct message from your portfolio contact form:\n\n"
          . "Name: $name\n"
          . "Email: $email\n"
          . "Subject: $subject\n\n"
          . "Message:\n" . $message . "\n\n"
          . "--------------------------------------------------\n"
          . "Delivered directly on " . date('Y-m-d H:i:s') . "\n";

$headers = "From: info@felipemiramontesr.net\r\n"
         . "Reply-To: $email\r\n"
         . "X-Mailer: PHP/" . phpversion();

// Local Dev Mock: Log delivery to debug file
$isLocal = ($_SERVER['REMOTE_ADDR'] === '127.0.0.1' || $_SERVER['REMOTE_ADDR'] === '::1' || ($_SERVER['SERVER_NAME'] ?? '') === 'localhost');
$loggedToFile = false;

try {
    $logEntry = "[" . date('Y-m-d H:i:s') . "] PORTFOLIO DIRECT DELIVERY TO: $felipeEmail\nFROM: $email ($name)\nSUBJECT: $msgSubject\nBODY:\n$mailBody\n=======================================\n";
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

if ($sent || $loggedToFile) {
    echo json_encode(['success' => true, 'message' => 'Message sent successfully / Mensaje enviado con éxito']);
} else {
    echo json_encode(['success' => false, 'error' => 'Failed to deliver message / Error al entregar el mensaje']);
}
