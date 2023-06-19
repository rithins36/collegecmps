const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const collegeSchema = new Schema({
    name: {
        type: String,
        // required: true
    },
    location: {
        type: String,
        // required:true
    },
    ranking: {
        type: Number,
        // required:true
    },
    cutOff: [{ 
        branch: String,
        category: String,
        rank: Number
    }],
    placement: {
        type: Number,
        // required:true
    },
    link : {
        type: String,
        // required:true
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



const College = mongoose.model('college details', collegeSchema);

module.exports = College;