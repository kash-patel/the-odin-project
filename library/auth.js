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

  const loginButton = document.getElementById("login-button");
  const logoutButton = document.getElementById("logout-button");
  const greeting = document.getElementById("greeting");

  const ui = new firebaseui.auth.AuthUI(firebase.auth());
  const provider = new firebase.auth.GoogleAuthProvider();
  // provider.addScope('https://www.googleapis.com/auth/plus.login');

  loginButton.onclick = () => firebase.auth().signInWithRedirect(provider);
  logoutButton.onclick = () => firebase.auth().signOut();
  
  logoutButton.hidden = true;
  greeting.hidden = true;

  firebase.auth().onAuthStateChanged(user => {

    console.log("State changed.")
    
    if (user) {

      // User is signed in.
      loginButton.hidden = true;
      
      greeting.hidden = false;
      greeting.textContent = "Hi, " + user.displayName + "!<br/>Welcome to the Library!";
      logoutButton.hidden = false;

    } else {

      // No user is signed in.
      loginButton.hidden = false;
      
      greeting.hidden = true;
      // greeting.textContent = "Hi, " + user.displayName + "!<br/>Welcome to the Library!";
      logoutButton.hidden = true;
    }
  });
}());

function signIn (provider) {

  // console.log("Signing in...");
  // firebase.auth().signInWithRedirect(provider);


  // firebase.auth().getRedirectResult().then((result) => {
    
  //   /** @type {firebase.auth.OAuthCredential} */
  //   var credential = result.credential;

  //   // This gives you a Google Access Token. You can use it to access the Google API.
  //   var token = credential.accessToken;

  //   // The signed-in user info.
  //   var user = result.user;

  //   // ...

  // }).catch((error) => {

  //   // Handle Errors here.
  //   var errorCode = error.code;
    
  //   var errorMessage = error.message;
    
  //   // The email of the user's account used.
  //   var email = error.email;
    
  //   // The firebase.auth.AuthCredential type that was used.
  //   var credential = error.credential;
    
  //   // ...
  // });
}

function signOut () {
  // firebase.auth().signOut();
}