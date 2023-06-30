const mongoose = require( "mongoose" )
const { ObjectId } = require( "mongodb" );
mongoose.Promise = global.Promise;

const Quote = new mongoose.Schema( {
    quote: {
        type: String,
        require: true
    },
    authorId: {
        type: ObjectId,
        ref: "User",
        require: true
    },
    likes: [ {
        userId: {
            type: ObjectId,
            ref: 'User',
            required: true
        },
        timestamp: {
            type: Date,
            default: Date.now
        }
    } ],
    dislikes: [ {
        userId: {
            type: ObjectId,
            ref: 'User',
            required: true
        },
        timestamp: {
            type: Date,
            default: Date.now
        }
    } ]
}, { timestamps: true } )

module.exports =
    mongoose?.models?.Quote || mongoose.model( "Quote", Quote )