//import conn from '../Config/database/db.js';
import {EntradaDAO, Entrada} from '../Models/entrada/EntradaDAO.js'
import * as al from './alertas/alertasEntrada.js';
import { NOAUTH } from './alertas/alertas.js';

//----------------------------------------------------------ENTRADA-----------------------

//----------------------------------------------------------CRUD

//----------------------------SAVE
export const set = async (req, res) => {
  let usrSess= {
    nomeUsr: req.session.nomeUsr,
    Usr: req.session.usuario}
  if (req.session.loggedin) {
    const {nomeE, dataE, obs} = req.body
    const valorE = parseFloat(req.body.valorE)
    const qtdE = parseFloat(req.body.qtdE)
    const camE = parseInt(req.body.camE);
    const cliE = parseInt(req.body.cliE);
    const vendE = parseInt(req.body.vendE);
    const motoE = parseInt(req.body.motoE);
    const total = valorE*qtdE
    const ent = new Entrada(null,nomeE,cliE,camE,vendE,motoE,valorE,qtdE,total,obs,dataE)
    try{
      const entDAO = new EntradaDAO()
      await entDAO.save(ent);
      const A = await entDAO.getOutros(ent)
      res.render('pages/entrada/entradaInfo.ejs', {
        ...usrSess,
        ent:ent,
        cli: A.cliente,
        cam: A.caminhao,
        moto: A.motorista,
        vend: A.vendedor,
        ...al.SetSuccess});
    }catch(err) {
      console.error(err);
      res.render('pages/not-found.ejs',{...usrSess, ...al.SetError});
    }
  } else { 
    res.render('pages/not-found.ejs',{...usrSess, ...NOAUTH});
  }
}
//-----------------------UPDATE
export const update = async (req, res) => {
  let usrSess= {
    nomeUsr: req.session.nomeUsr,
    Usr: req.session.usuario}
  if (req.session.loggedin) {
    const {nomeE, dataE, obs} = req.body
    const valorE = parseFloat(req.body.valorE)
    const qtdE = parseFloat(req.body.qtdE)
    const idE = parseInt(req.body.idE);
    const camE = parseInt(req.body.camE);
    const cliE = parseInt(req.body.cliE);
    const vendE = parseInt(req.body.vendE);
    const motoE = parseInt(req.body.motoE);
    const total = valorE*qtdE
    const ent = new Entrada(idE,nomeE,cliE,camE,vendE,motoE,valorE,qtdE,total,obs,dataE)
    try{
      const entDAO = new EntradaDAO()
      await entDAO.save(ent)
      const A = await entDAO.getOutros(ent)
      
      
      res.render('pages/entrada/entradaInfo.ejs', {
        ...usrSess,
        ent: ent,
        cli: A.cliente,
        cam: A.caminhao,
        moto: A.motorista,
        vend: A.vendedor,
        ...al.UpdateSuccess(idE)
      });
    }catch(err) {
      console.error(err);
      res.render('pages/not-found.ejs',{...usrSess, ...al.UpdateError(idE)});
    }
  } else { 
    res.render('pages/not-found.ejs',{...usrSess, ...NOAUTH});
  }
}
//----------------DELETE
export const del = async(req, res) => {
  let usrSess= {
    nomeUsr: req.session.nomeUsr,
    Usr: req.session.usuario
  }
  if (req.session.loggedin && req.session.usuario.classe =="admin") {
    const id = req.params.id;
    try{
      const entDAO = new EntradaDAO()
      await entDAO.delete(id)
      res.render('pages/entrada/entrada.ejs',{...usrSess, ...al.DelSuccess});
    }catch(err) {
      console.error(err);
      res.render('pages/entrada/entrada.ejs',{...usrSess, ...al.DelError});
    }
  } else { 
    res.render('pages/not-found.ejs',{...usrSess, ...NOAUTH});
  }
}
//-------------------------------------GETS JSON ALL ENTRADAS 
export const getAll = async (req, res) => {
  if (req.session.loggedin) {
    const entDAO = new EntradaDAO();
    try {
      const entradas = await entDAO.getAll();
      if (entradas.length > 0) {
        res.json(entradas)
      }
    } catch (error) {
        res.json({ message: `Problema de consulta no banco, ${error}` })
    }
  } else {
    let usrSess = {
      nomeUsr: req.session.nomeUsr,
      Usr: req.session.usuario
    }
    res.render('pages/not-found.ejs', { ...usrSess, ...NOAUTH });
  }
}
//--------------GETS JSON ENTRADAS BY ID
export const getById = async (req, res) => {
  if (req.session.loggedin) {
    const id = req.params.id;
    const entDAO = new EntradaDAO();
    try {
      const ent = await entDAO.getById(id);
      
        res.json(ent)
      
    } catch (error) {
        res.json({ message: `Problema de consulta no banco, ${err}` });
    }
  } else {
    let usrSess = {
      nomeUsr: req.session.nomeUsr,
      Usr: req.session.usuario
    }
    res.render('pages/not-found.ejs', { ...usrSess, ...NOAUTH });
  }
}
//-----------------------GET JSON ENTRADAS ANUAL
export const getByY = async (req, res) => {
  if (req.session.loggedin) {
    const ano = req.params.ano;
    const entDAO = new EntradaDAO();
    try {
      const ent = await entDAO.getByY(ano);
      if (ent.length > 0) {
        res.json(ent)
      }
    } catch (error) {
      res.json({ message: `${error}` })
    }
  } else {
    let usrSess = {
      nomeUsr: req.session.nomeUsr,
      Usr: req.session.usuario
    }
    res.render('pages/not-found.ejs', { ...usrSess, ...NOAUTH });
  }
}

//-----------GET JSON ENTRADAS ANO MÊS
export const getByYM = async (req, res) => {
  if (req.session.loggedin) {
    const anoMes = req.params.anoMes;
    const ano = anoMes.substr(0, 4); //ou slice(0,4)
    const mes = anoMes.substr(4, 6);
    const entDAO = new EntradaDAO();
    try {
      const ent = await entDAO.getByYM(ano, mes);
      if (ent.length > 0) {
          res.json(ent)
      }
    } catch (error) {
      res.json({ message: ` ${error}` })
    }
  } else {
    let usrSess = {
      nomeUsr: req.session.nomeUsr,
      Usr: req.session.usuario
    }
    res.render('pages/not-found.ejs', { ...usrSess, ...NOAUTH });
  }
}