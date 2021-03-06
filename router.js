// ----------------------------------------------0 IMPORTAÇÕES
const express = require('express');
const router = express.Router();
const QUERY = require('./controllers/querys/querys.js');
const LOGIN = require('./controllers/login.js');
const USER = require('./controllers/user.js');
const ENTRADA = require('./controllers/entrada.js');
const SAIDA = require('./controllers/saida.js');
const CAM = require('./controllers/caminhao.js');
const FUNCIONARIO = require('./controllers/funcionario.js');
const CLIENTE = require('./controllers/cliente.js');

// -----------------------------------------------1 PÁGINA INICIAL
router.use('/', require('./routerPage'));
//----------------------------------------------------2 LOGIN 
router.post('/auth', LOGIN.auth);
//----------------------------------------------------3 LOGOUT-----------------------
router.get('/logout', LOGIN.logout);
//----------------------------------------------------4 USUÁRIOS-----------------------
//------CRUD
router.post('/setUsr', USER.set);
router.post('/updateUsr', USER.update);
router.get('/delUsr/:id', USER.delete);
//------JSON
router.get('/getUsr', USER.getAll);
router.get('/getUsr/:id', USER.get);
//----------------------------------------------------5 ENTRADA-----------------------
//------CRUD
router.post('/setEnt', ENTRADA.set);
router.post('/updateEnt', ENTRADA.update);
router.get('/delEnt/:id', ENTRADA.delete);
//------JSON
router.get('/getEnt', ENTRADA.getAll);
router.get('/getEnt/:id', ENTRADA.getE);
router.get('/getEMes/:anoMes', ENTRADA.getEMes);
router.get('/totalEnt', ENTRADA.getTotal);
//----------------------------------------------------6 SAÍDA-----------------------
//------CRUD
router.post('/setSaida', SAIDA.set);
router.post('/updateSaida', SAIDA.update);
router.get('/delSaida/:id', SAIDA.delete);
//------JSON
router.get('/getSaida', SAIDA.getAll);
router.get('/getSaida/:id', SAIDA.get);
router.get('/totalSaida', SAIDA.getTotal);
//----------------------------------------------------7 CAMINHÕES-----------------------
//------CRUD
router.post('/setCam', CAM.set);
router.post('/updateCam', CAM.update);
router.get('/delCam/:id', CAM.delete);
//------JSON
router.get('/getCam', CAM.getAll);
router.get('/getCam/:id', CAM.get);
//-------------------------------------------------------8 FUNCIONARIOS-----------------------
//------CRUD
router.post('/setFunc', FUNCIONARIO.set);
router.post('/updateFunc', FUNCIONARIO.update);
router.get('/delFunc/:id', FUNCIONARIO.delete);
//------JSON
router.get('/getFunc', FUNCIONARIO.getAll);
router.get('/getFunc/:id', FUNCIONARIO.get);
//-------------------------------------------------------9 CLIENTES-----------------------
//------CRUD
router.post('/setCli', CLIENTE.set);
router.post('/updateCli', CLIENTE.update);
router.get('/delCli/:id', CLIENTE.delete);
//------JSON
router.get('/getCli', CLIENTE.getAll);
router.get('/getCli/:id', CLIENTE.get);
//-----------------------------------------------------10 QUERYS----------------
router.get('/totalGeral', QUERY.getAllTotalGeral);
router.get('/totalGeral/:anoMes', QUERY.getTotalGeral);
router.get('/categoriaSaida', QUERY.getAllCategoriaSaida);
router.get('/categoriaSaida/:anoMes', QUERY.getCategoriaSaida);
router.get('/getViagens/:anoMes', QUERY.getViagens);
router.get('/getMotVi/:anoMes', QUERY.getMotVi);
router.get('/getCamVi/:anoMes', QUERY.getCamVi);
router.get('/getCliVi/:anoMes', QUERY.getCliVi);
router.get('/getSF', QUERY.getFSaida);
router.get('/getEF', QUERY.getFEnt);
module.exports = router;