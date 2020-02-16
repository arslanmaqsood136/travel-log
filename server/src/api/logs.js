const { Router } = require('express');

const router = Router();
const LogEntry = require('../models/LogEntry');

router.post('/', async (req, res, next) => {
  try {
    const logEntry = new LogEntry(req.body);
    const createdEntry = await logEntry.save();
    res.json(createdEntry);
  } catch (error) {
    if (error.name === 'ValidationError') {
      res.status(422);
    }
    next(error);
  }
});

router.get('/', async (req, res, next) => {
  try {
    const logEntries = await LogEntry.find();
    res.json(logEntries);
  } catch (error) {
    next(error);
  }
});
module.exports = router;
