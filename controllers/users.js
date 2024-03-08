const mongodb = require('../config/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    //#swagger.tags=[Users]
    const result = await mongodb.getDatabase().db().collection('Users').find();
    result.toArray().then((users) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(users);
    })
};

const getSingle = async (req, res) => {
    //#swagger.tags=[Users]
    const userId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db().collection('Users').find({ _id: userId });
    result.toArray().then((users) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(users[0]);
    })
    
};

const newUser = async (req, res) => {
    //#swagger.tags=[Users]
    const user = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password
    }
    const results = await mongodb.getDatabase().db().collection('Users').insertOne(user);
    if (results.acknowledged) {
        res.status(204).send();
    } else {
        res.status(500).json(results.error || "We hit a snag adding that user");
    }
};

const updateUser = async (req, res) => {
    //#swagger.tags=[Users]
    const userId = new ObjectId(req.params.id);
    const user = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password
    }
    const results = await mongodb.getDatabase().db().collection('Users').replaceOne({ _id: userId}, user);
    if (results.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(results.error || "We had an issue updating that user");
    }
};

const deleteUser = async (req, res) => {
    //#swagger.tags=[Users]
    const userId = new ObjectId(req.params.id);
    const results = await mongodb.getDatabase().db().collection('Users').deleteOne({ _id: userId });
    if (results.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(results.error || "We had an issue deleting that user");
    }

}

module.exports = { getAll, getSingle , newUser, updateUser, deleteUser};