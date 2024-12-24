//toggle the popup 
const addPopup = document.querySelector('.add-pop-up');
const closePopup = document.querySelector('.close');
const addBook = document.querySelector('.add-book');
const main = document.querySelector('main');
function popUp() {
    addPopup.classList.toggle  ('hidden');
    main.classList.toggle ('main');
}
closePopup.addEventListener ('click', (event) => { popUp(); });

addBook.addEventListener ('click', (event) => { popUp(); });

//library
let library = [
    { title: "The Hitchhiker's Guide to the Galaxy", author: "Douglas Adams", nbrOfPages: 224, read: true },
    { title: "To Kill a Mockingbird", author: "Harper Lee", nbrOfPages: 281, read: false },
    { title: "1984", author: "George Orwell", nbrOfPages: 328, read: false }
];

function Book(title, author, nbrOfPages, read) {
    this.title = title;
    this.author = author;
    this.nbrOfPages = nbrOfPages;
    this.read = read;
}

function storeBooks(bookInfo) {
    library.push(bookInfo);
    displayBooks();
    console.log(library);
}

// create delete button
function createDeleteBtn(index) {
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete';
    deleteBtn.textContent = 'Delete';
    deleteBtn.setAttribute('data-index', index);
    deleteBtn.addEventListener('click', () =>{
        deleteBook(index);
    });

    return deleteBtn;
}

//create read button
function createReadBtn(Book, index) {
    const readBtn = document.createElement('button');
    readBtn.textContent = Book.read? "Read" : "Not read";
    Book.read? readBtn.classList.add('read', 'status') : readBtn.classList.add('unread', 'status');

    readBtn.setAttribute("data-index", index);
    readBtn.addEventListener('click', () =>{
        toggleReadBtn(index);
    });
    console.log('readbtn');

    return readBtn;
}

//toggle read button
function toggleReadBtn(index){
    const book = library[index];
    book.read = !book.read;

    displayBooks();
}

//delete book
function deleteBook(index) {
    library.splice(index, 1);
    displayBooks();
}

//display function
function displayBooks (){
    const books = document.querySelector('.books');
    books.innerHTML = '';

    library.forEach((book, index) => {
        const card = document.createElement('div');
        card.className = 'book';
        card.innerHTML = `<div class="title-author">
                        <p class="title">${book.title}</p>
                        <p class="author">${book.author}</p>
                        </div>
                        `;
        const cardBtnsPages = document.createElement('div');
        cardBtnsPages.className = 'nbr-of-pages-btns';
        cardBtnsPages.innerHTML = `<p class="nbr-of-pages">${book.nbrOfPages} pages</p`;

        const cardBtns = document.createElement('div');
        cardBtns.className = 'book-btns';
        
        cardBtns.appendChild(createReadBtn(book, index));
        cardBtns.appendChild(createDeleteBtn(index));

        cardBtnsPages.appendChild(cardBtns);
        card.appendChild(cardBtnsPages);

        books.appendChild(card);
    });
    console.log(library);
}

//form prevent default action
let form = document.querySelector("form");
form.addEventListener ('submit', (event) => {
    event.preventDefault();

    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const nbrOfPage = document.querySelector('#nbr-of-page').value;
    const read = document.querySelector('#read').checked

    const book = new Book (title, author, nbrOfPage, read);

    storeBooks(book);
});

document.addEventListener('DOMContentLoaded', () =>{displayBooks();});
