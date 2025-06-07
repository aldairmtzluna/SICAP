const express = require('express');
const router = express.Router();
const db = require('../database/db');

// GET /agents
router.get('/', async (req, res) => {
  try {
    const agents = await db('agents').select('*');
    res.json(agents);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;