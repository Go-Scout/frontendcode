function signout() {
    firebase.auth().signOut();
    window.location = "https://go-scout.web.app/index"
}