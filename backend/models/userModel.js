const mongoose = require( "mongoose" )
mongoose.Promise = global.Promise;

const User = new mongoose.Schema( {
    name: {
        type: String,
        require: true
    },
    phone: {
        type: Number,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    }
}, { timestamps: true } )

module.exports =
    mongoose?.models?.User || mongoose.model( "User", User )