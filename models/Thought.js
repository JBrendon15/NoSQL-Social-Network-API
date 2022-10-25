const { Schema, model} = require('mongoose');
const reactionSchema = require('./Reaction');
const { format_date } = require('../utils/dateFormat')

const thoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 280,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        get: (date) => format_date(date)
    },
    username: {
        type: String,
        required: true,

    },
    reactions: [reactionSchema],
},
{
    toJSON: {
        virtuals: true,
        getters: true,
    },
    id: false,
}
);
//Create virtual reactionCount
thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});
//Create thoughts model
const Thought = model('thoughts', thoughtSchema);

module.exports = Thought;