var firebaseConfig = {
    apiKey: "AIzaSyDOjiZ--U5gWKZTMyvd3juQle-4OQuHGpE",
    authDomain: "go-scout.firebaseapp.com",
    databaseURL: "https://go-scout.firebaseio.com",
    projectId: "go-scout",
    storageBucket: "go-scout.appspot.com",
    messagingSenderId: "376398836043",
    appId: "1:376398836043:web:abbd1bb48d5dc1b1b538ce",
    measurementId: "G-044W9K81T1"
};
firebase.initializeApp(firebaseConfig);
var ui = new firebaseui.auth.AuthUI(firebase.auth())
firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
  .then(function() {
    return firebase.auth().signInWithEmailAndPassword(email, password)
  })
  .catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
})
function signout() {
  firebase.auth().signOut();
  window.location = "https://go-scout.web.app/index"
}
var uiConfig = {
    callbacks: {
      signInSuccessWithAuthResult: function(authResult, redirectUrl) {
        // User successfully signed in.
        // Return type determines whether we continue the redirect automatically
        // or whether we leave that to developer to handle.
        return true
      },
      uiShown: function() {
        // The widget is rendered.
        // Hide the loader.
        document.getElementById('loader').style.display = 'none'
      }
    },
    credentialHelper: firebaseui.auth.CredentialHelper.NONE,
    signInFlow: 'popup',
    signInSuccessUrl: 'https://go-scout.web.app/home',
    signInOptions: [
      // Leave the lines for 
      firebase.auth.EmailAuthProvider.PROVIDER_ID,
    ],
}
ui.start('#firebaseui-auth-container', uiConfig)