const express = require('express');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    res.render('contacts/index.ejs');
  } catch (err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;