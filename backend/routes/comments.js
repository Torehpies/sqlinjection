import { Router } from 'express';
import pool from '../db.js';

const router = Router();

// Get all comments, newest first
router.get('/', async (req, res) => {
    try {
        const [results] = await pool.query(
            'SELECT id, guest_id, message, created_at FROM comments ORDER BY created_at DESC'
        );
        res.json({ success: true, comments: results });
    } catch (err) {
        res.status(500).json({ success: false, error: 'Database error', details: err });
    }
});

// Add a new comment
router.post('/', async (req, res) => {
    const { guest_id, message } = req.body;
    if (!guest_id || !message || typeof message !== 'string' || !message.trim()) {
        return res.status(400).json({ success: false, error: 'Invalid guest_id or message' });
    }
    try {
        const [result] = await pool.query(
            'INSERT INTO comments (guest_id, message) VALUES (?, ?)',
            [guest_id, message.trim()]
        );
        // Fetch the inserted comment
        const [rows] = await pool.query(
            'SELECT id, guest_id, message, created_at FROM comments WHERE id = ?',
            [result.insertId]
        );
        res.json({ success: true, comment: rows[0] });
    } catch (err) {
        res.status(500).json({ success: false, error: 'Database error', details: err });
    }
});

export default router;
