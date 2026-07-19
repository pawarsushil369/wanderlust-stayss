const express = require('express');
const router = express.Router();

// Home Page
router.get('/', (req, res) => {
    res.render('pages/home'); 
});

// Privacy Policy
router.get('/privacy', (req, res) => {
    res.render('pages/privacy');
});

// Terms & Conditions
router.get('/terms', (req, res) => {
    res.render('pages/terms');
});

module.exports = router;