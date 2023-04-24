import ClienteDAO from "../../Models/cliente/ClienteDAO.js";
import { NOAUTH, NOTFOUND } from "../../Controllers/alertas/alertas.js";

//----------------------------------------------------------CLIENTES-----------------------
//-----------------------------------------------------ROTAS PARA PÁGINAS  
export const page = (req, res) => {
  let usrSess = {
    nomeUsr: req.session.nomeUsr,
    Usr: req.session.usuario
  }
  if (req.session.loggedin) {
    res.render('pages/cliente/cliente.ejs', { ...usrSess });
  } else {
    res.render('pages/not-found.ejs', { ...usrSess, ...NOAUTH });
  }
}
export const pageCriar = async (req, res) => {
  let usrSess = {
    nomeUsr: req.session.nomeUsr,
    Usr: req.session.usuario
  }
  if (req.session.loggedin) {
    res.render('pages/cliente/cliCreate.ejs', { ...usrSess });
  } else {
    res.render('pages/not-found.ejs', { ...usrSess, ...NOAUTH });
  }
}
export const pageInfos = async(req, res) => {
  let usrSess = {
    nomeUsr: req.session.nomeUsr,
    Usr: req.session.usuario
  }
  if (req.session.loggedin) {
    const id = req.params.id;
    try {
      const cliDAO = new ClienteDAO()
      const cli = await cliDAO.getById(id)
      res.render('pages/cliente/cliInfo.ejs', {
        ...usrSess,
        cli: cli
      });
    } catch (err) {
      res.render('pages/not-found.ejs', { ...usrSess, ...NOTFOUND(err) })
    }
  } else {
    res.render('pages/not-found.ejs', { ...usrSess, ...NOAUTH });
  }
}

export const pageEditar = async(req, res) => {
  let usrSess = {
    nomeUsr: req.session.nomeUsr,
    Usr: req.session.usuario
  }
  if (req.session.loggedin) {
    const id = req.params.id;
    try {
      const cliDAO = new ClienteDAO()
      const cli = await cliDAO.getById(id)
      res.render('pages/cliente/cliEdit.ejs', {
        ...usrSess,
        cli: cli
      })
    } catch (err) {
      res.render('pages/not-found.ejs', { ...usrSess, ...NOTFOUND(err) })
    }
  } else {
    res.render('pages/not-found.ejs', { ...usrSess, ...NOAUTH });
  }
}
    
      