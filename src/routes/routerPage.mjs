// ----------------------------------------------0 IMPORTAÇÕES
import express from 'express';
import * as LOGIN from './pgRoutes/pgLogin.js'
import * as USER from './pgRoutes/pgUser.js';
import * as ENTRADA from './pgRoutes/pgEntrada.js';
import * as SAIDA from './pgRoutes/pgSaida.js';
import * as CAM from './pgRoutes/pgCaminhao.js';
import * as FUNC from './pgRoutes/pgFuncionario.js';
import * as CLIENTE from './pgRoutes/pgCliente.js'; 

const router = express.Router();
// -----------------------------------------------1 PÁGINA INICIAL


router.get('/', (req, res) => {
  if(req.session.loggedin){
    res.render('pages/index.ejs',{
      anoMes: req.session.anoMes,
      Usr: req.session.usuario,
      nomeUsr: req.session.nomeUsr
    });
  }else{
    res.redirect('/login');
  }
});
//----------------------------------------------------2 LOGIN 
router.get('/login', LOGIN.login);
router.get('/logout', LOGIN.logout);
//----------------------------------------------------4 USUÁRIOS---------------
//-------------------PÁGINAS 
router.get('/usuarios', USER.page);
router.get('/novoUsuario', USER.pageCriar);
router.get('/userTable/',USER.pageTable);
router.get('/infosUsuario/:id',USER.pageInfos);
router.get('/editarUsuario/:id',USER.pageEditar);
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
/* 
router.get('*', notFound); */
function notFound(req, res, next){
  res.status(404);
  res.render('pages/not-found.ejs', {
    title: 'Página não encontrada'
  });
}

export default router