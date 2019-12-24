var firebaseConfig = {
    apiKey: "AIzaSyDOjiZ--U5gWKZTMyvd3juQle-4OQuHGpE",
    authDomain: "go-scout.firebaseapp.com",
    databaseURL: "https://go-scout.firebaseio.com",
    projectId: "go-scout",
    storageBucket: "go-scout.appspot.com",
    messagingSenderId: "376398836043",
    appId: "1:376398836043:web:abbd1bb48d5dc1b1b538ce",
    measurementId: "G-044W9K81T1"
}
firebase.initializeApp(firebaseConfig)
//user creation
const auth = firebase.auth()
const signUpFrom = document.querySelector('#signup-form')
signUpFrom.addEventListener('submit', (e) => {
  e.preventDefault()
  const email = signUpFrom['signup-email'].value //reteves users information required at probaseballreport domain
  const password = signUpFrom['signup-password'].value
  auth.createUserWithEmailAndPassword(email, password).catch(function(error) {
    //Handling Errors
    let errorCode = error.code
    let errorMessage = error.message
    if (errorCode == 'email-already-in-use') {
      alert('An account already exists with that email.')
    } else if (errorCode == 'auth/invalid-email') {
      alert('The email address you entered is not valid.')
    } else if (errorCode == 'auth/weak-password') {
      alert('The password you entered is too weak.')
    } else {
      alert(errorMessage)
    }
    console.log(error)
  }).then(cred => {
    console.log('User Created')
    auth.signInWithEmailAndPassword(email, password).then(cred => {
      console.log('User Logged In')
      document.querySelector('#showcase').style.display = 'flex'
      document.querySelector('#logout').style.display = 'flex'
      document.querySelector('#login').style.display = 'none'
      document.querySelector('#signup').style.display = 'none'
      $('#sum').modal('hide')
    })
  })
})

//logout 
const logout = document.querySelector('#logout')
logout.addEventListener('click', (e) => {
  e.preventDefault()
  auth.signOut().then(() => {
    console.log("User Logged Out")
})
  document.querySelector('#showcase').style.display = 'none'
  document.querySelector('#login').style.display = 'flex'
  document.querySelector('#logout').style.display = 'none'
  document.querySelector('#signup').style.display = 'none'
})
//login 
const loginForm = document.querySelector('#loginForm')
loginForm.addEventListener('submit', (e) => {
  e.preventDefault()
  const email = loginForm['login-email'].value
  const password = loginForm['login-password'].value
  auth.signInWithEmailAndPassword(email, password).catch(function(error) {
    //Handling Errors
    let errorCode = error.code
    let errorMessage = error.message
    if (errorCode == 'auth/user-not-found') {
        alert('There is no account with that email.')
    } else if (errorCode == 'auth/wrong-password') {
        alert('Incorrect password.')
    } else {
        alert(errorMessage)
    }
    console.log(error)
  }).then(cred => {
    console.log('User Logged In')
    document.querySelector('#showcase').style.display = 'flex'
    document.querySelector('#logout').style.display = 'flex'
    document.querySelector('#login').style.display = 'none'
    document.querySelector('#signup').style.display = 'none'
    $('#lgm').modal('hide')
  })
})