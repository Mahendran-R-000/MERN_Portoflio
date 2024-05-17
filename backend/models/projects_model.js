const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    imageurl: { type: String, required: true },
    link: { type: String }
});

const Project = mongoose.model('Projects', projectSchema,'Projects');

module.exports = Project;
