const { User, Thought } = require('../models');

module.exports = {
    //Find all users 
    getUsers(req, res) {
        User.find()
            .populate('friends')
            .populate('thoughts')
            .then((users) => res.json(users))
            .catch((err) => res.status(500).json(err));
    },
    //Find one user
    getOneUser(req, res) {
        User.findOne({ _id: req.params.userId })
            .select('-__v')
            .populate('friends')
            .populate('thoughts')
            .then((user) => {
                !user
                    ? res.status(404).json({ message: 'No user found.' })
                    : res.json(user)
            })
            .catch((err) => res.status(500).json(err));
    },
    //Create one user
    createUser(req, res) {
        User.create(req.body)
            .then((user) => res.json(user))
            .catch((err) => res.status(500).json(err));
    },
    //Update a user
    updateUser(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
            .then((user) =>
                !user
                    ? res.status(404).json({ message: 'No user with ths id.' })
                    : res.json(user)
            )
            .catch((err) => res.status(500).json(err));
    },
    //Delete a user
    deleteUser(req, res) {
        User.findOneAndDelete({ _id: req.params.userId })
            .then((user) =>
                !user
                    ? res.status(404).json({ message: 'No user with this id.' })
                    //Delete thoughts created by the user that was deleted
                    : Thoughts.deleteMany({ _id: { $in: user.thoughts } })
            )
            .then(() => res.json({ message: 'User and associated thoughts deleted.' }))
            .catch((err) => res.status(500).json(err));
    },
    //Add a friend
    addFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $addToSet: { friends: req.params.friendId } },
            { runValidators: true, new: true }
        )
            .then((user) =>
                !user
                    ? res.status(404).json({ message: 'No user with this id.' })
                    : res.json(user)
            )
            .catch((err) => res.status(500).json(err));
    },
    //Delete a friend
    deleteFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $pull: { friends: req.params.friendId } },
            { new: true }
        )
            .then((user) =>
                !user
                    ? res.status(404).json({ message: 'No user with this id.' })
                    : res.json(user)
            )
            .catch((err) => res.status(500).json(err));
    }
};
