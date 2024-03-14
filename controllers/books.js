
const Book = require('../models/books.js');


const getAll = (req, res, next) => {
    //#swagger.tags=[Books]
    Book.find({})
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || 'There was an issue retrieving the books'
            })
        
        });
    
};

const getSingle = async (req, res, next) => {
    //#swagger.tags=[Books]
    const bookId = req.params.id;
    Book.find({ _id: bookId })
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || 'Something went wrong during retrieval.'
            });
        });
    
};

const newBook = async (req, res) => {
    //#swagger.tags=[Books]
    if (!req.body.email || !req.body.password || !req.body.firstName || !req.body.lastName) {
        res.status(400).send({ message: 'All fields are required.' });
        return;
    }
    const book = new Book(req.body);
    book.save()
        .then((data) => {
            console.log(data);
            res.status(200).send(data);
        })
        .catch((err) => {
            res.status(500).send({ message: err || 'There was an issue creating the book' });
        });
};
    
const updateBook = async (req, res) => {
    //#swagger.tags=[Books]
    const bookId = req.params.id;
    if (!bookId) {
        res.status(400).json('Must use valid book id to update book.');
    }
    
        Book.findOneAndUpdate(req.body)
        .then((data) => {
            console.log(data);
            res.status(200).send(data);
        })
        .catch((err) => {
            res.status(500).send({ message: err.message || 'Something went wrong with the update' });
        });
    
};


const deleteBook = async (req, res) => {
    //#swagger.tags=[Books]
    const bookId = req.params.id;
    if (!bookId) {
        res.status(400).json('Must use valid book id to update book.');
    }
    Book.deleteOne({ _id: bookId })
        .then((data) => {
            res.status(200).send(data)
        })
        .catch((err) => {
            res.status(500).send({ message: err.message || 'There was a problem with the deletion.' })
        });
};

module.exports = { getAll, getSingle, newBook, updateBook, deleteBook };