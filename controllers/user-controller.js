const { User, Thought } = require('../models');

module.exports = {
    //Find all users function
    getUsers(req, req) {
        User.find()
        .then((users) => res.json(users))
        .catch((err) => res.status(500).json(err));
    },
    getOneUser(req, req) {
        User.findOne({ _id: req.params.userId})
    }
}