// qualificationModel.js

const mongoose = require('mongoose');

const qualificationSchema = new mongoose.Schema({
    role: {
        type: String,
        required: true
    },
    company: {
        type: String,
        required: true
    },
    from: {
        type: Date,
        required: true
    },
    to: {
        type: Date,
        required: true
    }
});

const Qualification = mongoose.model('Qualifications', qualificationSchema,'Qualifications');

module.exports = Qualification;
