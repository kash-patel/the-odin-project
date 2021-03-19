/**
 * Contains methods related to managing the database.
 */

"use strict";


// const database = firebase.database();

const Database = (function () {

  const db = firebase.database();

  return {
    addBook,
    removeBook,
    toggleRead,
    getUserLibrary
  };

  
  function addBook (book) {

    const bookToAdd = {
      title: book.title,
      author: book.author,
      pages: book.pages,
      read: book.read,
    };
  
    db.ref(Auth.currentUserID() + "/" + book.id).set(bookToAdd);
  }


  function removeBook (bookID) { db.ref(Auth.currentUserID() + "/" + bookID).remove().then(function() { console.log("Removed book " + bookID); }); }


  function toggleRead (id) {
    db.ref(Auth.currentUserID() + "/" + id).get().then(book => {
      const read = book.val().read;
      db.ref(Auth.currentUserID() + "/" + id).update({ read: !read });
    });
  }

  
  function getUserLibrary (uid) { return db.ref().child(uid).get(); }

}());