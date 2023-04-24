import UserDAO from '../../Models/usuario/UserDAO.js';
import {NOAUTH, NOTFOUND} from '../../Controllers/alertas/alertas.js'
//-----------------------------------------------------USUÁRIOS  
export const page = (req, res) => {
  let usrSess= {
    nomeUsr: req.session.nomeUsr,
    Usr: req.session.usuario}
  if(req.session.loggedin && req.session.usuario.classe=="admin"){
  res.render('pages/usuario/usuario.ejs', {...usrSess});
  }else { 
    
    res.render('pages/not-found.ejs', { ...usrSess, ...NOAUTH});
  }
}
export const pageTable = (req, res) => {
  let usrSess= {
    nomeUsr: req.session.nomeUsr,
    Usr: req.session.usuario}
  if(req.session.loggedin && req.session.usuario.classe=="admin"){
  res.render('pages/usuario/userTable.ejs',);
  }else { 
    
    res.render('pages/not-found.ejs', { ...usrSess, ...NOAUTH});
  }
}
export const pageCriar = (req, res) => {
  let usrSess= {
    nomeUsr: req.session.nomeUsr,
    Usr: req.session.usuario}
  if(req.session.loggedin && req.session.usuario.classe=="admin"){
    res.render('pages/usuario/userCreate.ejs', {...usrSess});
  }else { 
    res.render('pages/not-found.ejs', { ...usrSess, ...NOAUTH});
  }
}
export const pageInfos = async (req, res) => {
  let usrSess= {
    nomeUsr: req.session.nomeUsr,
    Usr: req.session.usuario}
  if(req.session.loggedin && req.session.usuario.classe=="admin"){
    const id = req.params.id;
    try{
      const userDAO = new UserDAO();
      const user = await userDAO.getById(id)
      res.render('pages/usuario/userInfo.ejs',{
        usu:user,
        id:id,
        ...usrSess
      });
  }catch(err){
    res.render('pages/not-found.ejs', { ...usrSess, ...NOTFOUND(err)})
  }
  } else { 
    res.render('pages/not-found.ejs', { ...usrSess, ...NOAUTH});
  }
}
export const pageEditar = async (req, res) => {
  let usrSess= {
    nomeUsr: req.session.nomeUsr,
    Usr: req.session.usuario
  }
  if(req.session.loggedin && req.session.usuario.classe=="admin"){
    const id = req.params.id;
    try{
      const userDAO = new UserDAO();
      const user = await userDAO.getById(id)
      res.render('pages/usuario/userEdit.ejs',{
        usu:user,
        id:id,
        ...usrSess
      });
    }catch(err){
      res.render('pages/not-found.ejs', { ...usrSess, ...NOTFOUND(err)})
    }
  }else {
    res.render('pages/not-found.ejs', { ...usrSess, ...NOAUTH});
  }
}