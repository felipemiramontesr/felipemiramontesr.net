<?php
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

        $this->cmd($message);
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
