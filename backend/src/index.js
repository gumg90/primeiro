const express = require('express'); // imprtando o express
const mongoose = require('mongoose');
const routes = require('./routes'); //imprtar rotas criadas no arquivo routes
const cors = require('cors');
const app = express(); //criando aplicação

mongoose.connect('mongodb+srv://admin:gust@1990@cluster0-rxnjm.mongodb.net/estudos?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.use(cors());
app.use(express.json());
app.use(routes);


app.listen(3333); // listando o acesso da aplicação