// ----------------------------------------------0 IMPORTAÇÕES
const express = require('express');
const router = express.Router();
const USER = require('./views/controllers/user.js');
const ENTRADA = require('./views/controllers/entrada.js');
const SAIDA = require('./views/controllers/saida.js');
const CAM = require('./views/controllers/caminhao.js');
const FUNC = require('./views/controllers/funcionario.js');
const CLIENTE = require('./views/controllers/cliente.js');

// -----------------------------------------------1 PÁGINA INICIAL
router.get('/', (req, res) => {
  if(req.session.loggedin){
    res.render('pages/index.ejs',{
      anoMes: req.session.dataLogin,
      anoMes: req.session.anoMes,
      nomeUsr: req.session.name,
      classeUsr: req.session.classe
    });
  }else{
    res.redirect('/login');
  }
});
//----------------------------------------------------2 LOGIN 
router.get('/login', (req, res) => {
    res.render('pages/login.ejs',);
});
//----------------------------------------------------4 USUÁRIOS---------------
//-------------------PÁGINAS 
router.get('/usuarios', USER.page);
router.get('/novoUsuario', USER.pageCriar);
router.get('/infosUsuario/:id',USER.pageInfos);
router.get('/editarUsuario/:id',  USER.pageEditar);
//----------------------------------------------------5 ENTRADA-----------------

//---------PÁGINAS  
router.get('/entradas', ENTRADA.page);
router.get('/novaEntrada', ENTRADA.pageCriar);
router.get('/infosEntrada/:id',ENTRADA.pageInfos);
router.get('/editarEntrada/:id',  ENTRADA.pageEditar);

//----------------------------------------------------6 SAÍDA-----------------------

//---------PÁGINAS  
router.get('/saidas', SAIDA.page);
router.get('/novaSaida', SAIDA.pageCriar);
router.get('/infosSaida/:id',SAIDA.pageInfos);
router.get('/editarSaida/:id',  SAIDA.pageEditar);

//----------------------------------------------------7 CAMINHÕES-----------------------

//---------PÁGINAS
router.get('/caminhoes', CAM.page);
router.get('/novoCaminhao', CAM.pageCriar);
router.get('/infosCaminhao/:id',CAM.pageInfos);
router.get('/editarCaminhao/:id',  CAM.pageEditar);

//-------------------------------------------------------8 FUNCIONARIOS-----------------------

//---------PÁGINAS  
router.get('/funcionarios', FUNC.page);
router.get('/novoFuncionario', FUNC.pageCriar);
router.get('/infosFuncionario/:id',FUNC.pageInfos);
router.get('/editarFuncionario/:id',  FUNC.pageEditar);

//-------------------------------------------------------9 CLIENTES-----------------------

//---------PÁGINAS  
router.get('/clientes', CLIENTE.page);
router.get('/novoCliente', CLIENTE.pageCriar);
router.get('/infosCliente/:id',CLIENTE.pageInfos);
router.get('/editarCliente/:id',  CLIENTE.pageEditar);
module.exports = router;