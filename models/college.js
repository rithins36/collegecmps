const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const collegeSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required:true
    },
    ranking: {
        type: Number,
        required:true
    },
   cutOff: [{ 
    branch: String,
    SM: Number, 
    EZ: Number, 
    MU: Number, 
    SC: Number, 
    ST: Number 
    }],
    
    link : {
        type: String,
        required:true
    }
}, { timestamps: true });

const College = mongoose.model('college details', collegeSchema);

module.exports = College;