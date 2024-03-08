const mongodb = require('../config/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res, next) => {
    //#swagger.tags=[Books]
    const result = await mongodb.getDatabase().db().collection('Books').find();
    result.toArray().then((books) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(books);
    })
        .catch((err) => {
    res.status(500).send({message: err.message || 'An error occurred while retrieving the book list'})
    })
};

const getSingle = async (req, res, next) => {
    //#swagger.tags=[Books]
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use valid book id to find a book.');
    }
    const bookId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db().collection('Books').find({ _id: bookId });
    result.toArray().then((books) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(books[0]);
    })
        .catch((err) => {
            res.status(500).send({ message: err.message || 'An error occured while retrieving that book' })
        });

};

const newBook = async (req, res) => {
    //#swagger.tags=[Books]
    const book = {
        title: req.body.title,
        author: req.body.author,
        genre: req.body.author,
        pageCount: req.body.pageCount,
        published: req.body.published,
        printType: req.body.printType,
        readStatus: req.body.readStatus
    }
    const results = await mongodb.getDatabase().db().collection('Books').insertOne(book);
    if (results.acknowledged) {
        res.status(204).send();
    } else {
        res.status(500).json(results.error || "We hit a snag adding that book to the library");
    }
};

const updateBook = async (req, res) => {
    //#swagger.tags=[Books]
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use valid book id to update book.');
    }
    const bookId = new ObjectId(req.params.id);
    const book = {
        title: req.body.title,
        author: req.body.author,
        genre: req.body.author,
        pageCount: req.body.pageCount,
        published: req.body.published,
        printType: req.body.printType,
        readStatus: req.body.readStatus
    }

    const results = await mongodb.getDatabase().db().collection('Books').replaceOne({ _id: bookId }, book);
    if (results.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(results.error || "We hit a snag updating that book");
    }
};


const deleteBook = async (req, res) => {
    //#swagger.tags=[Books]
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use valid book id to delete book.');
    }
    const bookId = new ObjectId(req.params.id);
    const results = await mongodb.getDatabase().db().collection('Books').deleteOne({ _id: bookId });
    if (results.deletedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(results.error || "We hit a snag updating that book");
    }
};

module.exports = { getAll, getSingle, newBook, updateBook, deleteBook };