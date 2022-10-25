const { Schema, Types } = require('mongoose');
const { format_date } = require('../utils/dateFormat')

const reactionSchema = new Schema({
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId(),
    },
    reactionBody: {
        type: String,
        required: true,
        maxLength: 280,
    },
    username: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        get: (date) => format_date(date),
    },
},
{
    toJSON: {
        getters: true,
    }
},
);

module.exports = reactionSchema;