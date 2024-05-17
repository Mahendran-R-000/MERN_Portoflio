const Project = require('../models/projects_model');

const projectController = {};

// Create a new project
projectController.createProject = async (req, res, next) => {
    try {
        const { title, description, imageurl, link } = req.body;
        //console.log(req.body);
        const project = await Project.create({ title, description, imageurl, link });
        res.status(201).json(project);
    } catch (error) {
        next(error);
    }
};

// Get all projects
let c=0;
projectController.getProjects = async (req, res, next) => {
    try {
        const projects = await Project.find();
       // console.log(c++);
        res.json(projects);
    } catch (error) {
        next(error);
    }
};

// Update a project by ID
projectController.updateProject = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { title, description, imageurl, link } = req.body;
        const project = await Project.findByIdAndUpdate(
            id,
            { title, description, imageurl, link },
            { new: true }
        );
        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }
        res.json(project);
    } catch (error) {
        next(error);
    }
};

// Delete a project by ID
projectController.deleteProject = async (req, res, next) => {
    try {
        const { id } = req.params;
        const project = await Project.findByIdAndDelete(id);
        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }
        res.json({ message: 'Project deleted successfully' });
    } catch (error) {
        next(error);
    }
};

module.exports = projectController;
