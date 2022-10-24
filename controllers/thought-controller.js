const { User, Thought } = require('../models');

module.exports = {
    //Get all thoughts
    getThoughts(req, res) {
        Thought.find()
            .then((thoughts) => res.json(thoughts))
            .catch((err) => res.status(500).json(err));
    }, 
    //Get one thought
    getOneThought(req, res) {
        Thought.findOne({ _id: req.params.thoughtId })
        .select('-__v')
        .then((thought) => {
            !thought
            ? res.status(404).json({ message: 'No thought found with that id.'})
            : res.json(thought)
        })
        .catch((err) => res.status(500).json(err));

    },
    //Create a thought
    createThought(req, res) {
        Thought.create(req.body)
        .then((thought) => {
            return User.findOneAndUpdate(
                { _id: req.body.userId },
                { $addToSet: { thoughts: thought._id}},
                { new: true }
            )
            .then((user) => 
            !user
            ? res.status(404).json({ message: 'Thought created, but no user with that id.'})
            : res.json('Created thought.')
            )
        })
        .catch((err) => res.status(500).json(err));
    }
}