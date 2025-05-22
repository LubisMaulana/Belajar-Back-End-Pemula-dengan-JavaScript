const { nanoid } = require('nanoid');

class Book {
    constructor(books = []) {
        this.books = books;
    }

    #createId() {
        return nanoid(16);
    }

    addBook(data) {
        const book = {
            id: this.#createId(),
            ...data,
            insertedAt: Date.now(),
            updatedAt: Date.now(),
        };
        this.books.push(book);

        return book.id;
    }

    getBooks() {
        return this.books.map(({ id, name, publisher }) => ({
            id, name, publisher
        }));
    }

    getBookById(id) {
        return this.books.find(book => book.id == id);
    }

    editBook(id, data) {
        const book = this.books.find(book => book.id == id);
        if (!book) {
            return false;
        }

        book = {
            ...book,
            ...data,
            updatedAt: Date.now(),
        };

        return true;
    }

    deleteBook(id) {
        const index = this.books.findIndex((book) => book.id == id);
        if (index == -1) {
            return false;
        }

        this.books.splice(index, 1);
        return true;
    }
}

export { Book };