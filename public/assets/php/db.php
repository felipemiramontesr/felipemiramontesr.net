<?php
/**
 * SQLite Database Connection
 * Used for storing temporary 2FA codes.
 */

$dbFile = __DIR__ . '/contact_2fa.sqlite';

try {
    $db = new PDO('sqlite:' . $dbFile);
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    // Create table if it doesn't exist
    $db->exec("
        CREATE TABLE IF NOT EXISTS pending_messages (
            email TEXT PRIMARY KEY,
            name TEXT,
            subject TEXT,
            message TEXT,
            code TEXT,
            created_at INTEGER,
            expires_at INTEGER,
            attempts INTEGER DEFAULT 0
        )
    ");
} catch (PDOException $e) {
    header('Content-Type: application/json');
    echo json_encode(['success' => false, 'error' => 'Database connection failed']);
    exit;
}
