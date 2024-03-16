/**************************
 * Require Statements
 *************************/
const express = require('express');
const app = express();
// const mongodb = require('./config/database');
const bodyParser = require('body-parser');
const port = process.env.PORT || 5500;
const passport = require('passport');
const dataBase = require('./models');
const session = require('express-session');
const cors = require('cors');
const GitHubStrategy = require('passport-github2').Strategy;
const dotenv = require('dotenv').config;


/**************************
 * Middleware
 **************************/
app.use(bodyParser.json())
    .use(session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
}))
    .use(passport.initialize())
    .use(passport.session())

    .use((req, res, next) => {
    res.setHeader('Acess-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Z-Key');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
    })
    .use(cors({ methods: ['GET', 'POST', 'DELETE', 'PUT', 'UPDATE', 'PATCH'] }))
    .use(cors({ origin: '*'}))
    .use('/', require('./routes'));

passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL
},
    function (accessToken, refreshToken, profile, done) {
       // User.findOrCreate({ githubId: profile.id }, function (err, user) {
        return done(null, profile);
   // });
    }));
passport.serializeUser((user, done) => {
    done(null, user);
});
passport.deserializeUser((user, done) => {
    done(null, user);
});

app.get('/', (req, res) => { res.send(req.session.user !== undefined ? `Logged in as ${req.session.user.clientID}` : "Logged Out") });

app.get('/github/callback', passport.authenticate('github', {
    failureRedirect: '/api-docs', session: false}),
    (req, res) => {
        req.session.user = req.user;
        res.redirect('/');
    });

/****************************
 * Error handling
 ****************************/
app.use((err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error";
    res.status(err.statusCode).json({ message: err.message });
})

/**************************
 * Verify database operation
 **************************/
dataBase.mongoose.connect(
    process.env.MONGODB_URI)
    .then(() => {
        app.listen(port, () => {
            console.log(`Connected to database on port: ${port}`);
        });
    })
    .catch((err) => {
        console.error('Cannot connect to the database', err);
        process.exit();
    });








