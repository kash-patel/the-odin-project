/**
 * Contains methods related to user authentication.
 */

"use strict";


const Auth = (function () {

  const auth = firebase.auth();

  let currentUID = -1;

  const loginButton = document.getElementById("login-button");
  const logoutButton = document.getElementById("logout-button");
  const greeting = document.getElementById("greeting");

  const ui = new firebaseui.auth.AuthUI(firebase.auth());
  const provider = new firebase.auth.GoogleAuthProvider();


  ui.disableAutoSignIn();

  // loginButton.onclick = () => showSignInOptions();
  // loginButton.onclick = () => auth.signInAnonymously();
  loginButton.onclick = () => auth.signInWithRedirect(provider);
  logoutButton.onclick = () => auth.signOut();

  logoutButton.hidden = true;
  greeting.hidden = true;

  auth.onAuthStateChanged(user => {
    
    if (user) {

      currentUID = user.uid;
      loginButton.hidden = true;
      greeting.hidden = false;
      greeting.innerHTML = "Hi, " + user.displayName + "!<br/>Welcome to the Library!";
      logoutButton.hidden = false;
      
      Library.loadUserLibrary();

    } else {

      currentUID = -1;
      loginButton.hidden = false;
      greeting.hidden = true;
      logoutButton.hidden = true;
      
      Library.clear();
    }
  });

  function userSignedIn () { return currentUID !== -1};
  function currentUserID () { return currentUID; };

  function showSignInOptions () {

    ui.start('#firebaseui-auth-container', UIConfig());  
  }

  function UIConfig () {
    
    const uiConfig = {
      
      callbacks: {
        // Called when the user has been successfully signed in.
        signInSuccessWithAuthResult: function(authResult, redirectUrl) {
          document.querySelector('#firebaseui-auth-container').style.display = 'none';

          return false;
        }
      },
      signInOptions: [
        // Leave the lines as is for the providers you want to offer your users.
        firebase.auth.GoogleAuthProvider.PROVIDER_ID
      ],
      signInSuccessURL: "/library",
    };
    
    return uiConfig;
  }

  return {
    userSignedIn,
    currentUserID
  }

}());