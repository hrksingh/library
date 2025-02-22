const addNew = document.querySelector(".add");
const dialog = document.querySelector("dialog");
const container = document.querySelector(".container");
const submit = document.querySelector("#submit");

addNew.addEventListener("click", () => {
  dialog.showModal();
});

dialog.addEventListener("click", (e) => {
  const dialogDimensions = dialog.getBoundingClientRect();
  if (
    e.clientX < dialogDimensions.left ||
    e.clientX > dialogDimensions.right ||
    e.clientY < dialogDimensions.top ||
    e.clientY > dialogDimensions.bottom
  ) {
    dialog.close();
  }
});

/*  Library logic */
const library = [];

function Book(title, author, pages, isRead) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = isRead;

  this.toString = function () {
    return `Title: ${this.title}, Author: ${this.author}, Pages: ${this.pages}, Read: ${this.isRead}`;
  };
}

function addBookToLibrary(title, author, pages, isRead) {
  const book = new Book(title, author, pages, isRead);
  console.log(`Book added: ${book.toString()}`);
  library.push(book);
}

function displayBooks(book) {
  const title = book.title;
  const author = book.author;
  const pages = book.pages;
  let read = book.read;

  const card = document.createElement("div");
  card.className = "card";
  card.innerHTML = `<h4 class="title"> ${title}.</h4>
    <p class="author"> written by <span>${author},</span></p>
    <p class="pages"> ${pages} pages long. </P>`;

  const toggle = document.createElement("p");
  const check = document.createElement("button");
  const remove = document.createElement("button");
  const checkwrapper = document.createElement("div");
  checkwrapper.className = "checkwrapper";

  check.innerHTML = '<img src="./icons/eye-svgrepo-com.svg">';

  const updateToggle = () => {
    if (read) {
      toggle.textContent = "Read ✔";
      toggle.setAttribute("style", "color: #00FF40;");
    } else {
      toggle.textContent = "Not read :/";
      toggle.setAttribute("style", "color: #FF0000;");
    }
  };

  updateToggle();

  check.addEventListener("click", () => {
    read = !read;
    updateToggle();
  });

  remove.innerHTML = '<img src="./icons/rubbish-bin-svgrepo-com.svg">';
  remove.setAttribute("type", "submit");
  remove.addEventListener("click", () => {
    container.removeChild(card);
  });

  card.appendChild(toggle);
  checkwrapper.appendChild(check);
  checkwrapper.appendChild(remove);
  card.appendChild(checkwrapper);

  container.appendChild(card);
  addBookToLibrary(book);
}

submit.addEventListener("click", (e) => {
  e.preventDefault();
  const Title = document.querySelector("#title").value;
  const Author = document.querySelector("#author").value;
  const Pages = document.querySelector("#pages").value;
  const Read = document.querySelector("#read").checked;

  const newBook = new Book(Title, Author, Pages, Read);
  displayBooks(newBook);

  document.querySelector("#title").value = "";
  document.querySelector("#author").value = "";
  document.querySelector("#pages").value = "";
  document.querySelector("#read").checked = false;

  dialog.close();
});

const book1 = new Book("Harry Potter", "J. K. Rowlings", 350, true);
const book2 = new Book("To Kill a Mockingbird", "Harper Lee", 180, false);
const book3 = new Book("The Great Gatsby", "F. Scott Fitzgerald", 120, true);
const book4 = new Book("Things Fall Apart", "Chinua Achebe", 389, false);
displayBooks(book1);
displayBooks(book2);
displayBooks(book3);
displayBooks(book4);

console.log(library);
