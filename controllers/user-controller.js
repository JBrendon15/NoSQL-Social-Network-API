const { User, Thought } = require('../models');

module.exports = {
    //Find all users 
    getUsers(req, req) {
        User.find()
        .then((users) => res.json(users))
        .catch((err) => res.status(500).json(err));
    },
    //Find one user
    getOneUser(req, req) {
        User.findOne({ _id: req.params.userId})
        .select('-__v')
        .then((user) => {
            !user
            ? res.status(404).json({ message: 'No user found.'})
            : res.json(user)
        })
        .catch((err) => res.status(500).json(err));
    },
    //Create one user
    createUser(req, req) { 
        User.create(req.body)
        .then((user) => res.json(user))
        .catch((err) => res.status(500).json(err));
    },
};
