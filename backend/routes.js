const express = require('express');
const router = express.Router();
const aboutController = require('./controllers/about_controller');
const skillsController = require('./controllers/skills_controller');
const qualificationController = require('./controllers/qualifications_controller');
const projectController = require('./controllers/projects_controller');
const certificationController = require('./controllers/certifications_controller');
const cors = require("cors");
const {adminAuthMiddleware} = require("./middleware/authMiddleware");
const verifyToken = require("./middleware/verify_token");
const {generateToken} = require("./middleware/authMiddleware");
const nodemailer = require('nodemailer');
require("dotenv").config()



const nonAdminCorsOptions = {
    origin: process.env.NON_ADMIN_ORIGIN,
    methods: ['GET', 'POST'],

};

router.get('/about', cors(nonAdminCorsOptions), aboutController.getAbout);
router.get('/qualifications', cors(nonAdminCorsOptions), qualificationController.getQualifications);
router.get('/skills', cors(nonAdminCorsOptions), skillsController.getSkills);
router.get('/certifications', cors(nonAdminCorsOptions), certificationController.getCertifications);
router.get('/projects', cors(nonAdminCorsOptions), projectController.getProjects);

// Endpoint to handle form submission

router.post('/send-email', cors(nonAdminCorsOptions), async (req, res) => {
    try {
        // Destructure form data from request body
        const { name, email, project, message } = req.body;

        // Create transporter object using SMTP transport
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER, // Your Gmail email address
                pass: process.env.EMAIL_PASSW // Your Gmail password
            }
        });

        // Define email options
        const mailOptions = {
            from: email,
            to: process.env.EMAIL_USER,
            subject: `${project}`,
            text: `
               ${name}\n
               ${email}\n
               ${message}
            `
        };

        // Send email
        await transporter.sendMail(mailOptions);

        // Send success response
        res.status(200).json({ message: 'Message sent successfully' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ message: 'Failed to send message. Please try again later.' });
    }
});

/*
// Apply CORS middleware for non-admin routes
router.use(['/about', '/skills', '/qualifications', '/certifications', '/projects'], (req, res, next) => {
    cors(nonAdminCorsOptions)(req, res, next);
});

router.get('/about', aboutController.getAbout);
router.get('/qualifications', qualificationController.getQualifications);
router.get('/skills', skillsController.getSkills);
router.get('/certifications', certificationController.getCertifications);
router.get('/projects', projectController.getProjects);
*/


const verifyAdminToken = (req, res, next) => {
    verifyToken(req, res, next);
};

// Middleware function to allow CORS for admin origins
const adminCorsOptions = {

    origin:process.env.ADMIN_ORIGIN,

    methods: ['GET', 'POST', 'PUT', 'DELETE'],
};
// Apply CORS middleware for admin routes
router.use(['/login', '/logout', '/api/*'], cors(adminCorsOptions));

router.post('/login', adminAuthMiddleware, (req, res) => {
    const token = res.locals.token;
    res.header('Authorization', `Bearer ${token}`);
    res.status(200).json({ token: token, message: 'Login successful' });
});
router.post('/logout', (req, res) => {
    //localStorage.removeItem('token');

    res.status(200).json({ message: 'Logout successful' });
});




// router.post('/about', aboutController.createAbout);
router.use('/api/*', verifyAdminToken);
//admin
router.get('/api/refresh-token', (req, res) => {
    try {
        //console.log(req.admin.email);
        //const { email } = req.admin.email;

        // Generate a new token with the extracted email
        const newToken = generateToken(req.admin);

        // Send the new token in the response
        res.json({ token: newToken });
    } catch (error) {
        console.error('Error refreshing token:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


router.get('/api/about', aboutController.getAbout);
router.put('/api/about', aboutController.updateAbout);

router.get('/api/skills', skillsController.getSkills);
router.post('/api/skills', skillsController.createSkill);
router.put('/api/skills/:id', skillsController.updateSkill);
router.delete('/api/skills/:id', skillsController.deleteSkill);

router.get('/api/qualifications', qualificationController.getQualifications);
router.post('/api/qualifications', qualificationController.createQualification);
router.put('/api/qualifications/:id', qualificationController.updateQualification);
router.delete('/api/qualifications/:id', qualificationController.deleteQualification);

router.get('/api/certifications', certificationController.getCertifications);
router.post('/api/certifications', certificationController.createCertification);
router.put('/api/certifications/:id', certificationController.updateCertification);
router.delete('/api/certifications/:id', certificationController.deleteCertification);


router.get('/api/projects', projectController.getProjects);
router.post('/api/projects', projectController.createProject);
router.put('/api/projects/:id', projectController.updateProject);
router.delete('/api/projects/:id', projectController.deleteProject);


module.exports = router;
