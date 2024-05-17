const Qualification = require('../models/qualifications_model');

// Controller function to create a new qualification
exports.createQualification = async (req, res) => {
    try {
        const qualification = await Qualification.create(req.body);
        res.status(201).json({ success: true, data: qualification });
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
};

// Controller function to get all qualifications
exports.getQualifications = async (req, res) => {
    try {
        //const qualifications = await Qualification.find();
        const qualifications = await Qualification.find().sort({  to: 1 });
        res.json(qualifications);
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

// Controller function to update a qualification by ID
exports.updateQualification = async (req, res) => {
    try {
        const qualification = await Qualification.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        if (!qualification) {
            return res.status(404).json({ success: false, error: 'Qualification not found' });
        }
        res.status(200).json({ success: true, data: qualification });
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
};

// Controller function to delete a qualification by ID
exports.deleteQualification = async (req, res) => {
    try {
        const qualification = await Qualification.findByIdAndDelete(req.params.id);
        if (!qualification) {
            return res.status(404).json({ success: false, error: 'Qualification not found' });
        }
        res.status(200).json({ success: true, data: {} });
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
};
