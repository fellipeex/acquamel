//                                                 1- importações 
const express = require('express');
const session = require('express-session');
const app = express();
const dotenv = require('dotenv');
dotenv.config({path:'./env/.env'});
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

//                                      2- Setando rota para importações

app.use('/fa', express.static(__dirname + '/node_modules/@fontawesome/fontawesome-free/css'));
app.use('/swal-b4', express.static(__dirname + '/node_modules/@sweetalert2/theme-bootstrap-4'));
app.use('/swal', express.static('./node_modules/sweetalert2/'));
app.use('/chart', express.static('./node_modules/chart.js/'));
app.use('/public', express.static('public'));

//                                      3- definindo EJS como VIEW
app.set('view-engine', 'ejs');
//                                      4- definindo urlcoded para capturar os dados do fomurlário

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//                                      5- chamando a rota primaria a partir das rotas
app.use('/', require('./router'));

//                                         6- host que o sistema irá rodar
app.listen(5050, ()=>{
    console.log('Server rodando em http://localhost:5050');
});