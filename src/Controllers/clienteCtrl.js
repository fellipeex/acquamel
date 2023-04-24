import {ClienteDAO,Cliente} from '../Models/cliente/ClienteDAO.js';
import * as al from './alertas/alertasCliente.js'
import { NOAUTH } from './alertas/alertas.js';

//----------------------------------------------------------CLIENTES-----------------------
//----------------------------SAVE
export const set = async (req, res) => {
  let usrSess= {
    nomeUsr: req.session.nomeUsr,
    Usr: req.session.usuario}
  if (req.session.loggedin) {
    const nome = req.body.nome;
    const apelido = req.body.apelido;
    const cpf = req.body.cpf;
    const cnpj = req.body.cnpj;
    const endereco = req.body.endereco;
    const bairro = req.body.bairro;
    const cep = req.body.cep;
    const telefone = req.body.telefone;
    const celular = req.body.celular;
    const cli = new Cliente(null, nome, apelido, cnpj, cpf, endereco, bairro, cep, telefone, celular)
    try{
      const cliDAO = new ClienteDAO()
      await cliDAO.save(cli)
      res.render('pages/cliente/cliCreate.ejs',{...usrSess, ...al.SetSuccess});
    }catch(err) {
      console.error(err);
      res.render('pages/cliente/cliCreate.ejs',{...usrSess, ...al.SetError});
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
    const id = req.body.id;
    const nome = req.body.nome;
    const apelido = req.body.apelido;
    const cpf = req.body.cpf;
    const cnpj = req.body.cnpj;
    const endereco = req.body.endereco;
    const bairro = req.body.bairro;
    const cep = req.body.cep;
    const telefone = req.body.telefone;
    const celular = req.body.celular;
    const cli = new Cliente(id, nome, apelido, cnpj, cpf, endereco, bairro, cep, telefone, celular)
    try{
      const cliDAO = new ClienteDAO()
      await cliDAO.save(cli)
      res.render('pages/cliente/cliCreate.ejs',{...usrSess, ...al.UpdateSuccess(id)});
    }catch(err) {
      console.error(err);
      res.render('pages/cliente/cliCreate.ejs',{...usrSess, ...al.UpdateError(id)});
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
      const cliDAO = new ClienteDAO()
      await cliDAO.delete(id)
      res.render('pages/cliente/cliente.ejs',{...usrSess, ...al.DelSuccess});
    }catch(error) {
      console.error(error);
      res.render('pages/cliente/cliente.ejs',{...usrSess, ...al.DelError(error)});
    }
  } else { 
    res.render('pages/not-found.ejs',{...usrSess, ...NOAUTH});
  }
}
//-----------------------------------------------------GETS JSON ALL Clientes 
export const getAll = async (req, res) => {
  if (req.session.loggedin) {
    const cliDAO = new ClienteDAO();
    try {
      const cli = await cliDAO.getAll();
      if (cli.length > 0) {
        res.json(cli)
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
//--------------GETS JSON Caminhão BY ID
export const getById = async (req, res) => {
  if (req.session.loggedin) {
    const id = req.params.id;
    const cliDAO = new ClienteDAO();
    try {
      const cam = await cliDAO.getById(id);
      if (cam.length > 0) {
        res.json(cam)
      } 
    } catch (error) {
        res.json({ message: `Problema de consulta no banco, ${error}` });
    }
  } else {
    let usrSess = {
      nomeUsr: req.session.nomeUsr,
      Usr: req.session.usuario
    }
    res.render('pages/not-found.ejs', { ...usrSess, ...NOAUTH });
  }
}