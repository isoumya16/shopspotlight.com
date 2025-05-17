const db = require('../config/db');
const nodemailer = require('nodemailer');

const ContactController = {
    // Save contact form data and send email notification
    submitcontactform: (req, res) => {
        const { name, email, subject, message } = req.body;

        // Data to insert into the database
        const contactData = { name, email, subject, message };

        db.query('INSERT INTO contacts SET ?', [contactData], (error, result) => {
            if (error) {
                res.send(JSON.stringify({ 'error': error.message, 'message': '' }));
            } else {
                // Configure email transport
                const transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        user: 'soumyamajumder201817@gmail.com', // Replace with your email
                        pass: 'Barojonepur@2024', // Replace with your email password or app-specific password
                    },
                });

                // Email details
                const mailOptions = {
                    from: email, // User's email ID
                    to: 'soumyamajumder201817@gmail.com', // Replace with your email address
                    subject: `New Contact Form Submission: ${subject}`,
                    text: `
                        Name: ${name}
                        Email: ${email}
                        Subject: ${subject}
                        Message: ${message}
                    `,
                };

                // Send email notification
                transporter.sendMail(mailOptions, (mailError) => {
                    if (mailError) {
                        res.send(JSON.stringify({ 'error': mailError.message, 'message': '' }));
                    } else {
                        res.send(JSON.stringify({ 'error': '', 'message': 'Form submitted and email sent successfully!' }));
                    }
                });
            }
        });
    },

    // List all contact form submissions
    contactlist: (req, res) => {
        db.query('SELECT * FROM contacts', [], (error, result) => {
            if (error) {
                res.send(JSON.stringify({ 'error': error.message, 'message': '' }));
            } else {
                res.send(JSON.stringify({ 'error': '', 'message': result }));
            }
        });
    },

    // Get details of a single contact submission by ID
    singlecontact: (req, res) => {
        const contactId = { id: req.params.id };

        db.query('SELECT * FROM contacts WHERE ?', [contactId], (error, result) => {
            if (error) {
                res.send(JSON.stringify({ 'error': error.message, 'message': '' }));
            } else {
                res.send(JSON.stringify({ 'error': '', 'message': result }));
            }
        });
    },

    // Delete a contact form submission by ID
    deletecontact: (req, res) => {
        const contactId = { id: req.params.id };

        db.query('DELETE FROM contacts WHERE ?', [contactId], (error, result) => {
            if (error) {
                res.send(JSON.stringify({ 'error': error.message, 'message': '' }));
            } else {
                res.send(JSON.stringify({ 'error': '', 'message': 'Contact form submission deleted successfully!' }));
            }
        });
    },
};

module.exports = ContactController;
