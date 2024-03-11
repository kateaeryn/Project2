const router = require('express').Router();
const userCont = require('../controllers/users');
const bookCont = require('../controllers/books');
const validator = require('../validation.js');

router.use('/', require('./swagger'));

router.get('/', (req, res) => { res.send('Welcome to the Library') });

//user routes
router.get('/users', userCont.getAll);
router.get('/users/:id', userCont.getSingle);
router.post('/users', validator.userRules(), validator.checkUserData, userCont.newUser);
router.put('/users/:id', validator.userRules(), validator.checkUserData, userCont.updateUser);
router.delete('/users/:id', userCont.deleteUser);


//book routes
router.get('/books', bookCont.getAll);
router.get('/books/:id', bookCont.getSingle);
router.post('/books', validator.bookRules(), validator.checkBookData, bookCont.newBook);
router.put('/books/:id', validator.bookRules(), validator.checkBookData, bookCont.updateBook);
router.delete('/books/:id', bookCont.deleteBook);


module.exports = router;