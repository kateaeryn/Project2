const router = require('express').Router();
const userCont = require('../controllers/users');
const bookCont = require('../controllers/books');
//const validator = require('../validation.js');

router.use('/', require('./swagger'));

router.get('/', (req, res) => { res.send('Welcome to the Library') });

//user routes
router.get('/users', userCont.getAll);
router.get('/users/:id', userCont.getSingle);
router.post('/users', userCont.newUser);
router.put('/users/:id', userCont.updateUser);
router.delete('/users/:id', userCont.deleteUser);


//book routes
router.get('/books', bookCont.getAll);
router.get('/books/:id', bookCont.getSingle);
router.post('/books',  bookCont.newBook);
router.put('/books/:id', bookCont.updateBook);
router.delete('/books/:id', bookCont.deleteBook);


module.exports = router;