import { BookController } from '../controllers/book.controller';

bookController = new BookController();

const routes = [
  {
    method: 'POST',
    path: '/books',
    handler: bookController.addBook,
  },
  {
    method: 'GET',
    path: '/books',
    handler: bookController.getBooks,
  },
  {
    method: 'GET',
    path: '/books/{bookId}',
    handler: bookController.getBookById,
  },
  {
    method: 'PUT',
    path: '/books/{bookId}',
    handler: bookController.editBook,
  },
  {
    method: 'DELETE',
    path: '/books/{bookId}',
    handler: bookController.deleteBook,
  },
];

module.exports = routes;
