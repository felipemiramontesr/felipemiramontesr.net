<?php
/**
 * SMTP Configuration
 * 
 * INSTRUCTIONS:
 * 1. Open this file.
 * 2. Replace 'tu_contraseña_aqui' with your actual email password.
 * 3. Upload this file to: /public_html/assets/php/config.php
 */

return [
    'smtp_host' => 'smtp.hostinger.com',
    'smtp_port' => 465,
    'smtp_user' => 'info@felipemiramontesr.net',
    'smtp_pass' => 'tu_contraseña_aqui', // <--- PASSWORD REMOVED FOR SECURITY
    'smtp_secure' => 'ssl',
    'from_email' => 'info@felipemiramontesr.net',
    'from_name' => 'Felipe Miramontes Web',
];
