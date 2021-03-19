/**
 * manages the Library.
 */

"use strict";

let newBookForm = null;
let newBookButton = null;
let formTitleField = null;
let formAuthorField = null;
let formPagesField = null;
let formReadCheckbox = null;
let invalidTitleText = null;
let invalidAuthorText = null;
let invalidPagesText = null;

function main () {
  window.addEventListener('load', () => init());
}

function init () {
  
  newBookForm = document.getElementById("new-book-form");
  newBookButton = document.querySelector("button#new-book");
  newBookButton.addEventListener("click", () => showNewBookForm());

  formTitleField = newBookForm.elements["title"];
  formAuthorField = newBookForm.elements["author"];
  formPagesField = newBookForm.elements["pages"];
  formReadCheckbox = newBookForm.elements["read"];

  invalidTitleText = document.getElementById("invalid-title-text");
  invalidAuthorText = document.getElementById("invalid-author-text");
  invalidPagesText = document.getElementById("invalid-pages-text");
}

function createBook () {

  if (!confirmValidity()) return;
  
  const title = formTitleField.value;
  const author = formAuthorField.value;
  const pages = parseInt(formPagesField.value);
  const read = formReadCheckbox.checked;

  const newBook = new Book(
    title,
    author,
    pages,
    read
  );

  Library.addBook(newBook);
  hideNewBookForm();
  newBookForm.reset();
}

function confirmValidity () {

  invalidTitleText.style.opacity = formTitleField.validity.valid ? 0 : 1;
  invalidAuthorText.style.opacity = formAuthorField.validity.valid ? 0 : 1;
  invalidPagesText.style.opacity = formPagesField.validity.valid ? 0 : 1;

  return formTitleField.validity.valid && formAuthorField.validity.valid && formPagesField.validity.valid;
}

function showNewBookForm () {

  newBookButton.style.transform = "rotate(45deg)";
  newBookButton.removeEventListener("click", showNewBookForm);
  newBookButton.addEventListener("click", hideNewBookForm);
  // document.classList.add("inactive");

  newBookForm.style.filter = "opacity(1)";
  newBookForm.style.pointerEvents = "auto";
  newBookForm.style.userSelect = "auto";

  document.addEventListener("click", (event) => {

    if (!newBookForm.contains(event.target) && !newBookButton.contains(event.target)) {
      hideNewBookForm();
    }
  });
}

function hideNewBookForm () {

  document.removeEventListener("click", (event) => {

    if (!newBookForm.contains(event.target) && !newBookButton.contains(event.target)) {
      hideNewBookForm();
    }
  ;})

  newBookButton.style.transform = "rotate(0deg)";
  newBookButton.removeEventListener("click", hideNewBookForm);
  newBookButton.addEventListener("click", showNewBookForm);
  // document.classList.remove("inactive");

  newBookForm.style.filter = "opacity(0)";
  newBookForm.style.pointerEvents = "none";
  newBookForm.style.userSelect = "none";
}

main();