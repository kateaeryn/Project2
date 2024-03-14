const User = require('../models/users.js');

const getAll = async (req, res, next) => {
    //#swagger.tags=[Users]
    User.find({})
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || 'There was an issue retrieving the users'
            })

        });
};

const getSingle = async (req, res, next) => {
    //#swagger.tags=[Users]
    const userId = req.params.id;
    User.find({ _id: userId })
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || 'Something went wrong during retrieval.'
            });
        });
    
};

const newUser = async (req, res) => {
    //#swagger.tags=[Users]
    if (!req.body.title || !req.body.author) {
        res.status(400).send({ message: 'Must include title and author' });
        return;
    }
    const user = new User(req.body);
    user.save()
        .then((data) => {
            console.log(data);
            res.status(200).send(data);
        })
        .catch((err) => {
            res.status(500).send({ message: err || 'There was an issue creating the user' });
        });
};

const updateUser = async (req, res) => {
    //#swagger.tags=[Users]
    const userId = req.params.id;
    if (!userId) {
        res.status(400).json('Must use valid book id to update book.');
    }

    User.findOneAndUpdate(req.body)
        .then((data) => {
            console.log(data);
            res.status(200).send(data);
        })
        .catch((err) => {
            res.status(500).send({ message: err.message || 'Something went wrong with the update' });
        });
};

const deleteUser = async (req, res) => {
    //#swagger.tags=[Users]
    const userId = req.params.id;
    if (!userId) {
        res.status(400).json('Must use valid book id to update book.');
    }
    User.deleteOne({ _id: userId })
        .then((data) => {
            res.status(200).send(data)
        })
        .catch((err) => {
            res.status(500).send({ message: err.message || 'There was a problem with the deletion.' })
        });
};

module.exports = { getAll, getSingle , newUser, updateUser, deleteUser};