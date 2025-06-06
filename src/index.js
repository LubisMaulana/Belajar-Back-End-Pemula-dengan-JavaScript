import Hapi from '@hapi/hapi';
import routes from './routes/books.route.js';

const init = async () => {
  const server = Hapi.server({
    port: 9000,
    host: 'localhost',
    routes: {
      cors: {
        origin: ['http://notesapp-v1.dicodingacademy.com/'],
      },
    },
  });

  server.route(routes);

  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
};

init();
