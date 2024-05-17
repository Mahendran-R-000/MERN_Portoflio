const mongoose = require('mongoose');

const aboutSchema = new mongoose.Schema({
    imageurl: {
        type: String,
    },
    description: {
        type: String,
        required: true
    },
    resume: {
        type: String,
        required: true
    }
});

const About = mongoose.model('About', aboutSchema,'About');

module.exports = About;
