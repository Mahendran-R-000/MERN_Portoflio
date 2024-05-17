// skillsController.js

const Skill = require('../models/skills_model');

exports.createSkill = async (req, res, next) => {
    try {

        const { name, imageurl } = req.body;
        const skill = new Skill({ name, imageurl });
        await skill.save();
        res.status(201).json(skill);
    } catch (error) {
        next(error);
    }
};

exports.getSkills = async (req, res, next) => {
    try {
        const skills = await Skill.find();

        res.json(skills);
    } catch (error) {
        next(error);
    }
};

exports.updateSkill = async (req, res, next) => {
    try {
        const { name, imageurl } = req.body;
        const skillId = req.params.id;
        const skill = await Skill.findByIdAndUpdate(skillId, { name, imageurl }, { new: true });
        res.json(skill);
    } catch (error) {
        next(error);
    }
};

exports.deleteSkill = async (req, res, next) => {
    try {
        const skillId = req.params.id;
        await Skill.findByIdAndDelete(skillId);
        res.json({ message: 'Skill deleted successfully' });
    } catch (error) {
        next(error);
    }
};
