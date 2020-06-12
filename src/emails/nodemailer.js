const nodemailer=require('nodemailer')

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD
    }
})


const sendmail=(email,name,message)=>{
const mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: name,
    text: message=="Bye"?"Sorry to see you go":"Thanks for joining",
    replyTo: process.env.EMAIL
}

transporter.sendMail(mailOptions, function(err, res) {
    if (err) {
      console.error('there was an error: ', err);
    } else {
      console.log('here is the res: ', res)
    }
})
}

module.exports=sendmail