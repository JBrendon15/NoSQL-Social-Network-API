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
        //Validation for input to be an email with regex
        match: [
            /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-z]+)$/,
            'Please enter a valid email address.'
        ]
        
    },
    thoughts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'thoughts',
        }
    ],
    friends: [
        {
            type: Schema.Types.ObjectId,
            ref: 'users',
        }
    ],
},
{
    toJSON: {
        virtuals: true,
    },
    id: false,
}
);
//Create a virtual for friendCount
userSchema.virtual('friendCount').get(function () {
    return this.friends.length;
});
//Create users model
const User = model('users', userSchema);

module.exports = User;