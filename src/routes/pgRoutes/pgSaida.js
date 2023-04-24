import { NOAUTH, NOTFOUND } from "../../Controllers/alertas/alertas.js";
import SaidaDAO from "../../Models/saida/SaidaDAO.js"
//----------------------------------------------------------SAÍDA------------------
//-----------------------------------------------------ROTAS PARA PÁGINAS  
export const page = async (req, res) => {
  let usrSess = {
    nomeUsr: req.session.nomeUsr,
    Usr: req.session.usuario
  }
  if (req.session.loggedin) {
    res.render('pages/saida/saida.ejs', { ...usrSess });
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
    try {
      const saiDAO = new SaidaDAO()
      const cate = await saiDAO.getCate()
      res.render('pages/saida/saidaCreate.ejs', {
        ...usrSess,
        cate: cate
      });
    } catch (err) {
      res.render('pages/not-found.ejs', { ...usrSess, ...NOTFOUND(err) })
    }
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
      const saiDAO = new SaidaDAO()
      const sai = await saiDAO.getById(id)

      res.render('pages/saida/saidaInfo.ejs', {
        ...usrSess,
        sai: sai
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
      const saiDAO = new SaidaDAO()
      const sai = await saiDAO.getById(id)
      const cate = await saiDAO.getCate()
      res.render('pages/saida/saidaEdit.ejs', {
        ...usrSess,
        sai: sai,
        cate: cate
      });
      //criar objeto Caminhão, Cliente, Vendedor e Motorista

    } catch (err) {
      res.render('pages/not-found.ejs', { ...usrSess, ...NOTFOUND(err) })
    }
  } else {
    res.render('pages/not-found.ejs', { ...usrSess, ...NOAUTH });
  }
}