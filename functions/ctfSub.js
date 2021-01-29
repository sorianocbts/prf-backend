var nodemailer = require("nodemailer");

var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: `${process.env.EMAIL}`,
        pass: `${process.env.EMAIL_PASS}`
    }
});

function ctfSub(event) {
    transporter.sendMail(
        {
            from: process.env.EMAIL,
            to: [`${process.env.SUBS_EMAIL}`],
            subject: `New Subscriber from confessingthefaith.com`,
            html: `<p>Subscribe this email to your Newsleetter: ${event.email}.<br/></p>`
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

module.exports = ctfSub;
