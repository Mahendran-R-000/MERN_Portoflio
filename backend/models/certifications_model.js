const mongoose = require('mongoose');

const certificationSchema = new mongoose.Schema({
    title: { type: String, required: true },
    imageurl: { type: String, required: true }
});

const Certification = mongoose.model('Certifications', certificationSchema,'Certifications');

module.exports = Certification;
