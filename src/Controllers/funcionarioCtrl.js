import {FuncionarioDAO, Funcionario} from '../Models/funcionario/FuncionarioDAO.js'
import * as al from './alertas/alertasFuncionario.js';
import { NOAUTH } from './alertas/alertas.js';
//----------------------------------------------------------FUNCIONARIOS-----------------------
//----------------------------------------------------------CRUD
//----------------------------SAVE
export const set = async (req, res) => {
  let usrSess= {
    nomeUsr: req.session.nomeUsr,
    Usr: req.session.usuario}
  if (req.session.loggedin) {
    const nome = req.body.nome;
    const ctps = req.body.ctps;
    const rg = req.body.rg;
    const cpf = req.body.cpf;
    const endereco = req.body.endereco;
    const bairro = req.body.bairro;
    const cep = req.body.cep;
    const status = req.body.status;
    const salario = req.body.salario;
    const cargo = req.body.cargo;
    const dataEnt = req.body.dataEnt;
    const dataSai = req.body.dataSai;
    const func = new Funcionario(null, nome, ctps, rg, cpf, endereco, bairro, cep, status, salario, cargo, dataEnt, dataSai)
    try{
      const funcDAO = new FuncionarioDAO()
      await funcDAO.save(func)
      res.render('pages/funcionario/funcCreate.ejs',{...usrSess, ...al.SetSuccess});
    }catch(err) {
      console.error(err);
      res.render('pages/funcionario/funcCreate.ejs',{...usrSess, ...al.SetError});
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
    const dataNasc = req.body.dataNasc;
    const ctps = req.body.ctps;
    const rg = req.body.rg;
    const cpf = req.body.cpf;
    const endereco = req.body.endereco;
    const bairro = req.body.bairro;
    const cep = req.body.cep;
    const status = req.body.status;
    const salario = req.body.salario;
    const cargo = req.body.cargo;
    const dataEnt = req.body.dataEnt;
    const dataSai = req.body.dataSai;
    let dtSai
    if(status == "Desligado"){
      dtSai = dataSai
    }if(status == "Ligado"){
      dtSai = null
    }
    const func = new Funcionario(id, nome,dataNasc, ctps, rg, cpf, endereco, bairro, cep, status, salario, cargo, dataEnt, dtSai)
    try{
      const funcDAO = new FuncionarioDAO()
      await funcDAO.save(func)
      res.render('pages/funcionario/funcCreate.ejs',{...usrSess, ...al.UpdateSuccess(id)});
    }catch(err) {
      console.error(err);
      res.render('pages/funcionario/funcCreate.ejs',{...usrSess, ...al.UpdateError(id)});
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
      const funcDAO = new FuncionarioDAO()
      await funcDAO.delete(id)
      res.render('pages/funcionario/funcionario.ejs',{...usrSess, ...al.DelSuccess});
    }catch(err) {
      console.error(err);
      res.render('pages/funcionario/funcionario.ejs',{...usrSess, ...al.DelError});
    }
  } else { 
    res.render('pages/not-found.ejs',{...usrSess, ...NOAUTH});
  }
}
//-----------------------------------------------------GETS JSON ALL Caminhões 
export const getAll = async (req, res) => {
  if (req.session.loggedin) {
    const funcDAO = new FuncionarioDAO();
    try {
      const funcionarios = await funcDAO.getAll();
      if (funcionarios.length > 0) {
        res.json(funcionarios)
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
    const camDAO = new FuncionarioDAO();
    try {
      const cam = await camDAO.getById(id);
      if (cam.length > 0) {
        res.json(cam)
      } 
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