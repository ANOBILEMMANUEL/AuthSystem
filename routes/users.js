const express = require('express');
const router = express.Router();
const User = require('../models/usermodel');
const passport = require('passport');

function ensureAuth(req, res, next) {
    if (req.isAuthenticated && req.isAuthenticated()) return next();
    req.flash('error_msg', 'Please log in first.');
    return res.redirect('/login');
}


router.get('/', (req, res) => {
    res.render('home');
});
router.get('/login', (req, res) => {
    res.render('login');
});


router.get('/signup', (req, res) => {
    res.render('signup');
});

router.get('/dashboard', ensureAuth, (req, res) => {
    res.render('dashboard');
});

router.post('/signup', async (req, res) => {
    const { username, email, password } = req.body;

    try {
        // 1. Check for duplicate Email (since it's your primary usernameField)
        const existingEmail = await User.findOne({ email });
        if (existingEmail) {
            req.flash('error_msg', 'An account with this email already exists. Please log in.');
            return res.redirect('/signup');
        }

        // 2. Check for duplicate Username (as an extra field safety)
        const existingUsername = await User.findOne({ username });
        if (existingUsername) {
            req.flash('error_msg', 'This username is already taken.');
            return res.redirect('/signup');
        }

        // 3. Register directly using standard async/await (No manual Promise block needed)
        const newUser = new User({ username, email });
        await User.register(newUser, password);

        req.flash('success_msg', 'User registered successfully!');
        return res.redirect('/login');

    } catch (err) {
        console.error("Signup Error: ", err);
        
        // 4. Catch any unexpected library duplicate validation errors safely
        if (err.name === 'UserExistsError' || /already registered|exists/i.test(err.message)) {
            req.flash('error_msg', 'An account with those details already exists.');
        } else {
            req.flash('error_msg', 'Error creating user: ' + err.message);
        }
        return res.redirect('/signup');
    }
});

router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
        failureRedirect: '/login',
        failureFlash: true,
    }, (err, user, info) => {
        if (err) return next(err);
        if (!user) {
            req.flash('error_msg', (info && info.message) ? info.message : 'Invalid email or password');
            return res.redirect('/login');
        }
        req.logIn(user, (loginErr) => {
            if (loginErr) return next(loginErr);
            req.flash('success_msg', 'Logged in successfully!');
            return res.redirect('/dashboard');
        });
    })(req, res, next);
});

router.get('/logout', (req, res, next) => {
    req.logout((err) => {
        if (err) return next(err);
        req.flash('success_msg', 'Logged out successfully!');
        res.redirect('/login');
    });
});

module.exports = router;

