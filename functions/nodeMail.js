var nodemailer = require("nodemailer");

// var signature = `<p><br></p>
// <div data-smartmail="gmail_signature" dir="ltr">
//     <div dir="ltr">
//         <p style="color:rgb(80,0,80);"><span style="color:rgb(32,33,36);">---</span></p>
//         <table cellpadding="0" cellspacing="0" style="vertical-align:-webkit-baseline-middle;font-family:Arial;">
//             <tbody>
//                 <tr>
//                     <td style="vertical-align:middle;">
//                         <h3 color="#000000" style="margin:0px;color:rgb(0,0,0);">Information</h3>
//                         <p color="#000000" style="margin:0px;color:rgb(0,0,0);font-size:14px;line-height:22px;">Covenant Baptist Theological Seminary</p>
//                     </td>
//                     <td color="#003471" style="width:1px;border-bottom:none;border-left:1px solid rgb(0,52,113);"><br></td>
//                     <td style="vertical-align:middle;">
//                         <table cellpadding="0" cellspacing="0" style="vertical-align:-webkit-baseline-middle;font-family:Arial;">
//                             <tbody>
//                                 <tr>
//                                     <td style="vertical-align:middle;">
//                                         <table cellpadding="0" cellspacing="0" style="vertical-align:-webkit-baseline-middle;font-family:Arial;">
//                                             <tbody>
//                                                 <tr>
//                                                     <td style="vertical-align:bottom;">Phone:</td>
//                                                 </tr>
//                                             </tbody>
//                                         </table>
//                                     </td>
//                                     <td style="padding:0px;color:rgb(0,0,0);">270-925-6992</td>
//                                 </tr>
//                                 <tr>
//                                     <td style="vertical-align:middle;">
//                                         <table cellpadding="0" cellspacing="0" style="vertical-align:-webkit-baseline-middle;font-family:Arial;">
//                                             <tbody>
//                                                 <tr>
//                                                     <td style="vertical-align:bottom;">Email:</td>
//                                                 </tr>
//                                             </tbody>
//                                         </table>
//                                     </td>
//                                     <td style="padding:0px;"><a href="mailto:bigham@cbtseminary.org" target="_blank">info<span style="font-size:12px;">@cbtseminary.org</span></a></td>
//                                 </tr>
//                                 <tr>
//                                     <td style="vertical-align:middle;">
//                                         <table cellpadding="0" cellspacing="0" style="vertical-align:-webkit-baseline-middle;font-family:Arial;">
//                                             <tbody></tbody>
//                                         </table>
//                                     </td>
//                                 </tr>
//                                 <tr>
//                                     <td style="vertical-align:middle;">
//                                         <table cellpadding="0" cellspacing="0" style="vertical-align:-webkit-baseline-middle;font-family:Arial;">
//                                             <tbody>
//                                                 <tr>
//                                                     <td style="vertical-align:bottom;"><span color="#003471" style="margin-rightt: 10px;" width="16"><a color="#000000" href="https://cbtseminary.org/" style="color:rgb(0,0,0);font-size:12px; padding-right: 10px;" target="_blank">cbtseminary.org </a></span></td>
//                                                 </tr>
//                                             </tbody>
//                                         </table>
//                                     </td>
//                                     <td style="padding:0px;"><span color="#000000" style="font-size:12px;color:rgb(0,0,0);">1501 E 26th St, Owensboro, KY 42303</span></td>
//                                 </tr>
//                             </tbody>
//                         </table>
//                     </td>
//                 </tr>
//             </tbody>
//         </table>
//     </div>
// </div>
// `;

var signature = `<div dir=3D"ltr"><div class=3D"gmail_default" style=3D"font-family:times ne=
w roman,serif;font-size:small"><br clear=3D"all"></div><div><div dir=3D"ltr=
" class=3D"gmail_signature" data-smartmail=3D"gmail_signature"><div dir=3D"=
ltr"><p dir=3D"ltr" style=3D"line-height:1.38;margin-top:0pt;margin-bottom:=
0pt"><span style=3D"font-size:12pt;font-family:&#39;Times New Roman&#39;;co=
lor:#202124;background-color:#ffffff;font-weight:700;font-style:normal;font=
-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pr=
e;white-space:pre-wrap">Kind regards,</span></p><p dir=3D"ltr" style=3D"lin=
e-height:1.4000000000000001;margin-top:0pt;margin-bottom:0pt"><span style=
=3D"font-size:11pt;font-family:&#39;Times New Roman&#39;;color:#3c3c3b;back=
ground-color:transparent;font-weight:700;font-style:normal;font-variant:nor=
mal;text-decoration:none;vertical-align:baseline;white-space:pre;white-spac=
e:pre-wrap">Course Information</span></p><p dir=3D"ltr" style=3D"line-heigh=
t:1.2;margin-top:0pt;margin-bottom:0pt"><span style=3D"font-size:11pt;font-=
family:&#39;Times New Roman&#39;;color:#003471;background-color:transparent=
;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none=
;vertical-align:baseline;white-space:pre;white-space:pre-wrap">Covenant Bap=
tist Theological Seminary</span></p><p dir=3D"ltr" style=3D"line-height:1.2=
;margin-top:0pt;margin-bottom:0pt"><span style=3D"font-size:9pt;font-family=
:&#39;Times New Roman&#39;;color:#131313;background-color:transparent;font-=
weight:400;font-style:normal;font-variant:normal;text-decoration:none;verti=
cal-align:baseline;white-space:pre;white-space:pre-wrap">=E2=80=A6=E2=80=A6=
=E2=80=A6=E2=80=A6=E2=80=A6=E2=80=A6=E2=80=A6=E2=80=A6=E2=80=A6=E2=80=A6=E2=
=80=A6=E2=80=A6=E2=80=A6=E2=80=A6=E2=80=A6=E2=80=A6=E2=80=A6=E2=80=A6</span=
></p><p dir=3D"ltr" style=3D"line-height:1.38;margin-top:0pt;margin-bottom:=
0pt"><span></span></p><div dir=3D"ltr" style=3D"margin-left:0pt" align=3D"l=
eft"><table style=3D"border:none;border-collapse:collapse"><colgroup><col w=
idth=3D"264"></colgroup><tbody><tr style=3D"height:12pt"><td style=3D"verti=
cal-align:top;padding:1pt 1pt 1pt 1pt;overflow:hidden"><p dir=3D"ltr" style=
=3D"line-height:1.38;margin-top:0pt;margin-bottom:0pt"><span style=3D"font-=
size:9pt;font-family:&#39;Times New Roman&#39;;color:#131313;background-col=
or:transparent;font-weight:400;font-style:normal;font-variant:normal;text-d=
ecoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap=
">Ph: 270-925-6992</span></p></td></tr><tr style=3D"height:12pt"><td style=
=3D"vertical-align:top;padding:1pt 1pt 1pt 1pt;overflow:hidden"><p dir=3D"l=
tr" style=3D"line-height:1.38;margin-top:0pt;margin-bottom:0pt"><span style=
=3D"font-size:9pt;font-family:&#39;Times New Roman&#39;;color:#131313;backg=
round-color:transparent;font-weight:400;font-style:normal;font-variant:norm=
al;text-decoration:none;vertical-align:baseline;white-space:pre;white-space=
:pre-wrap"><a href=3D"mailto:course.info@cbtseminary.org" target=3D"_blank"=
>course.info@cbtseminary.org</a> - </span><a href=3D"http://cbtseminary.org=
/" style=3D"text-decoration:none" target=3D"_blank"><span style=3D"font-siz=
e:9pt;font-family:&#39;Times New Roman&#39;;color:#131313;background-color:=
transparent;font-weight:400;font-style:normal;font-variant:normal;text-deco=
ration:underline;vertical-align:baseline;white-space:pre;white-space:pre-wr=
ap">cbtseminary.org</span></a><span style=3D"font-size:9pt;font-family:&#39=
;Times New Roman&#39;;color:#131313;background-color:transparent;font-weigh=
t:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-a=
lign:baseline;white-space:pre;white-space:pre-wrap">=C2=A0=C2=A0=C2=A0=C2=
=A0=C2=A0=C2=A0=C2=A0</span></p></td></tr><tr style=3D"height:0pt"><td styl=
e=3D"vertical-align:top;padding:1pt 1pt 1pt 1pt;overflow:hidden"><p dir=3D"=
ltr" style=3D"line-height:1.38;margin-top:0pt;margin-bottom:0pt"><span styl=
e=3D"font-size:9pt;font-family:&#39;Times New Roman&#39;;color:#131313;back=
ground-color:transparent;font-weight:400;font-style:normal;font-variant:nor=
mal;text-decoration:none;vertical-align:baseline;white-space:pre;white-spac=
e:pre-wrap">1501 E 26th St Owensboro, KY 42303</span></p></td></tr><tr styl=
e=3D"height:23.75pt"><td style=3D"vertical-align:top;padding:2pt 5pt 5pt 1p=
t;overflow:hidden"><br></td></tr></tbody></table></div></div></div></div></=
div>`;

var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: `${process.env.EMAIL}`,
        pass: `${process.env.EMAIL_PASS}`
    }
});

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
     
      
    <div><a href="${process.env.CURRENT_DOMAIN}/api/courses/confirm/${sub._id}" style="background-color:#0d6cbf;border:1px solid #1e3650;border-radius:4px;color:#ffffff;display:inline-block;font-family:sans-serif;font-size:13px;font-weight:bold;line-height:30px;text-align:center;text-decoration:none;width:100px;-webkit-text-size-adjust:none;mso-hide:all;">CLICK HERE TO CONFIRM</a></div>
   
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

{/* <div><!--[if mso]>
      <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="${process.env.CURRENT_Domain}:${process.env.PORT}/api/courses/confirm/${sub._id}" style="height:30px;v-text-anchor:middle;width:100px;" arcsize="14%" strokecolor="#1e3650" fillcolor="#0d6cbf">
        <w:anchorlock/>
        <center style="color:#ffffff;font-family:sans-serif;font-size:13px;font-weight:bold;">Confirm</center>
      </v:roundrect>
    <![endif]--><a href="${process.env.CURRENT_DOMAIN}/api/courses/confirm/${sub._id}" style="background-color:#0d6cbf;border:1px solid #1e3650;border-radius:4px;color:#ffffff;display:inline-block;font-family:sans-serif;font-size:13px;font-weight:bold;line-height:30px;text-align:center;text-decoration:none;width:100px;-webkit-text-size-adjust:none;mso-hide:all;">Confirm</a></div> */}