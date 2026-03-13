import { Router } from 'express';
const router = Router();
import pool from '../db.js';

// no parameterization to show sql injection
router.post('/', async (req, res) => {
    const { username, password } = req.body;
    // VULNERABLE TO SQL INJECTION -- for demo purposes
    const query = `SELECT * FROM users WHERE username = '${username}' AND password = '${password}'`;
    try {
        const [results] = await pool.query(query);
        if (results.length > 0) {
            res.json({ success: true, user: results[0] });
        } else {
            res.status(401).json({ success: false, message: 'Invalid credentials' });
        }
    } catch (err) {
        res.status(500).json({ error: 'Database error', details: err });
    }
});

export default router;
