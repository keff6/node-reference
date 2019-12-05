const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SENDGRID_AP_KEY)

const sendWelcomeEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: 'kev.fallas+google@gmail.com',
    subject: 'Thanks for joining in!',
    text: `Welcome to the app, ${name}. Let me know how you get along with the app.`
  })
}

const sendCancelationEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: 'kev.fallas+google@gmail.com',
    subject: 'Why are you running away!',
    text: `What happened, ${name}?. I though we were frinds. So long then!`
  })
}

module.exports = {
  sendWelcomeEmail,
  sendCancelationEmail
}