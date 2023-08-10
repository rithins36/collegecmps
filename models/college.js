const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const collegeSchema = new Schema({
    name: {
        type: String,
    },

    location: {
        type: String,
    },

    branch: String,

    category: String,

    lastrank: {
        type : Number,
    },

    placed: {
        type: Number,
    },

    link : {
        type: String,
    }

}, { timestamps: true });

// const userSchema = new Schema({
//     username: {
//         type: String,
//         // required: true
//     },
//     emailId: {
//         type: String,
//         // required:true
//     },
//     password: {
//         type: String,
//         // required:true
//     },
//     number: {   
//         type: Number,
//         // required:true
//     }
// }, { timestamps: true });



const College = mongoose.model('new college details', collegeSchema);

module.exports = College;