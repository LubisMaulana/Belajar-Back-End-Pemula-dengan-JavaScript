import Book from '../models/book.model.js';
import books from '../data/books.js';

class BookController {
  constructor() {
    this.books = new Book(books);
  }

  addBook = (request, h) => {
    const {
      name, year, author, summary, publisher, pageCount, readPage, reading,
    } = request.payload;

    if (!name) {
      return h.response({
        status: 'fail',
        message: 'Gagal menambahkan buku. Mohon isi nama buku',
      }).code(400);
    }

    if (readPage > pageCount) {
      return h.response({
        status: 'fail',
        message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
      }).code(400);
    }

    const id = this.books.createBook({
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      reading,
    });

    return h.response({
      status: 'success',
      message: 'Buku berhasil ditambahkan',
      data: { bookId: id },
    }).code(201);
  };

  getBooks = (request, h) => {
    const { reading, name, finished } = request.query;
    const allBooks = this.books.getBooks(reading, name, finished);
    return h.response({
      status: 'success',
      data: { books: allBooks },
    }).code(200);
  };

  getBookById = (request, h) => {
    const { bookId } = request.params;
    const book = this.books.getBookById(bookId);

    if (!book) {
      return h.response({
        status: 'fail',
        message: 'Buku tidak ditemukan',
      }).code(404);
    }

    return h.response({
      status: 'success',
      data: { book },
    }).code(200);
  };

  editBook = (request, h) => {
    const { bookId } = request.params;
    const {
      name, year, author, summary, publisher, pageCount, readPage, reading,
    } = request.payload;

    if (!name) {
      return h.response({
        status: 'fail',
        message: 'Gagal memperbarui buku. Mohon isi nama buku',
      }).code(400);
    }

    if (readPage > pageCount) {
      return h.response({
        status: 'fail',
        message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
      }).code(400);
    }

    const updated = this.books.editBook(bookId, {
      name, year, author, summary, publisher, pageCount, readPage, reading,
    });

    if (!updated) {
      return h.response({
        status: 'fail',
        message: 'Gagal memperbarui buku. Id tidak ditemukan',
      }).code(404);
    }

    return h.response({
      status: 'success',
      message: 'Buku berhasil diperbarui',
    }).code(200);
  };

  deleteBook = (request, h) => {
    const { bookId } = request.params;
    const deleted = this.books.deleteBook(bookId);

    if (!deleted) {
      return h.response({
        status: 'fail',
        message: 'Buku gagal dihapus. Id tidak ditemukan',
      }).code(404);
    }

    return h.response({
      status: 'success',
      message: 'Buku berhasil dihapus',
    }).code(200);
  };
}

export default BookController;
