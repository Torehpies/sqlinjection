const express = require('express');
const router = express.Router();
const connection = require('../db');
router.post('/', (req, res) => {
	const { username, password } = req.body;
	// SQL injection vulnerability here:
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
module.exports = router;
