//Modified off of the CDCW Firebase Contact Form
const functions = require('firebase-functions')
const admin = require('firebase-admin')
const nodemailer = require('nodemailer')

//to make it work you need gmail account
const gmailEmail = functions.config().gmail.login
const gmailPassword = functions.config().gmail.pass

admin.initializeApp()

//creating function for sending emails
var goMail = function (message, name, email) {


    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        requireTLS: true,
        auth: {
            type: 'login',
            user: gmailEmail,
            pass: gmailPassword
        }
    })


    // setup email data with unicode symbols
    //this is how your email are going to look like
    let mailOptions = {
        from: gmailEmail, // sender address
        to: 'alexdelrio@prepbaseballreport.com', // list of receivers
        subject: 'Contact Form Received', // Subject line
        text: "Message for you:" + message, // plain text body
        html: ``// html body
    }

    //this is callback function to return status to firebase console
    const getDeliveryStatus = function (error, info) {
        if (error) {
            return console.log(error)
        }
        console.log('Message sent: %s', info.messageId)
        // EX Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
    }

    //call of this function send an email, and return status
    transporter.sendMail(mailOptions, getDeliveryStatus)
}

//.onDataAdded is watches for changes in database
exports.onDataAdded = functions.database.ref('/emails/{sessionId}').onCreate(function (snap, context) {

    //here we catch a new data, added to firebase database, it stored in a snap variable
    const createdData = snap.val()
    var email = createdData.mail
    var name = createdData.name
    var message = createdData.message

    //here we send new data using function for sending emails
    goMail(message, name, email)
})
