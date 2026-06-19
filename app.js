const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const flash = require('connect-flash');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const session = require('express-session');
const passport = require('passport');
const localStrategy = require('passport-local').Strategy;

// Require user routes and model
const userRoutes = require('./routes/users');
const user = require('./models/usermodel');

dotenv.config({ path: './config.env' });

// Database connection
mongoose.connect(process.env.DATABASE_URL)
    .then(() => console.log('MongoDB connected successfully!'))
    .catch(err => {
        console.error('MongoDB connection error details:', err);
    });

// 1. SETUP VIEWS & STATIC FILES
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

// 2. PARSE BODY DATA (CRITICAL: Must be above Passport/Routes!)
app.use(bodyParser.urlencoded({ extended: true }));

// 3. SESSIONS
app.use(session({
    secret: process.env.SESSION_SECRET || 'your_secret_key',
    resave: false,
    saveUninitialized: false
}));

// 4. PASSPORT INITIALIZATION
app.use(passport.initialize());
app.use(passport.session());

passport.use(new localStrategy({ usernameField: 'email' }, user.authenticate()));
passport.serializeUser(user.serializeUser());
passport.deserializeUser(user.deserializeUser());

// 5. FLASH & CUSTOM GLOBAL VARIABLES MIDDLEWARE
app.use(flash());
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg') || '';
    res.locals.error_msg = req.flash('error_msg') || '';
    res.locals.currentUser = req.user || null; // Softened to null if undefined
    next();
});

// 6. ROUTES (Must be last)
app.use(userRoutes);

app.listen(process.env.PORT || 3000, () => {
    console.log('Server is running on port 3000');
});