const express = require('express');
const app = express();
const session = require('express-session');

// Middleware to check if user is signed in
function checkAuthentication(req, res, next) {
    if (req.session.user) {
        next(); // If user is signed in, continue to the landing page
    } else {
        res.redirect('/signup'); // If not, redirect to sign-up page
    }
}

// Setting up session management
app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: true,
}));

// Mock sign-in route
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    if (username === 'testuser' && password === 'password') {
        req.session.user = { username }; // Set session data
        res.redirect('/landing'); // Redirect to landing page
    } else {
        res.status(401).send('Authentication failed');
    }
});

// Landing page route (protected)
app.get('/landing', checkAuthentication, (req, res) => {
    res.send(`<h1>Welcome to the landing page, ${req.session.user.username}!</h1>`);
});

// Sign-up page route
app.get('/signup', (req, res) => {
    res.send(`<h1>Please Sign Up!</h1><a href="/signup-form">Go to Sign-Up Form</a>`);
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
