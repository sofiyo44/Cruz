const nodemailer = require('nodemailer');

async function sendTestEmail() {
    let transporter = nodemailer.createTransport({
        host: 'smtp.mochaemail.com', // Typically the SMTP server for Mochahost
        port: 587, // Port for TLS
        secure: false, // true for port 465, false for port 587
        auth: {
            user: 'sofia@cruisescatalog.com', // Your email address
            pass: 'Wawarasa1!', // Your email password
        },
    });

    try {
        let info = await transporter.sendMail({
            from: '"Cruises Catalog" <info@cruisescatalog.com>', // sender address
            to: 'info@cruisescatalog.com', // list of receivers
            subject: 'Test Email from Cruises Catalog', // Subject line
            text: 'This is a test email sent from Cruises Catalog.', // plain text body
            html: '<b>This is a test email sent from Cruises Catalog.</b>', // html body
        });

        console.log('Message sent: %s', info.messageId);
    } catch (error) {
        console.error('Error sending email:', error);
    }
}

sendTestEmail().catch(console.error);
