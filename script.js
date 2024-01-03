const dialog = document.querySelector("dialog");
const showButton = document.querySelector("dialog + button");
const closeButton = document.querySelector("dialog button");

// "Show the dialog" button opens the dialog modally
showButton.addEventListener("click", () => {
  dialog.showModal();
});

// "Close" button closes the dialog
closeButton.addEventListener("click", () => {
  dialog.close();
});

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }
  
  Book.prototype.info = function() {
    return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read ? 'read' : 'not read yet'}`;
  };
  
  const myLibrary = [];

  function addBookToLibrary(book) {
    myLibrary.push(book);
  }
  
  //creates the books on the bookshelf
  function displayBooks() {
    const bookDisplay = document.getElementById('bookShelf');
    bookDisplay.innerHTML = ''; // Clear previous content
  
    myLibrary.forEach((book, index) => {
      const bookInfo = document.createElement('div');
      bookInfo.textContent = book.info();
  
      // Create buttons for removing and toggling read status
      const removeButton = document.createElement('button');
      removeButton.textContent = 'Remove';
      removeButton.addEventListener('click', () => removeBook(index));
  
      const toggleButton = document.createElement('button');
      toggleButton.textContent = 'Toggle Read Status';
      toggleButton.addEventListener('click', () => toggleRead(index));
  
      bookInfo.appendChild(removeButton);
      bookInfo.appendChild(toggleButton);
      bookDisplay.appendChild(bookInfo);
    });
  }
  
  function removeBook(index) {
    myLibrary.splice(index, 1);
    displayBooks();
  }
  
  function toggleRead(index) {
    myLibrary[index].read = !myLibrary[index].read;
    displayBooks();
  }
  
  //The code block that deals with getting info from the form and creating a book
  const addBookForm = document.getElementById('addBookForm');
  addBookForm.addEventListener('submit', function(event) {
  event.preventDefault();

  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const pages = document.getElementById('pages').value;
  const read = document.getElementById('read').checked;

  const newBook = new Book(title, author, pages, read);
  addBookToLibrary(newBook);
  displayBooks();

  // Reset the form after adding a book
  addBookForm.reset();
});
