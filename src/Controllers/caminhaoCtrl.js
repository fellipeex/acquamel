import {CaminhaoDAO, Caminhao} from '../Models/caminhao/CaminhaoDAO.js'
import * as al from './alertas/alertasCaminhao.js';
import { NOAUTH } from './alertas/alertas.js';

//----------------------------------------------------------CAMINHÃO-----------------------
//----------------------------------------------------------CRUD
//----------------------------SAVE
export const set = async (req, res) => {
  let usrSess= {
    nomeUsr: req.session.nomeUsr,
    Usr: req.session.usuario}
  if (req.session.loggedin) {
    const placa = req.body.placa;
    const nome = req.body.nome;
    const ano = req.body.ano;
    const renavam = req.body.renavam;
    const marca = req.body.marca;
    const revisao = req.body.revisao;
    const cargaMax = req.body.cargaMax;
    const cam = new Caminhao(null, placa, nome, ano, renavam, marca, revisao,cargaMax)
    try{
      const camDAO = new CaminhaoDAO()
      await camDAO.save(cam)
      res.render('pages/caminhao/camCreate.ejs',{...usrSess, ...al.SetSuccess});
    }catch(err) {
      console.error(err);
      res.render('pages/caminhao/camCreate.ejs',{...usrSess, ...al.SetError});
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
    const placa = req.body.placa;
    const nome = req.body.nome;
    const ano = req.body.ano;
    const renavam = req.body.renavam;
    const marca = req.body.marca;
    const revisao = req.body.revisao;
    const cargaMax = req.body.cargaMax;
    const cam = new Caminhao(id, placa, nome, ano, renavam, marca, revisao,cargaMax)
    try{
      const camDAO = new CaminhaoDAO()
      await camDAO.save(cam)
      res.render('pages/caminhao/camInfo.ejs',{...usrSess,
        cam:cam,
         ...al.UpdateSuccess(id)});
    }catch(err) {
      console.error(err);
      res.render('pages/caminhao/camCreate.ejs',{...usrSess, ...al.UpdateError(id)});
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
      const camDAO = new CaminhaoDAO()
      await camDAO.delete(id)
      res.render('pages/caminhao/caminho.ejs',{...usrSess, ...al.DelSuccess});
    }catch(err) {
      console.error(err);
      res.render('pages/caminhao/caminhao.ejs',{...usrSess, ...al.DelError});
    }
  } else { 
    res.render('pages/not-found.ejs',{...usrSess, ...NOAUTH});
  }
}
//-----------------------------------------------------GETS JSON ALL Caminhões 
export const getAll = async (req, res) => {
  if (req.session.loggedin) {
    const camDAO = new CaminhaoDAO();
    try {
      const caminhoes = await camDAO.getAll();
      if (caminhoes.length > 0) {
        res.json(caminhoes)
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
    const camDAO = new CaminhaoDAO();
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