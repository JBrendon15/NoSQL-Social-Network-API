const {Schema, model} = require('mongoose');

const userSchema = new Schema({
    username: { 
        type: String, 
        unique: true, 
        required: true,
        trim: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
        validate: {
            validator: () => Promise.resolve(false),
            message: 'Please enter a valid email address.'
        }
        
    },
    thoughts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'thought',
        }
    ],
    friends: [ this ],
});

module.exports = userSchema;