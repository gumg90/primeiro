const { Router } = require('express');
const devController = require('./controllers/devController');
const searchController = require('./controllers/searchController');

const routes = Router();


routes.get('/devs', devController.index);
routes.post('/devs', devController.store);
routes.delete('/devs/:id', devController.destroy);
routes.put('/devs/:id', devController.update);
routes.get('/search', searchController.index);

module.exports = routes; //exportar rotas para acesso na aplicação