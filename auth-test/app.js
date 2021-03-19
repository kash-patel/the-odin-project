
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCRKHTG7GAnc6U4cB5kfQQ9MKkqG-Mxp30",
  authDomain: "auth-test-77b78.firebaseapp.com",
  projectId: "auth-test-77b78",
  storageBucket: "auth-test-77b78.appspot.com",
  messagingSenderId: "1062328584906",
  appId: "1:1062328584906:web:16b4265f102cb62b678233"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const provider = new firebase.auth.GoogleAuthProvider();
// Initialize the FirebaseUI Widget using Firebase.
const ui = new firebaseui.auth.AuthUI(firebase.auth());


const loginButton = document.getElementById("loginButton");
const logoutButton = document.getElementById("logoutButton");

loginButton.onclick = () => firebase.auth().signInWithRedirect(provider);
logoutButton.onclick = () => firebase.auth().signOut();

ui.start('#firebaseui-auth-container', {
  signInOptions: [
    // List of OAuth providers supported.
    firebase.auth.GoogleAuthProvider.PROVIDER_ID
  ],
  // Other config options...
  signInSuccessURL: "/auth-test"
});


firebase.auth().onAuthStateChanged (user => {
  console.log("Auth state changed.");
  if (user) {
    console.log("Hi " + user.displayName + "!");
  } else { console.log("No user."); }

});