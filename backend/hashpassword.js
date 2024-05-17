require('dotenv').config();
const bcrypt = require('bcrypt');

const plaintextPassword = process.env.ADMIN_PASSWORD;
const saltRounds = parseInt(process.env.SALT_ROUNDS) || 10;

console.log('Plaintext password:', plaintextPassword);
console.log('Salt rounds:', saltRounds);
console.log('All environment variables:', process.env.ADMIN_ORIGIN);

bcrypt.genSalt(saltRounds, (err, salt) => {
    if (err) {
        console.error('Error generating salt:', err);
        return;
    }

    // Hash the plaintext password using the generated salt
    bcrypt.hash(plaintextPassword, salt, (err, hashedPassword) => {
        if (err) {
            console.error('Error hashing password:', err);
            return;
        }

        // Store the hashed password and the salt in the database
        console.log('Salt:', salt);
        console.log('Hashed password:', hashedPassword);
    });
});
