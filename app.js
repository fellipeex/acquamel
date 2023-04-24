//                                               1- importações 
import express from 'express';
import bodyParser from 'body-parser';
import session from 'express-session';
import * as url from 'url';
import routerPage from './src/routes/routerPage.mjs';
import routerCtrl from './src/routes/routerCtrl.mjs';
import path from 'path';
import { getIP } from './src/Config/js/ip.js';
import CONN from './src/Config/database/conn.js'
/* import https from 'https';
import fs from 'fs'; */

const _dirname = url.fileURLToPath(new URL('.', import.meta.url));
/* const options = {
  key: fs.readFileSync('server.key'),
  cert: fs.readFileSync('server.crt')
}; */

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

//                                      2- Setando rota para importações

app.use('/fa', express.static(_dirname + '/node_modules/@fontawesome/fontawesome-free/css'));
app.use('/bootstrap', express.static(_dirname + '/node_modules/bootstrap/dist/css'));
app.use('/b-icon', express.static(_dirname + '/node_modules/bootstrap-icons/font'));
app.use('/promise', express.static(_dirname + '/node_modules/es6-promise/dist'));
app.use('/swal', express.static(_dirname + '/node_modules/sweetalert2/dist'));
app.use('/moment', express.static(_dirname + 'node_modules/moment/min'));
app.use('/datatable', express.static(_dirname + 'node_modules/datatables.net-dt/js'));
app.use('/chart', express.static('./node_modules/chart.js/'));
app.use('/public', express.static('public'));

//                                      3- definindo EJS como VIEW

app.set('views', path.join(_dirname, 'src','views'));
app.set('view engine', 'ejs');
//                                      4- definindo urlcoded para capturar os dados do fomurlário

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//                                      5- chamando a rota primaria a partir das rotas

app.use('/api', routerCtrl)
app.use('/', routerPage);
//                                         6- Verifica o encerramento da máquina e encerra o banco
process.on('SIGINT', () => {
  CONN.disconnect();
  process.exit();
});


//                                         7- host que o sistema irá rodar
const port = 5050
const host = getIP();
app.listen(port, ()=>{
    console.log(`Server rodando em http://${host}:${port}`);
});


/* const httpsServer = https.createServer(options, app);
httpsServer.listen(port, () => {
  console.log(`Server rodando em https://${host}:${port}`);
}); */