const nodemailer = require("nodemailer")
const { google } = require('googleapis')
const OAuth2 = google.auth.OAuth2
const fs = require('fs')
const {
  EMAIL_USERNAME,
  NODE_ENV,
  CLIENT_ID,
  CLIENT_SECRET,
  REFRESH_TOKEN,
  REDIRECT_URL
} = process.env



async function sendEmail(req, res, next) {
  if (!req.body.newContainer) {
    next()
  } else {
    const { fileName, containerNumber, sealNumber } = req.body.newContainer
    
    const oauth2Client = new OAuth2(
      CLIENT_ID, 
      CLIENT_SECRET,
      REDIRECT_URL
    )
  
    oauth2Client.setCredentials({
      refresh_token: REFRESH_TOKEN
    });
  
    const accessToken = oauth2Client.getAccessToken()
  
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      port: 465,
      host: "smtp.gmail.com",
      secure: true,
      tls:{
        secure: true,
  
      },
      auth: {
        type: 'OAuth2',
        user: EMAIL_USERNAME,
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken
      }
    })
  
    const testIndicator = NODE_ENV === "dev" ||' test' ? "(Test)" : ''
  
    const mailOptions = {
      from: EMAIL_USERNAME,
      to: [
        'onyensoh1987@hotmail.com', 
        // 'eze.onyensoh@yahoo.co.uk'
      ],
      subject: `Container Loaded ${testIndicator}`,
      attachments: [
        {path: `./${fileName}` }
      ],
      context: {containerNumber, sealNumber},
      template: 'email',
      html: {
        path: './email/email.handlebars'
      }
      
    }
  
    transporter.sendMail(mailOptions)
    .then((msgSent) => {
      console.log('SUCCESS?: ', msgSent)
      fs.unlink(`./${fileName}`, () => (
        console.log('...file deleted')
      ))
    })
    .catch(console.error)
      
    next()

  }
}
module.exports = { sendEmail }