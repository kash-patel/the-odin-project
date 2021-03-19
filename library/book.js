/**
 * Contains the Book object and related methods.
 */

"use strict";


const Book = (function () {

  const Constructor = function (title, author, pages, read) {

    this.id = __generateID ( title, author, pages );
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;

  }

  Constructor.prototype.toggleRead = function () {
    this.read = !this.read;
    if (Auth.userSignedIn ) { Database.toggleRead(this.id); }
  }

  Constructor.prototype.removeBook = function () {
    Library.removeBook(this.id);
  }

  Constructor.prototype.card = function () {

    const card = document.createElement("div");
    card.classList.add("book-card");
    card.id = "book-" + this.id;

    const infoDiv = document.createElement("div");
    infoDiv.classList.add("info");

    const titleP = document.createElement("p");
    titleP.classList.add("title");
    titleP.textContent = this.title;
    
    const authorP = document.createElement("p");
    authorP.classList.add("author");
    authorP.textContent = "by " + this.author;
    
    const pagesP = document.createElement("p");
    pagesP.classList.add("pages");
    pagesP.textContent = this.pages + " pages";

    infoDiv.appendChild(titleP);
    infoDiv.appendChild(authorP);
    infoDiv.appendChild(pagesP);

    const actionsDiv = document.createElement("div");
    actionsDiv.classList.add("actions");

    const readToggle = document.createElement("input");
    readToggle.classList.add("read-toggle")
    readToggle.setAttribute("type", "checkbox");
    readToggle.dataset.id = this.id;
    readToggle.checked = this.read;
    readToggle.addEventListener("change", () => {
      this.toggleRead();
    });
    
    const removeButton = document.createElement("button");
    removeButton.classList.add("remove-button");
    removeButton.textContent = "Remove";
    removeButton.dataset.id = this.id;
    removeButton.addEventListener("click", (event) => {
      this.removeBook();
    });

    actionsDiv.appendChild(readToggle);
    actionsDiv.appendChild(removeButton);

    card.appendChild(infoDiv);
    card.appendChild(actionsDiv);

    console.log(card);

    return card;
  }

  return Constructor;

}());


function __generateID ( title, author, pages ) {

  let id = 0;

  for (let i = 0; i < title.length; i++) { id += title.charCodeAt(i); }
  for (let i = 0; i < author.length; i++) { id += author.charCodeAt(i); }

  id += pages;

  return id;

}