const library = [];
let bookList = null;
let newBookForm = null;
let newBookButton = null;
let formTitleField = null;
let formAuthorField = null;
let formPagesField = null;
let formReadCheckbox = null;

function main () {
  window.addEventListener('load', () => init());
}

function init () {
  
  bookList = document.getElementById("book-list");
  newBookForm = document.getElementById("new-book-form");
  newBookButton = document.querySelector("button#new-book");
  newBookButton.addEventListener("click", () => showNewBookForm());

  formTitleField = newBookForm.elements["title"];
  formAuthorField = newBookForm.elements["author"];
  formPagesField = newBookForm.elements["pages"];
  formReadCheckbox = newBookForm.elements["read"];

  for (let i = 0; i < 3; i++) {
    const book = new Book(bookHash("Book " + i, "Author " + 1, i), "Book " + i, "Author " + i, i, false);
    addBookToLibrary(book);
  }
}

function Book (id, title, author, pages, read) {
  
  this.id = id;
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.info = "" + this.title + ", " + this.author + "," + this.pages + " pages," + (read ? "read" : "not read");
}

function createBook () {

  
  const title = formTitleField.value;
  const author = formAuthorField.value;
  const pages = parseInt(formPagesField.value);
  const read = formReadCheckbox.checked;

  const newBook = new Book(bookHash(
      title,
      author,
      pages
    ),
    title,
    author,
    pages,
    read
  );

  addBookToLibrary(newBook);

  hideNewBookForm();
  newBookForm.reset();
}

function showNewBookForm () {

  newBookButton.style.transform = "rotate(45deg)";
  newBookButton.removeEventListener("click", showNewBookForm);
  newBookButton.addEventListener("click", hideNewBookForm);
  bookList.classList.add("inactive");

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
  bookList.classList.remove("inactive");

  newBookForm.style.filter = "opacity(0)";
  // newBookForm.style.transform = "scale(0.5)";
  newBookForm.style.pointerEvents = "none";
  newBookForm.style.userSelect = "none";
}

function addBookToLibrary (book) {
  
  library.push(book);
  
  const card = createBookCard(book);

  bookList.appendChild(card);
}

function removeBook (id) {

  const cardToDelete = document.getElementById("book-" + id);
  cardToDelete.parentNode.removeChild(cardToDelete);

  let bookIndex = 0;

  for (const book of library) {
    if (book.id === id) {
      bookIndex = library.findIndex(book);
      break;
    }
  }

  library.splice(bookIndex, 1);
}

function createBookCard (book) {

  const card = document.createElement("div");
  card.classList.add("book-card");
  card.id = "book-" + book.id;

  const infoDiv = document.createElement("div");
  infoDiv.classList.add("info");
  const title = document.createElement("p");
  title.classList.add("title");
  const author = document.createElement("p");
  author.classList.add("author")
  const pages = document.createElement("p");
  pages.classList.add("pages");
  const actionsDiv = document.createElement("div");
  actionsDiv.classList.add("actions");
  const readLabel = document.createElement("label");
  readLabel.classList.add("read-label");
  const readToggle = document.createElement("input");
  readToggle.classList.add("read-toggle")
  readToggle.setAttribute("type", "checkbox");
  const removeButton = createRemoveButton();
  removeButton.classList.add("remove-button");
  removeButton.dataset.id = book.id;
  removeButton.addEventListener("click", (event) => {
    removeBook(event.target.dataset.id);
  })

  title.textContent = book.title;
  author.textContent = "by " + book.author;
  pages.textContent = book.pages + " pages";
  readLabel.textContent = "Mark as read";
  readToggle.defaultChecked = book.read ? true : false;
  readToggle.checked = readToggle.defaultChecked;

  infoDiv.appendChild(title)
  infoDiv.appendChild(author)
  infoDiv.appendChild(pages)

  // actionsDiv.appendChild(readLabel);
  actionsDiv.appendChild(readToggle);
  actionsDiv.appendChild(removeButton);

  card.appendChild(infoDiv);
  card.appendChild(actionsDiv);
  
  return card;
}

function createRemoveButton () {
  const b = document.createElement("button");
  b.classList.add("remove-button");
  b.textContent = "Remove";
  return b;
}

function bookHash (t, a, p) {

  let h = 0;

  for (let i = 0; i < t.length; i++) {
    h += t.charCodeAt(i);
  }

  for (let i = 0; i < a.length; i++) {
    h += a.charCodeAt(i);
  }

  h += p;

  return h;
}

main();