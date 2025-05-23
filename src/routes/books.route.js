import BookController from '../controllers/book.controller.js';

const bookController = new BookController();

const routes = [
  {
    method: 'POST',
    path: '/books',
    handler: bookController.addBook.bind(bookController),
  },
  {
    method: 'GET',
    path: '/books',
    handler: bookController.getBooks.bind(bookController),
  },
  {
    method: 'GET',
    path: '/books/{bookId}',
    handler: bookController.getBookById.bind(bookController),
  },
  {
    method: 'PUT',
    path: '/books/{bookId}',
    handler: bookController.editBook.bind(bookController),
  },
  {
    method: 'DELETE',
    path: '/books/{bookId}',
    handler: bookController.deleteBook.bind(bookController),
  },
];

export default routes;
