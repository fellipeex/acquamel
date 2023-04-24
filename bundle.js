"use strict";

var _express = _interopRequireDefault(require("express"));
var _bodyParser = _interopRequireDefault(require("body-parser"));
var _expressSession = _interopRequireDefault(require("express-session"));
var url = _interopRequireWildcard(require("url"));
var _routerPage = _interopRequireDefault(require("./src/routes/routerPage.mjs"));
var _routerCtrl = _interopRequireDefault(require("./src/routes/routerCtrl.mjs"));
var _path = _interopRequireDefault(require("path"));
var _ip = require("./src/Config/js/ip.js");
var _conn = _interopRequireDefault(require("./src/Config/database/conn.js"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
//                                               1- importações 

/* import https from 'https';
import fs from 'fs'; */

const _dirname = url.fileURLToPath(new URL('.', import.meta.url));
/* const options = {
  key: fs.readFileSync('server.key'),
  cert: fs.readFileSync('server.crt')
}; */

const app = (0, _express.default)();
app.use(_bodyParser.default.json());
app.use(_bodyParser.default.urlencoded({
  extended: true
}));
app.use((0, _expressSession.default)({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: false
  }
}));

//                                      2- Setando rota para importações

app.use('/fa', _express.default.static(_dirname + '/node_modules/@fontawesome/fontawesome-free/css'));
app.use('/bootstrap', _express.default.static(_dirname + '/node_modules/bootstrap/dist/css'));
app.use('/b-icon', _express.default.static(_dirname + '/node_modules/bootstrap-icons/font'));
app.use('/promise', _express.default.static(_dirname + '/node_modules/es6-promise/dist'));
app.use('/swal', _express.default.static(_dirname + '/node_modules/sweetalert2/dist'));
app.use('/moment', _express.default.static(_dirname + 'node_modules/moment/min'));
app.use('/datatable', _express.default.static(_dirname + 'node_modules/datatables.net-dt/js'));
app.use('/chart', _express.default.static('./node_modules/chart.js/'));
app.use('/public', _express.default.static('public'));

//                                      3- definindo EJS como VIEW

app.set('views', _path.default.join(_dirname, 'src', 'views'));
app.set('view engine', 'ejs');
//                                      4- definindo urlcoded para capturar os dados do fomurlário

app.use(_express.default.urlencoded({
  extended: false
}));
app.use(_express.default.json());

//                                      5- chamando a rota primaria a partir das rotas

app.use('/api', _routerCtrl.default);
app.use('/', _routerPage.default);
//                                         6- Verifica o encerramento da máquina e encerra o banco
process.on('SIGINT', () => {
  _conn.default.disconnect();
  process.exit();
});

//                                         7- host que o sistema irá rodar
const port = 5050;
const host = (0, _ip.getIP)();
app.listen(port, () => {
  console.log(`Server rodando em http://${host}:${port}`);
});

/* const httpsServer = https.createServer(options, app);
httpsServer.listen(port, () => {
  console.log(`Server rodando em https://${host}:${port}`);
}); */
