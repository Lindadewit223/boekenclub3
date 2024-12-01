const bookForm = document.getElementById('bookForm');
const bookList = document.getElementById('bookList');
const filterBooksButton = document.getElementById('filterBooks');
const recommendationList = document.getElementById('recommendationList');
const searchNameInput = document.getElementById('searchName');

// Array om boeken op te slaan
let books = [];

// Voeg een boek toe
bookForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const book = {
        reviewerName: document.getElementById('reviewerName').value.trim(),
        bookName: document.getElementById('bookName').value.trim(),
        opinion: document.getElementById('opinion').value.trim(),
        rating: parseInt(document.getElementById('rating').value),
        recommendedTo: document.getElementById('recommendedTo').value.split(',').map(name => name.trim())
    };

    books.push(book);
    displayBooks();
    bookForm.reset();
});

// Toon boekenlijst
function displayBooks() {
    bookList.innerHTML = '<h2>Boekenlijst</h2>';
    books.forEach((book, index) => {
        const bookItem = document.createElement('div');
        bookItem.classList.add('book-item');
        bookItem.innerHTML = `
            <h3>${book.bookName}</h3>
            <p><strong>Beoordeling:</strong> ${'⭐'.repeat(book.rating)}</p>
            <p><strong>Opmerking:</strong> ${book.opinion}</p>
            <p><strong>Aanbevolen voor:</strong> ${book.recommendedTo.join(', ')}</p>
            <p><strong>Beoordeeld door:</strong> ${book.reviewerName}</p>
            <button class="edit" onclick="editBook(${index})">Bewerken</button>
            <button class="delete" onclick="deleteBook(${index})">Verwijderen</button>
        `;
        bookList.appendChild(bookItem);
    });
}

// Aanbevelingen filteren
filterBooksButton.addEventListener('click', () => {
    const name = searchNameInput.value.trim().toLowerCase();
    recommendationList.innerHTML = '';

    books.forEach(book => {
        if (book.recommendedTo.some(rec => rec.toLowerCase() === name)) {
            const item = document.createElement('div');
            item.classList.add('book-item');
            item.innerHTML = `
                <h3>${book.bookName}</h3>
                <p><strong>Beoordeling:</strong> ${'⭐'.repeat(book.rating)}</p>
                <p><strong>Opmerking:</strong> ${book.opinion}</p>
                <p><strong>Aangeraden door:</strong> ${book.reviewerName}</p>
            `;
            recommendationList.appendChild(item);
        }
    });
});

// Verwijder een boek
function deleteBook(index) {
    books.splice(index, 1);
    displayBooks();
}

// Bewerk een boek
function editBook(index) {
    const book = books[index];
    document.getElementById('reviewerName').value = book.reviewerName;
    document.getElementById('bookName').value = book.bookName;
    document.getElementById('opinion').value = book.opinion;
    document.getElementById('rating').value = book.rating;
    document.getElementById('recommendedTo').value = book.recommendedTo.join(', ');
    deleteBook(index);
}
