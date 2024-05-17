const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    imageurl: {
        type: String,
        required: true
    }
});

const Skill = mongoose.model('Skills', skillSchema,'Skills');

module.exports = Skill;
