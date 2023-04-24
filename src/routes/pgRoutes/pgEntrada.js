import { NOAUTH, NOTFOUND } from "../../Controllers/alertas/alertas.js";
import CaminhaoDAO from "../../Models/caminhao/CaminhaoDAO.js";
import ClienteDAO from "../../Models/cliente/ClienteDAO.js";
import EntradaDAO from "../../Models/entrada/EntradaDAO.js";
import FuncionarioDAO from "../../Models/funcionario/FuncionarioDAO.js";
//----------------------------------------------------------ENTRADA-----------------------
export const page = async (req, res) => {
  let usrSess = {
    nomeUsr: req.session.nomeUsr,
    Usr: req.session.usuario
  }
  if (req.session.loggedin) {
    res.render('pages/entrada/entrada.ejs', { ...usrSess });
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
      const camDAO = new CaminhaoDAO();
      const cliDAO = new ClienteDAO();
      const funcDAO = new FuncionarioDAO();

      const cam = await camDAO.getAll()
      const cli = await cliDAO.getAll()
      const moto = await funcDAO.getMotoristas()
      const vend = await funcDAO.getVendedores()
      res.render('pages/entrada/entradaCreate.ejs', {
        ...usrSess,
        cam: cam,
        cli: cli,
        moto: moto,
        vend: vend
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
      const entDAO = new EntradaDAO()
      const ent = await entDAO.getById(id)
      const A = await entDAO.getOutros(ent)
      res.render('pages/entrada/entradaInfo.ejs', {
        ...usrSess,
        ent: ent,
        cam: A.caminhao,
        cli: A.cliente,
        moto: A.motorista,
        vend: A.vendedor
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
      const entDAO = new EntradaDAO()
      const camDAO = new CaminhaoDAO();
      const cliDAO = new ClienteDAO();
      const funcDAO = new FuncionarioDAO();
      const ent = await entDAO.getById(id)
      const cam = await camDAO.getAll()
      const cli = await cliDAO.getAll()
      const moto = await funcDAO.getMotoristas()
      const vend = await funcDAO.getVendedores()
      res.render('pages/entrada/entradaEdit.ejs', {
        ...usrSess,
        ent: ent,
        cam: cam,
        cli: cli,
        moto: moto,
        vend: vend
      });

    } catch (err) {
      res.render('pages/not-found.ejs', { ...usrSess, ...NOTFOUND(err) })
    }
  } else {
    res.render('pages/not-found.ejs', { ...usrSess, ...NOAUTH });
  }
}
