/**************************
 * Require Statements
 *************************/
const express = require('express');
const app = express();
const mongodb = require('./config/database');
const bodyParser = require('body-parser');
const port = process.env.PORT || 5500;



/**************************
 * Middleware
 **************************/
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Acess-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Z-Key');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
});

/****************************
 * Routes
 ****************************/
app.use('/', require('./routes'));


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
mongodb.initDb((err) => {
    if (err) {
        console.log(err)
    } else {
    app.listen(port, () => {console.log(`Listening on port ${port}`) });
    }
})







