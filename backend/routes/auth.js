import { Router } from 'express';
const router = Router();
import connection from '../db.js';

// no parameterization to show sql injection
router.post('/', (req, res) => {
    const { username, password } = req.body;
    // VULNERABLE TO SQL INJECTION -- for demo purposes
    const query = `SELECT * FROM users WHERE username = '${username}' AND password = '${password}'`;
    connection.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Database error', details: err });
        }
        if (results.length > 0) {
            res.json({ success: true, user: results[0] });
        } else {
            res.status(401).json({ success: false, message: 'Invalid credentials' });
        }
    });
});

export default router;
