import { nanoid } from 'nanoid';

class Book {
  constructor(books = []) {
    this.books = books;
  }

  static #createId() {
    return nanoid(16);
  }

  createBook(data) {
    const book = {
      id: Book.#createId(),
      ...data,
      finished: data.pageCount === data.readPage,
      insertedAt: Date.now(),
      updatedAt: Date.now(),
    };
    this.books.push(book);

    return book.id;
  }

  getBooks(readingBook = '', nameBook = '', finishedBook = '') {
    let filterBooks = this.books;
    if (readingBook !== '') {
      filterBooks = filterBooks.filter((item) => item.reading === (readingBook === '1'));
    }

    if (finishedBook !== '') {
      filterBooks = filterBooks.filter((item) => item.finished === (finishedBook === '1'));
    }

    if (nameBook !== '') {
      filterBooks = filterBooks.filter(
        (item) => item.name.toUpperCase().includes(
          nameBook.toUpperCase(),
        ),
      );
    }

    return filterBooks.map(({ id, name, publisher }) => ({
      id, name, publisher,
    }));
  }

  getBookById(id) {
    return this.books.find((item) => item.id === id);
  }

  editBook(id, data) {
    const index = this.books.findIndex((item) => item.id === id);
    if (index === -1) {
      return false;
    }

    this.books[index] = {
      ...this.books[index],
      ...data,
      finished: data.pageCount === data.readPage,
      updatedAt: Date.now(),
    };

    return true;
  }

  deleteBook(id) {
    const index = this.books.findIndex((item) => item.id === id);
    if (index === -1) {
      return false;
    }

    this.books.splice(index, 1);
    return true;
  }
}

export default Book;
