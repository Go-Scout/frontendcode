const functions = require('firebase-functions');
const admin = require('firebase-admin')
const express = require('express')
const cors = require('cors')
const app = express()
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

admin.initializeApp(functions.config().firebase)

const db = admin.firestore()

app.use(cors())

app.use(express.urlencoded())

app.post('/createuser', async (req, res) => {
    db.collection('players').add(req.body).then(ref => {
        return res.send("success")
    }).catch(console.log)
})



exports.api = functions.https.onRequest(app)
