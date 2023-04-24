import { NOAUTH, NOTFOUND } from "../../Controllers/alertas/alertas.js";
import FuncionarioDAO from "../../Models/funcionario/FuncionarioDAO.js";
//----------------------------------------------------------FUNCIONARIOS-----------------------
//-----------------------------------------------------ROTAS PARA PÁGINAS  
export const page = async (req, res) => {
  let usrSess = {
    nomeUsr: req.session.nomeUsr,
    Usr: req.session.usuario
  }
  if (req.session.loggedin) {
    res.render('pages/funcionario/funcionario.ejs', { ...usrSess });
  } else {
    res.render('pages/not-found.ejs', { ...usrSess, ...NOAUTH });
  }
}
export const pageCriar = (req, res) => {
  let usrSess = {
    nomeUsr: req.session.nomeUsr,
    Usr: req.session.usuario
  }
  if (req.session.loggedin) {
    res.render('pages/funcionario/funcCreate.ejs', { ...usrSess });
  } else {
    res.render('pages/not-found.ejs', { ...usrSess, ...NOAUTH });
  }
}
export const pageInfos = async (req, res) => {
  let usrSess = {
    nomeUsr: req.session.nomeUsr,
    Usr: req.session.usuario
  }
  if (req.session.loggedin) {
    const id = req.params.id;
    try {
      const funcDAO = new FuncionarioDAO()
      const func = await funcDAO.getById(id)
      res.render('pages/funcionario/funcInfo.ejs', {
        ...usrSess,
        func: func
      });
    } catch (err) {
      res.render('pages/not-found.ejs', { ...usrSess, ...NOTFOUND(err) })
    }
  } else {
    res.render('pages/not-found.ejs', { ...usrSess, ...NOAUTH });
  }
}
export const pageEditar = async (req, res) => {
  let usrSess = {
    nomeUsr: req.session.nomeUsr,
    Usr: req.session.usuario
  }
  if (req.session.loggedin) {
    const id = req.params.id;
    try {
      const funcDAO = new FuncionarioDAO();
      const func = await funcDAO.getById(id)
      res.render('pages/funcionario/funcEdit.ejs', {
        ...usrSess,
        func: func
      })
    } catch (err) {
      res.render('pages/not-found.ejs', { ...usrSess, ...NOTFOUND(err) })
    }
  } else {
    res.render('pages/not-found.ejs', { ...usrSess, ...NOAUTH });
  }
}