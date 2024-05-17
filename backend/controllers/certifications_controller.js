const Certification = require('../models/certifications_model');

const certificationController = {};

// Create a new certification
certificationController.createCertification = async (req, res, next) => {
    try {
        const { title, imageurl } = req.body;
        const certification = await Certification.create({ title, imageurl });
        res.status(201).json(certification);
    } catch (error) {
        next(error);
    }
};

// Get all certifications

certificationController.getCertifications = async (req, res, next) => {
    try {
        const certifications = await Certification.find();

        res.json(certifications);
    } catch (error) {
        next(error);
    }
};

// Update a certification by ID
certificationController.updateCertification = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { title, imageurl } = req.body;
        const certification = await Certification.findByIdAndUpdate(
            id,
            { title, imageurl },
            { new: true }
        );
        if (!certification) {
            return res.status(404).json({ message: 'Certification not found' });
        }
        res.json(certification);
    } catch (error) {
        next(error);
    }
};

// Delete a certification by ID
certificationController.deleteCertification = async (req, res, next) => {
    try {
        const { id } = req.params;
        const certification = await Certification.findByIdAndDelete(id);
        if (!certification) {
            return res.status(404).json({ message: 'Certification not found' });
        }
        res.json({ message: 'Certification deleted successfully' });
    } catch (error) {
        next(error);
    }
};

module.exports = certificationController;
