const express= require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const flash = require('connect-flash');
const mongoose = require('mongoose');
const dotenv =require('dotenv');
const session = require('express-session');

const passport = require('passport');
const localStrategy = require('passport-local').Strategy;

// require user routes
const userRoutes = require('./routes/users');
const user = require('./models/usermodel');

dotenv.config({ path: './config.env' });
mongoose.connect(process.env.DATABASE_URL)
    .then(() => console.log('MongoDB connected successfully!'))
    .catch(err => {
        console.error('MongoDB connection error details:');
        console.error(err);
    });

    // Middleware for session
app.use(session({
    secret: process.env.SESSION_SECRET || 'your_secret_key',
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

// Local auth (email + password)
app.use((req, res, next) => {
    // ensure body parsing has happened before passport runs (routes handle it)
    next();
});

passport.use(new localStrategy({ usernameField: 'email' }, user.authenticate()));
passport.serializeUser(user.serializeUser());
passport.deserializeUser(user.deserializeUser());

// middleware for flash
app.use(flash());
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg') || '';
    res.locals.error_msg = req.flash('error_msg') || '';
    next();
});
    

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

app.use(userRoutes);
app.listen(process.env.PORT || 3000, () => {
    console.log('Server is running on port 3000');
});







