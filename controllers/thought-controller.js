const { User, Thought } = require('../models');

module.exports = {
    //Get all thoughts
    getThoughts(req, res) {
        Thought.find()
            .populate('reactions')
            .then((thoughts) => res.json(thoughts))
            .catch((err) => res.status(500).json(err));
    },
    //Get one thought
    getOneThought(req, res) {
        Thought.findOne({ _id: req.params.thoughtId })
            .select('-__v')
            .populate('reactions')
            .then((thought) => {
                !thought
                    ? res.status(404).json({ message: 'No thought found with this id.' })
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
                    { $addToSet: { thoughts: thought._id } },
                    { new: true }
                )
                    .then((user) =>
                        !user
                            ? res.status(404).json({ message: 'Thought created, but no user with that id.' })
                            : res.json('Created thought.')
                    )
            })
            .catch((err) => res.status(500).json(err));
    },
    //Update a thought
    updateThought(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'No thought with this id.' })
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },
    //Delete a thought
    deleteThought(req, res) {
        Thought.findOneAndDelete({ _id: req.params.thoughtId })
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'No thought with this id.' })
                    : res.json('Thought deleted.')
            )
            .catch((err) => res.status(500).json(err));
    },
    //Create a reaction
    createReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $addToSet: { reactions: req.body } },
            { runValidators: true, new: true }
        )
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'No thought with this id.' })
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },
    //Delete a reaction
    deleteReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: { reactionId: req.params.reactionId } } },
            { runValidators: true, new: true }
        )
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'No thought with this id.' })
                    : res.json('Deleted reaction')
            )
            .catch((err) => res.status(500).json(err));
    }
}