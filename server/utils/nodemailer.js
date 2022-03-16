const nodemailer = require("nodemailer");

function SandVerification(emailCode, toEmail) {
  return new Promise((resolve, reject) => {
    const transporter = nodemailer.createTransport({
      host: "smtp.163.com",
      port: 465,
      secureConnection: false,
      auth: {
        user: "allez2020g@163.com",
        pass: "NYZJTQUAEFQICNQQ",
      },
    });
    const send = (mailOptions) => {
      transporter.sendMail(mailOptions, function (err, info) {
        if (err) {
          return console.log(err);
        }
        resolve(info.messageId);
        console.log("Message send: %s", info.messageId);
      });
    };
    let email = {
      title: "验证码",
      htmlBody:
        '<h1>Hello!</h1><p style="font-size: 18px;color:#000;">在线的验证码为：<u style="font-size: 16px;color:#1890ff;">' +
        emailCode +
        '</u></p><p style="font-size: 14px;color:#666;">10分钟内有效</p>',
    };
    let mailOptions = {
      from: "allez2020g@163.com",
      to: toEmail,
      subject: email.title,
      html: email.htmlBody,
    };
    send(mailOptions);
  });
}

// SandVerification("124589", "2965157945@qq.com").then((res) => {
//   console.log(res);
//   console.log("发送成功");
// });

module.exports = SandVerification;
