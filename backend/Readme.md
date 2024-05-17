# Portfolio Backend (NodeJS)

This project is a bakenc api system to acces and manage the portfolio, projects, skills, certifications, and contact information. the API is enhances with security for admin and non admin uses. Refer the below o foolow the endpoints.

## Table of Contents

1. [Introduction](#introduction)
2. [Endpoints](#endpoints)
3. [Technologies Used](#technologies-used)
4. [Installation](#installation)
5. [Usage](#usage)
6. [Contributing](#contributing)
7. [License](#license)
8. [Contact](#contact)

## Introduction

Welcome to my portfolio website! This project serves as a centralized hub for displaying my professional portfolio, including details about me, my projects, skills, certifications, and ways to contact me. Whether you're a potential employer, client, or collaborator, this website provides insights into my background, expertise, and accomplishments.

## Endpoints
## NON ADMIN
**Endpoints:**
- `GET /about`
- `GET /skills`
- `GET /certifications`
- `GET /qualifications`
- `GET /projects`


## ADMIN
### About Controller

The about section offers a detailed overview of my background, education, work experience, and professional interests.

**Model:** `About`

**Endpoints:**
- `GET api/about`
- `POST api/about`
- `PUT api/about/:id`
- `DELETE api/about/:id`

### Skills Controller

The skills section highlights my technical skills and proficiencies, showcasing the technologies and tools I'm proficient in.

**Model:** `Skill`

**Endpoints:**
- `GET api/skills`
- `POST api/skills`
- `PUT api/skills/:id`
- `DELETE api/skills/:id`

### Certifications Controller

The certifications section displays a carousel of my certifications, providing validation of my expertise and dedication to continuous learning.

**Model:** `Certification`

**Endpoints:**
- `GET api/certifications`
- `POST api/certifications`
- `PUT api/certifications/:id`
- `DELETE api/certifications/:id`

### Qualifications Controller

The qualifications section displays my academic and professional qualifications.

**Model:** `Qualification`

**Endpoints:**
- `GET api/qualifications`
- `POST api/qualifications`
- `PUT api/qualifications/:id`
- `DELETE api/qualifications/:id`

### Projects Controller

The projects section showcases a selection of my past projects, providing descriptions, screenshots, and links to their repositories or live demos.

**Model:** `Project`

**Endpoints:**
- `GET api/projects`
- `POST api/projects`
- `PUT api/projects/:id`
- `DELETE api/projects/:id`



## Technologies Used

- **Node.js**: JavaScript runtime built on Chrome's V8 JavaScript engine, used for server-side development.
- **Nodemon**: A tool that helps develop Node.js-based applications by automatically restarting the node application when file changes are detected.
- **Nodemailer**: A module for Node.js applications to allow easy email sending.
- **CORS (Cross-Origin Resource Sharing)**: A mechanism to allow or restrict requested resources on a web server depending on where the HTTP request was initiated.
- **JWT (JSON Web Token)**: A compact, URL-safe means of representing claims to be transferred between two parties, used for authentication.
- **JavaScript (ES6+)**: Modern JavaScript with ECMAScript 6+ features for more readable and efficient code.
- **Git & GitHub**: Version control system (Git) and repository hosting service (GitHub) for managing and sharing code.
  
## Installation

To run this project locally, follow these steps:

1. Clone the repository: `git clone https://github.com/Mahendran-R-000/React-Portfolio-SAP.git`
2. Navigate to the project directory: `cd backend`
3. Install dependencies: `npm install`
4. Start the development server: `npm start`
5. Server is running in  `http://localhost:4000`

## Usage
1. Define the Salt Rounds to Hash, Email,Password,JWT Key..etc
2. Use Hashpassword to create a hashed password to acces and store it in the MongoDB.
3. Enter email and password, click login button to authenticate, and access the admin dashboard.
4.  View, Add, edit, delete existing Skills,Certifictaions,Qualifications,Projects,About also.

## Contributing

Contributions to this project are welcome! If you find any bugs, have feature requests, or want to contribute improvements, please follow these steps:

1. Fork the repository on GitHub.
2. Create a new branch with a descriptive name: `git checkout -b feature/new-feature` or `bugfix/issue-fix`.
3. Make your changes and commit them: `git commit -am 'Add new feature'`.
4. Push your changes to your fork: `git push origin feature/new-feature`.
5. Submit a pull request to the main repository.

## License

This project is solely owned by Mahendran R. While it is not licensed under any specific open-source license, it is protected by copyright law. 

**Usage Guidelines:**
If you intend to use any part of this project, including its design, code, or assets, please reach out to me (Your Name) for permission. 
You are welcome to use this project for personal learning and inspiration, but commercial or public use requires explicit permission. 
Any use of this project must properly attribute the original creator Mahendran R and include a link back to the
[original repository](https://github.com/Mahendran-R-000/Mahendran-R-000/MERN_Portfolio).

## Contact

For any questions, feedback, or collaboration opportunities, feel free to reach out to me:

- Email: mahendran.06335@gmail.com
- LinkedIn: [Mahendran R](https://www.linkedin.com/in/mahendran-0-r/)
