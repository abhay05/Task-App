const sgMail=require('@sendgrid/mail')

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendWelcomeEmail = async (email,name)=>{
    console.log(email,name,"xxxxxxxxxxxxxxxxxxxxxxx")
    try{
    await sgMail.send({
        to:email,
        from:'abhaypsc.5@gmail.com',
        subject:'Thanks for joining in!',
        text:`Hi ${name}.`
    })}
    catch(e){
        console.log('Error ',e)
    }
}

sendWelcomeEmail('abhayfire.5.8@gmail.com','Abhay')

const sendCancellationEmail=(email,name)=>{
    sgMail.send({
        to:email,
        from:'abhaypsc.5@gmail.com',
        subject:'Sorry to see you go',
        text:`Goodbye ${name}.`
    })
}

module.exports={
    sendWelcomeEmail,
    sendCancellationEmail
}