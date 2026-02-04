<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');

// 1. Load Configuration
$configFile = __DIR__ . '/config.php';
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
        echo json_encode(['success' => true, 'message' => 'Message sent successfully!']);
    } else {
        throw new Exception('SMTP rejected the message.');
    }

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Failed to send email: ' . $e->getMessage()]);
}


/**
 * Minimal SMTP Client for SSL/TLS
 */
class SimpleSMTP
{
    private $socket;
    private $host;
    private $port;
    private $secure;

    public function __construct($host, $port, $secure)
    {
        $this->host = $host;
        $this->port = $port;
        $this->secure = $secure;
    }

    public function authenticate($user, $pass)
    {
        $protocol = ($this->secure === 'ssl') ? 'ssl://' : 'tcp://';
        $this->socket = fsockopen($protocol . $this->host, $this->port, $errno, $errstr, 30);

        if (!$this->socket) {
            throw new Exception("Connection failed: $errno $errstr");
        }

        $this->read(); // Greeting
        $this->cmd('EHLO ' . $_SERVER['SERVER_NAME']); // Hello

        $this->cmd('AUTH LOGIN');
        $this->cmd(base64_encode($user));
        $this->cmd(base64_encode($pass));
    }

    public function send($fromEmail, $fromName, $toEmail, $subject, $htmlBody, $replyToEmail)
    {
        $this->cmd("MAIL FROM: <$fromEmail>");
        $this->cmd("RCPT TO: <$toEmail>");

        $this->cmd('DATA');

        $headers = "MIME-Version: 1.0\r\n";
        $headers .= "Content-type: text/html; charset=UTF-8\r\n";
        $headers .= "From: $fromName <$fromEmail>\r\n";
        $headers .= "Reply-To: $replyToEmail\r\n";
        $headers .= "To: $toEmail\r\n";
        $headers .= "Subject: $subject\r\n";

        $message = "$headers\r\n$htmlBody\r\n.";

        $response = $this->cmd($message);
        $this->cmd('QUIT');

        fclose($this->socket);

        return true;
    }

    private function cmd($command)
    {
        fputs($this->socket, $command . "\r\n");
        return $this->read();
    }

    private function read()
    {
        $response = "";
        while ($str = fgets($this->socket, 515)) {
            $response .= $str;
            if (substr($str, 3, 1) == " ") {
                break;
            }
        }
        // Basic error check
        $code = substr($response, 0, 3);
        if ($code >= 400) {
            throw new Exception("SMTP Error: $response");
        }
        return $response;
    }
}
?>