var nodemailer = require("nodemailer");

var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: `${process.env.EMAIL}`,
        pass: `${process.env.EMAIL_PASS}`
    }
});

function nodeNotification(event) {
    transporter.sendMail(
        {
            from: process.env.EMAIL,
            to: [`${process.env.EMAIL}`],
            subject: `Notification from ${event.service}`,
            html: `<p>${event.service} is down. Status code is: ${event.sCode} <br/></p>`
        },
        function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log("Email sent: " + info.response);
            }
        }
    );
}

module.exports = nodeNotification;
