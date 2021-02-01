var nodemailer = require("nodemailer");

var signature = `<p><br></p>
<div data-smartmail="gmail_signature" dir="ltr">
    <div dir="ltr">
        <p style="color:rgb(80,0,80);"><span style="color:rgb(32,33,36);">---</span></p>
        <table cellpadding="0" cellspacing="0" style="vertical-align:-webkit-baseline-middle;font-family:Arial;">
            <tbody>
                <tr>
                    <td style="vertical-align:middle;">
                        <h3 color="#000000" style="margin:0px;color:rgb(0,0,0);">Information</h3>
                        <p color="#000000" style="margin:0px;color:rgb(0,0,0);font-size:14px;line-height:22px;">Covenant Baptist Theological Seminary</p>
                    </td>
                    <td color="#003471" style="width:1px;border-bottom:none;border-left:1px solid rgb(0,52,113);"><br></td>
                    <td style="vertical-align:middle;">
                        <table cellpadding="0" cellspacing="0" style="vertical-align:-webkit-baseline-middle;font-family:Arial;">
                            <tbody>
                                <tr>
                                    <td style="vertical-align:middle;">
                                        <table cellpadding="0" cellspacing="0" style="vertical-align:-webkit-baseline-middle;font-family:Arial;">
                                            <tbody>
                                                <tr>
                                                    <td style="vertical-align:bottom;">Phone:</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                    <td style="padding:0px;color:rgb(0,0,0);">270-925-6992</td>
                                </tr>
                                <tr>
                                    <td style="vertical-align:middle;">
                                        <table cellpadding="0" cellspacing="0" style="vertical-align:-webkit-baseline-middle;font-family:Arial;">
                                            <tbody>
                                                <tr>
                                                    <td style="vertical-align:bottom;">Email:</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                    <td style="padding:0px;"><a href="mailto:bigham@cbtseminary.org" target="_blank">info<span style="font-size:12px;">@cbtseminary.org</span></a></td>
                                </tr>
                                <tr>
                                    <td style="vertical-align:middle;">
                                        <table cellpadding="0" cellspacing="0" style="vertical-align:-webkit-baseline-middle;font-family:Arial;">
                                            <tbody></tbody>
                                        </table>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="vertical-align:middle;">
                                        <table cellpadding="0" cellspacing="0" style="vertical-align:-webkit-baseline-middle;font-family:Arial;">
                                            <tbody>
                                                <tr>
                                                    <td style="vertical-align:bottom;"><span color="#003471" style="margin-rightt: 10px;" width="16"><a color="#000000" href="https://cbtseminary.org/" style="color:rgb(0,0,0);font-size:12px; padding-right: 10px;" target="_blank">cbtseminary.org </a></span></td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                    <td style="padding:0px;"><span color="#000000" style="font-size:12px;color:rgb(0,0,0);">1501 E 26th St, Owensboro, KY 42303</span></td>
                                </tr>
                            </tbody>
                        </table>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</div>
`;


var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: `${process.env.EMAIL}`,
        pass: `${process.env.EMAIL_PASS}`
    }
});
// var confirmLink = ` <a href="${process.env.CURRENT_Domain}:${process.env.PORT}/api/courses/confirm/${sub._id}"><strong>Confirm</strong></a>`

function nodeSend(event, result, sub) {
    transporter.sendMail(
        {
            from: process.env.EMAIL,
            to: `${event.proctorEmail}`,
            subject: `Password for ${event.studentFirst} ${event.studentLast}`,
            html: `<p>Thank you for serving as proctor for ${event.studentFirst} ${event.studentLast} <br/>
      The password needed for ${event.classCodeSelected}, ${event.testNumberSelected} is: <span style="font-size: 24px;">${result}</span>.</p><br/>
      <p style="font-size: 20px;">After the student has completed the ${event.classCodeSelected}/${event.testNumberSelected}, please confirm the following:</p>
      <p style="font-style: italic;"><strong>I confirm that ${event.studentFirst} ${event.studentLast} has taken ${event.classCodeSelected}/${event.testNumberSelected} without the use of a Bible, books, notes, or any other aids.</strong></p>
     
      <div><!--[if mso]>
      <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="${process.env.CURRENT_Domain}:${process.env.PORT}/api/courses/confirm/${sub._id}" style="height:30px;v-text-anchor:middle;width:100px;" arcsize="14%" strokecolor="#1e3650" fillcolor="#0d6cbf">
        <w:anchorlock/>
        <center style="color:#ffffff;font-family:sans-serif;font-size:13px;font-weight:bold;">Confirm</center>
      </v:roundrect>
    <![endif]--><a href="${process.env.CURRENT_DOMAIN}/api/courses/confirm/${sub._id}" style="background-color:#0d6cbf;border:1px solid #1e3650;border-radius:4px;color:#ffffff;display:inline-block;font-family:sans-serif;font-size:13px;font-weight:bold;line-height:30px;text-align:center;text-decoration:none;width:100px;-webkit-text-size-adjust:none;mso-hide:all;">Confirm</a></div>

      ${signature}
      `
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

module.exports = nodeSend;
