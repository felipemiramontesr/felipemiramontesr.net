<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');

// 1. Load Configuration & Helper
$configFile = __DIR__ . '/config.php';
require_once __DIR__ . '/smtp_helper.php';

if (!file_exists($configFile)) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Server configuration missing (config.php).']);
    exit;
}
$config = require $configFile;

// 2. Read Input
$input = json_decode(file_get_contents('php://input'), true);

if (!$input) {
    echo json_encode(['success' => false, 'message' => 'Invalid input data.']);
    exit;
}

$name = strip_tags(trim($input['name'] ?? ''));
$email = filter_var(trim($input['email'] ?? ''), FILTER_VALIDATE_EMAIL);
$subject = strip_tags(trim($input['subject'] ?? ''));
$message = strip_tags(trim($input['message'] ?? ''));

if (!$name || !$email || !$subject || !$message) {
    echo json_encode(['success' => false, 'message' => 'Please fill in all fields correctly.']);
    exit;
}

// 3. Prepare Email Body
$template = file_get_contents(__DIR__ . '/email_template.html');
$date = date('Y-m-d H:i:s');

$body = str_replace(
    ['{{NAME}}', '{{EMAIL}}', '{{SUBJECT}}', '{{MESSAGE}}', '{{DATE}}'],
    [$name, $email, $subject, $message, $date],
    $template
);

// 4. Send using Custom SMTP Helper
try {
    $smtp = new SimpleSMTP(
        $config['smtp_host'],
        $config['smtp_port'],
        $config['smtp_secure']
    );

    $smtp->authenticate($config['smtp_user'], $config['smtp_pass']);

    $sent = $smtp->send(
        $config['from_email'],        // From (Authenticated Account)
        $config['from_name'],         // From Name
        $config['from_email'], // To (Same as From, as requested)
        $subject . ' - Contact from felipemiramontesr.net',  // Subject
        $body,                        // Body (HTML)
        $email                        // Reply-To (The visitor)
    );

    if ($sent) {
        // --- AUTO-REPLY LOGIC START ---
        try {
            $autoTemplate = file_get_contents(__DIR__ . '/autoreply_template.html');
            $autoBody = str_replace(
                ['{{NAME}}', '{{SUBJECT}}', '{{DATE}}'],
                [$name, $subject, $date],
                $autoTemplate
            );

            // Re-authenticate or reuse connection? SimpleSMTP might need reset or new instance.
            // For safety and simplicity with this class, we send a second command set if connection is open, 
            // but SimpleSMTP usage here implies a linear session. 
            // Let's try sending on the SAME connection first (RSET usually required).
            // Since SimpleSMTP is custom and minimal, creating a NEW instance is safer to avoid state issues.

            // To be robust: Close first, open new for auto-reply.
            // (Or if the class supported RSET).
            // Let's just create a new instance to be 100% sure.

            $smtpAuto = new SimpleSMTP(
                $config['smtp_host'],
                $config['smtp_port'],
                $config['smtp_secure']
            );
            $smtpAuto->authenticate($config['smtp_user'], $config['smtp_pass']);

            $smtpAuto->send(
                $config['from_email'],                       // From (Admin Email)
                'B. Eng. Felipe de Jesús Miramontes Romero', // From Name (Specific)
                $email,                                      // To (The Visitor)
                'Thank you for contacting B. Eng. Felipe de Jesús Miramontes Romero', // Subject
                $autoBody,                                   // Body
                $config['from_email']                        // Reply-To (Admin Email)
            );
            // Ignore auto-reply errors to not fail the user's success message
        } catch (Exception $e) {
            // Silently fail auto-reply or log it if logging existed.
        }
        // --- AUTO-REPLY LOGIC END ---

        echo json_encode(['success' => true, 'message' => 'Message sent successfully!']);
    } else {
        throw new Exception('SMTP rejected the message.');
    }

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Failed to send email: ' . $e->getMessage()]);
}

