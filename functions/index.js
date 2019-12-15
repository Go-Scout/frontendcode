const functions = require('firebase-functions');
const admin = require('firebase-admin')
const express = require('express')
const cors = require('cors')
const app = express()
const forbiddenCharacters = ['<', '>', '&lt;', '&gt;', '&']
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

app.post('/create/player', async (req, res) => {
    const player = req.body
    let sanitizedPlayer = sanitizeUser(player)
    if (typeof (sanitizedPlayer) === String) {
        return res.send(sanitizedPlayer)
    }

    db.collection('players').add(sanitizedPlayer).then(ref => {
        return res.send("success")
    }).catch(err => {
        console.log(err)
        return res.send("Error: Could not create player")
    })
})


function sanitizeUser(uncleansed) {
    for (i of JSON.stringify(uncleansed).split("")) {
        if (forbiddenCharacters.includes(i)) {
            return "Error: Inputs cannot contain any of the forbidden characters!"
        }
    }
    const cleansed = {
        name: uncleansed.name,
        highschool: uncleansed.highschool,
        height: parseInt(uncleansed.height),
        weight: parseInt(uncleansed.weight),
        mainPosition: uncleansed.mainPosition,
        sidePosition: uncleansed.sidePosition,
        arm: uncleansed.arm,
        graduatingClass: parseInt(uncleansed.graduatingClass),
    }

    return cleansed
}
exports.api = functions.https.onRequest(app)
