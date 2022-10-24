const { User, Thought } = require('../models');

module.exports = {
    getThoughts(req, res) {
        Thought.find()
            .then((thoughts) => res.json(thoughts))
            .catch((err) => res.status(500).json(err));
    }, 
    getOneThought(req, res) {
        Thought.findOne({ _id: req.params.thoughtId })
        .select('-__v')
    }  
}