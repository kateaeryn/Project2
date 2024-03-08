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
// process.on('uncaughtException', (err, origin) => {
//     console.log(process.stderr.fd, `Caught exception: ${err}\n` + `Exception origin: ${origin}`)
// });
// process.on('unhandledRejection', (err, origin) => {
//     console.log(process.stderr.fd, `Promise Rejection: ${err}\n` + `Rejection origin: ${origin}`);
// })

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







