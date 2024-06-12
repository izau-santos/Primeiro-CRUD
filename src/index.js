// Importando o express para ajudar na "Rota do back-end"
import express from 'express';

import routes from './routes.js';

const server = express(); // Instanciando um objeto para poder ter acesso a todas as funcionalidades do express

server.use(express.json()); // validando o modelo de comunicação JSON
server.use('/', routes); //Redirecionando a requisição para o arquivo routes.js

// deixar o server ouvindo
server.listen(3333, () => {
    console.log('Server is running...🏃‍♂️🏃‍♂️🏃‍♂️')
});  // Iniciando um servidor de back-end na porta 3333
