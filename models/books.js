const mongoose = require('mongoose');

const bookSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    genre: {
        type: String,
        required: true
    },
    pageCount: {
        type: Number,
        required: true
    },
    published: {
        type: Number,
        required: true
    },
    printType: {
        type: String,
        required: true
    },
    readStatus: {
        type: String,
        required: true
    }
}

);

module.exports = mongoose.model('Book', bookSchema);