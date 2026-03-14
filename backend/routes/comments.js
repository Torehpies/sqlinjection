import { Router } from 'express';
import pool from '../db.js';

const router = Router();

// Get all comments, newest first
router.get('/', async (req, res) => {
    try {
        const [results] = await pool.query(
            'SELECT id, guest_id, nickname, message, created_at FROM comments ORDER BY created_at DESC'
        );
        res.json({ success: true, comments: results });
    } catch (err) {
        res.status(500).json({ success: false, error: 'Database error', details: err });
    }
});

// Add a new comment
router.post('/', async (req, res) => {
    const { guest_id, nickname, message } = req.body;
    const MAX_LENGTH = 300;
    if (!guest_id || !nickname || !message || typeof message !== 'string' || !message.trim() || message.length > MAX_LENGTH || nickname.length > 64) {
        return res.status(400).json({ success: false, error: 'Invalid guest_id, nickname, or message too long' });
    }

    // Very basic repeat/spam prevention in DB: Last message must not be identical, min 10 seconds per guest
    try {
        const [lastRow] = await pool.query(
            `SELECT message, created_at FROM comments WHERE guest_id = ? ORDER BY created_at DESC LIMIT 1`,
            [guest_id]
        );
        if (lastRow.length > 0) {
            const { message: lastMsg, created_at } = lastRow[0];
            const now = Date.now();
            const lastTime = new Date(created_at).getTime();
            if (lastMsg === message.trim()) {
                return res.status(429).json({ success: false, error: 'Repeat comment detected.' });
            }
            if (now - lastTime < 10000) {
                return res.status(429).json({ success: false, error: 'Please wait a few seconds before posting again.' });
            }
        }
        const [result] = await pool.query(
            'INSERT INTO comments (guest_id, nickname, message) VALUES (?, ?, ?)',
            [guest_id, nickname.trim(), message.trim()]
        );
        // Fetch the inserted comment
        const [rows] = await pool.query(
            'SELECT id, guest_id, nickname, message, created_at FROM comments WHERE id = ?',
            [result.insertId]
        );
        res.json({ success: true, comment: rows[0] });
    } catch (err) {
        res.status(500).json({ success: false, error: 'Database error', details: err });
    }
});

export default router;
