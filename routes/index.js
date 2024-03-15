const router = require('express').Router();
const userCont = require('../controllers/users');
const bookCont = require('../controllers/books');
const { saveUser, saveBook } = require('../middleware/validate');
const { isAuthenticated } = require('../middleware/authenticate');
const passport = require('passport');

router.use('/', require('./swagger'));

router.get('/', (req, res) => { res.send('Welcome to the Library') });

//login and logout
router.get('/login', passport.authenticate('github'), (req, res) => { });
router.get('/logout', function (req, res, next) {
        req.logout(function (err) {
        if (err) { return next(err); }
        res.redirect('/');
    });
});

//user routes
router.get('/users', userCont.getAll);
router.get('/users/:id', userCont.getSingle);
router.post('/users', saveUser, isAuthenticated, userCont.newUser);
router.put('/users/:id', saveUser, isAuthenticated, userCont.updateUser);
router.delete('/users/:id', isAuthenticated, userCont.deleteUser);


//book routes
router.get('/books', bookCont.getAll);
router.get('/books/:id', bookCont.getSingle);
router.post('/books',  saveBook, isAuthenticated, bookCont.newBook);
router.put('/books/:id', saveBook, isAuthenticated, bookCont.updateBook);
router.delete('/books/:id', isAuthenticated, bookCont.deleteBook);


module.exports = router;