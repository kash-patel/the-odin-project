/**
 * Contains methids related to managing the library.
 */

"use strict";


const Library = (function () {

  const books = [];
  const booksDiv = document.getElementById("book-list");

  return {
    addBook,
    removeBook,
    loadUserLibrary,
    clear
  };

  
  function addBook (book) {
    
    books.push(book);
    booksDiv.appendChild(book.card());

    if (Auth.userSignedIn) { Database.addBook(book); }
  }

  
  function removeBook (id) {

    books.slice(bookIndex(id));

    if (Auth.userSignedIn) { Database.removeBook(id); }

    // Optimistic update
    booksDiv.removeChild(document.getElementById("book-" + id));
  }

  
  function loadUserLibrary () {

    books.length = 0;

    Database.getUserLibrary(Auth.currentUserID()).then((snapshot) => {
      
      snapshot.forEach(book => {

        const bookToAdd = new Book(
          book.val().title,
          book.val().author,
          book.val().pages,
          book.val().read
        );
  
        // addBook(bookToAdd);
        books.push(bookToAdd);
        booksDiv.appendChild(bookToAdd.card());
      });
    });
  }

  
  function clear () {
    books.length = 0;
    booksDiv.textContent = null;
  }

  function bookIndex (id) {

    for (const book in books) {
      if (book.id === id) { return books.findIndex(book); }
    }

    return -1;
  }

}());