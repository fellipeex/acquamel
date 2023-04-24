import {SaidaDAO, Saida} from '../Models/saida/SaidaDAO.js'
import * as al from './alertas/alertasSaida.js';
import { NOAUTH } from './alertas/alertas.js';

//----------------------------------------------------------SAÍDA-----------------------
//----------------------------------------------------------CRUD
//----------------------------SAVE
export const set = async (req, res) => {
  let usrSess= {
    nomeUsr: req.session.nomeUsr,
    Usr: req.session.usuario}
  if (req.session.loggedin) {
    const nome = req.body.nomeS;
    const cate = req.body.categoriaS;
    const novaCate = req.body.novaCategoria;
    const data = req.body.dataS;
    const obs = req.body.obs;
    let vlr
    
    if(req.body.valorS >0){
      vlr = req.body.valorS *-1
    }else{
      vlr = req.body.valorS
    } 
    const valor = parseFloat(vlr)
    let categoria
    if (cate === "nova" && novaCate.trim() !== "") {
      categoria = novaCate.trim()
    }else{
      categoria = cate
    }
    const sai = new Saida(null,nome,categoria,valor,obs,data)
    try{
      const saiDAO = new SaidaDAO()
      await saiDAO.save(sai)
      
      res.render('pages/saida/saidaInfo.ejs',{
        ...usrSess,
        sai:sai,
        ...al.SetSuccess
      });
    }catch(err) {
      console.error(err);
      res.render('pages/saida/saidaCreate.ejs',{...usrSess, ...al.SetError});
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
    const idS = parseInt(req.body.idS);
    const nome = req.body.nomeS;
    const cate = req.body.categoriaS;
    const novaCate = req.body.novaCategoria;
    const data = req.body.dataS;
    const obs = req.body.obs;
    let vlr;
    if(req.body.valorS >0){
      vlr = req.body.valorS *-1
    }else{
      vlr = req.body.valorS
    }
    const valor = parseFloat(vlr)

    
    let categoria
    if (cate === "nova" && novaCate.trim() !== "") {
      categoria = novaCate.trim()
    }else{
      categoria = cate
    }
    const sai = new Saida(idS,nome,categoria,valor,obs,data)
    try{
      const saiDAO = new SaidaDAO()
      await saiDAO.save(sai)
      res.render('pages/saida/saidaInfo.ejs',{...usrSess, 
        sai:sai,
        ...al.UpdateSuccess(idS)
      });
    }catch(err) {
      console.error(err);
      res.render('pages/saida/saidaCreate.ejs',{...usrSess, ...al.UpdateError(idS)});
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
  if (req.session.loggedin  && req.session.usuario.classe =="admin") {
    const id = req.params.id;
    try{
      const saiDAO = new SaidaDAO()
      await saiDAO.delete(id)
      res.render('pages/saida/saida.ejs',{...usrSess, ...al.DelSuccess});
    }catch(err) {
      console.error(err);
      res.render('pages/saida/saida.ejs',{...usrSess, ...al.DelError});
    }
  } else { 
    res.render('pages/not-found.ejs',{...usrSess, ...NOAUTH});
  }
}
//-----------------------------------------------------GETS JSON ALL Saidas 
export const getAll = async (req, res) => {
  if (req.session.loggedin) {
    const saiDAO = new SaidaDAO();
    try {
      const saidas = await saiDAO.getAll();
      if (saidas.length > 0) {
        res.json(saidas)
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
//--------------GETS JSON saidas BY ID
export const getById = async (req, res) => {
  if (req.session.loggedin) {
    const id = req.params.id;
    const saiDAO = new SaidaDAO();
    try {
      const sai = await saiDAO.getById(id);
      if (sai.length > 0) {
        res.json(sai)
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
//-----------------------GET JSON saidas ANUAL
export const getByY = async (req, res) => {
  if (req.session.loggedin) {
    const ano = req.params.ano;
    const saiDAO = new SaidaDAO();
    try {
      const sai = await saiDAO.getEByY(ano);
      if (sai.length > 0) {
        res.json(sai)
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
//-----------GET JSON saidas ANO MÊS
export const getByYM = async (req, res) => {
  if (req.session.loggedin) {
    const anoMes = req.params.anoMes;
    const ano = anoMes.substr(0, 4); //ou slice(0,4)
    const mes = anoMes.substr(4, 6);
    const saiDAO = new SaidaDAO();
    try {
      const sai = await saiDAO.getEByYM(ano, mes);
      if (sai.length > 0) {
          res.json(sai)
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