// aboutController.js

const About = require('../models/about_model');
/*
exports.createAbout = async (req, res, next) => {
    try {
        const { description, resume } = req.body;
        const about = new About({ description, resume});
        await about.save();
        res.status(201).json(about);
    } catch (error) {
        next(error);
    }
};*/

exports.getAbout = async (req, res, next) => {
    try {
        const about = await About.findOne();

        res.json(about);
    } catch (error) {
        next(error);
    }
};

exports.updateAbout = async (req, res, next) => {
    try {
        const { imageurl,description, resume } = req.body;
        const about = await About.findOneAndUpdate({}, { imageurl,description, resume }, { new: true });
        res.json(about);
    } catch (error) {
        next(error);
    }
};
