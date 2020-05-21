const {EMAIL_USERNAME, EMAIL_PASSWORD} = process.env
const fs = require('fs')
const nodemailer = require("nodemailer")
// const hbs = require('nodemailer-express-handlebars')

function createFile({containerContent, date}) {
  console.log('CREATING FILE')
  console.log(containerContent)
  const contentObj = containerContent.reduce((obj, stack) => {
    stack.stackContent.forEach((bale) => {
      if (!obj[bale]) obj[bale] = 1
      else obj[bale] += 1
    })
    return obj
  }, {})
  const fileName = `${date}_container.txt`

  fs.writeFileSync(fileName, JSON.stringify(contentObj,null,2))
  return fileName
}

async function email(fileName,{ containerNumber, sealNumber}) {
  console.log('SENDING EMAIL')

  const transporter = await nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: EMAIL_USERNAME,
      pass: EMAIL_PASSWORD
    },
    port: 465,
    host: "smtp.gmail.com",
    secure: true,
    tls:{
      secure: true,

    }
  })

  // transporter.use('compile',hbs({
  //   viewEngine: 'express-handlebars',
  //   viewPath: './email/email.handlebars',
  //   extName: '.handlebars'
    
  // }))

  const mailOptions = {
    from: EMAIL_USERNAME,
    to: 'onyensoh1987@hotmail.com',
    subject: 'Container Loaded',
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
  })
  .catch(console.error)
    
  //   (error, info) => {
  //   if (error) console.error('Email Error: ',  error)
  //   else console.log(`Email sent: ${info.response}`)
  // }

}
module.exports = { createFile, email }