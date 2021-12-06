//1- importações 
const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config({path:'./env/.env'});
//2- Setando rota para importações
app.use('/fa', express.static(__dirname + '/node_modules/@fontawesome/fontawesome-free/css'));
app.use('/public', express.static('public'));
//3- definindo EJS como VIEW
app.set('view-engine', 'ejs');
//4- definindo urlcoded para capturar os dados do fomurlário
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


//5- chamando a rota primaria a partir das rotas
app.use('/', require('./router'));
//6- host que o sistema irá rodar
app.listen(5050, ()=>{
    console.log('Server rodando em http://localhost:5050');
});