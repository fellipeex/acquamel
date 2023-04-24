// ----------------------------------------------0 IMPORTAÇÕES
import express from 'express';
import upload from '../../public/js/upload.js';
import * as QUERY from '../Controllers/querysCtrl.js'; 
import * as AUTH from '../Controllers/authCtrl.js';
import * as  USER from '../Controllers/userCtrl.js';
 import * as ENTRADA from '../Controllers/entradaCtrl.js';
import * as SAIDA from '../Controllers/saidaCtrl.js';
import * as CAM from '../Controllers/caminhaoCtrl.js';
import * as FUNCIONARIO from '../Controllers/funcionarioCtrl.js';
import * as CLIENTE from '../Controllers/clienteCtrl.js'; 

const router = express.Router();
// -------------------------------------------------1 PÁGINA INICIAL
//router.use('/', require('./routerPage'));
//----------------------------------------------------2 AUTH 
router.post('/auth', AUTH.auth);
//----------------------------------------------------3 USUÁRIOS-----------------------
//------CRUD
router.post('/setUsr',upload.single('foto'), USER.set);
router.post('/updateUsr', USER.update);
router.post('/trocarFoto/:id',upload.single('foto'), USER.trocarFoto);
router.post('/WEPPA/:email', USER.tsdua);
router.get('/delUsr/:id', USER.del);

//------JSON
router.get('/getUsr', USER.getAll);
router.get('/getUsr/:id', USER.getById);
router.get('/getUBE/:email', USER.getByEmail);
//----------------------------------------------------4 ENTRADA-----------------------
//------CRUD
 router.post('/setEnt', ENTRADA.set);
router.post('/updateEnt', ENTRADA.update);
router.get('/delEnt/:id', ENTRADA.del);
//------JSON
router.get('/getEnt', ENTRADA.getAll);
router.get('/getEnt/:id', ENTRADA.getById);
router.get('/getEMes/:anoMes', ENTRADA.getByYM);
router.get('/getEAno/:anoMes', ENTRADA.getByY);
//----------------------------------------------------5 SAÍDA-----------------------
//------CRUD
router.post('/setSaida', SAIDA.set);
router.post('/updateSaida', SAIDA.update);
router.get('/delSaida/:id', SAIDA.del);
//------JSON
router.get('/getSaida', SAIDA.getAll);
router.get('/getSaida/:id', SAIDA.getById);
router.get('/getSMes/:anoMes', SAIDA.getByYM);
router.get('/getSAno/:ano', SAIDA.getByY);
//----------------------------------------------------6 CAMINHÕES-----------------------
//------CRUD
router.post('/setCam', CAM.set);
router.post('/updateCam', CAM.update);
router.get('/delCam/:id', CAM.del);
//------JSON
router.get('/getCam', CAM.getAll);
router.get('/getCam/:id', CAM.getById);
//-------------------------------------------------------7 FUNCIONARIOS-----------------------
//------CRUD
router.post('/setFunc', FUNCIONARIO.set);
router.post('/updateFunc', FUNCIONARIO.update);
router.get('/delFunc/:id', FUNCIONARIO.del);
//------JSON
router.get('/getFunc', FUNCIONARIO.getAll);
router.get('/getFunc/:id', FUNCIONARIO.getById);
//-------------------------------------------------------8 CLIENTES-----------------------
//------CRUD
router.post('/setCli', CLIENTE.set);
router.post('/updateCli', CLIENTE.update);
router.get('/delCli/:id', CLIENTE.del);
//------JSON
router.get('/getCli', CLIENTE.getAll);
router.get('/getCli/:id', CLIENTE.getById); 
//-----------------------------------------------------9 QUERYS----------------
router.get('/totalGeral', QUERY.getAllTotalGeral);
router.get('/totalGeral/:anoMes', QUERY.getTotalGeral);
router.get('/totalGeralAnual/:anoMes', QUERY.getTotalGeralAnual);
router.get('/categoriaSaida', QUERY.getAllCategoriaSaida);
router.get('/categoriaSaida/:anoMes', QUERY.getCategoriaSaida);
router.get('/getViagens/:anoMes', QUERY.getViagens);
router.get('/getMotVi/:anoMes', QUERY.getMotVi);
router.get('/getCamVi/:anoMes', QUERY.getCamVi);
router.get('/getCliVi/:anoMes', QUERY.getCliVi);
router.get('/getSF', QUERY.getSFutura);
router.get('/getEF', QUERY.getEFutura); 

export default router;