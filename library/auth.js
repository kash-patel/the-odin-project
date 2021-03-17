(function () {
  var firebaseConfig = {
    apiKey: "AIzaSyDCm3HQV7IA4xnLnZjamMNeLrXRV7NdYfs",
    authDomain: "the-odin-project-library-e4c00.firebaseapp.com",
    projectId: "the-odin-project-library-e4c00",
    storageBucket: "the-odin-project-library-e4c00.appspot.com",
    messagingSenderId: "948003883095",
    appId: "1:948003883095:web:d1701e7045d0b9f7d4bb12"
  };

  firebase.initializeApp(firebaseConfig);
  const database = firebase.database();

  let ui = null;
  let provider = null;
  let toggleAuthButton = null;

  toggleAuthButton = document.getElementById("auth-button");
  ui = new firebaseui.auth.AuthUI(firebase.auth());
  provider = new firebase.auth.GoogleAuthProvider();
  provider.addScope('https://www.googleapis.com/auth/plus.login');

  firebase.auth().onAuthStateChanged(user => {
    
    if (user) {
      // User is signed in.
      console.log("User: " + user.displayName);

      toggleAuthButton.textContent = "Sign Out";

      toggleAuthButton.addEventListener("click", () => {
        signOut();
      });

      toggleAuthButton.removeEventListener("click", () => {
        signIn(provider);
      });

    } else {
      // No user is signed in.
      console.log("No user.");

      toggleAuthButton.textContent = "Sign In";

      toggleAuthButton.removeEventListener("click", () => {
        signOut();
      });

      toggleAuthButton.addEventListener("click", () => {
        signIn(provider);
      });
    }
  });
}());

function signIn (provider) {

  firebase.auth().signInWithRedirect(provider);

  firebase.auth()
  .getRedirectResult()
  // .signInWithPopup(provider)
  .then((result) => {
    /** @type {firebase.auth.OAuthCredential} */
    var credential = result.credential;

    // This gives you a Google Access Token. You can use it to access the Google API.
    var token = credential.accessToken;
    // The signed-in user info.
    var user = result.user;
    // ...
    console.log(user.displayName + " logged in.");
  }).catch((error) => {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    // ...
  });
}

function signOut () {

  firebase.auth().signout();
}