import CONN from '../Config/database/conn.js';
import * as sql from './allSql.js'
import { NOAUTH } from './alertas/alertas.js';
//-------------------------------------------------------------------INDEX
//-----------GET JSON TOTAL ENTRADA e SAIDA

export const getAllTotalGeral = async(req, res) => {
  if (req.session.loggedin){
    try {
      const data = await CONN.query(sql.GetAllTotalGeral)
      
      if (data.length === 0) {
        res.send(new Error('Nenhum dado encontrado!'));
        res.redirect('/');
      }else{
        const a = JSON.stringify(data);
        res.send(a);
      }
    }catch(error){
      res.send(new Error('Erro na consulta do Banco. ' + error.message))
    } finally {
      CONN.liberar()
    }
  } else { 
    let usrSess= {
      nomeUsr: req.session.nomeUsr,
      Usr: req.session.usuario}
  res.render('pages/not-found.ejs', { ...usrSess, ...NOAUTH});
  } 
}
export const getTotalGeral = async(req, res) => {
  if (req.session.loggedin) {
    const anoMes = req.params.anoMes;
    const ano = anoMes.substr(0, 4); //ou slice(0,4)
    const mes = anoMes.substr(4, 6);
    try {
      const data = await CONN.query(sql.GetTotalGeral, [mes, ano, mes, ano, mes, ano])
      if (data.length === 0) {
        res.send(new Error('Nenhum dado encontrado!'));
      }else{
        const a = JSON.stringify(data);
        res.send(a);
      }
    }catch(error){
      res.send(new Error('Erro na consulta do Banco. ' + error.message))
    } finally {
      CONN.liberar()
    }
  } else { 
    let usrSess= {
      nomeUsr: req.session.nomeUsr,
      Usr: req.session.usuario}
  res.render('pages/not-found.ejs', { ...usrSess, ...NOAUTH});
  } 
}
export const getTotalGeralAnual = async(req, res) => {
  if (req.session.loggedin) {
    const anoMes = req.params.anoMes;
    const ano = anoMes.substr(0, 4); //ou slice(0,4)
    const mes = anoMes.substr(4, 6);
    try {
      const data = await CONN.query(sql.GetTotalGeralAnual, [ano, ano, ano, ano, ano])
      CONN.liberar()
      if (data.length === 0) {
        res.send(new Error('Nenhum dado encontrado!'));
      }else{
        const a = JSON.stringify(data);
        res.send(a);
      }
    }catch(error){
      res.send(new Error('Erro na consulta do Banco. ' + error.message))
    } finally {
      CONN.liberar()
    }
  } else { 
    let usrSess= {
      nomeUsr: req.session.nomeUsr,
      Usr: req.session.usuario}
  res.render('pages/not-found.ejs', { ...usrSess, ...NOAUTH});
  } 
}
export const getAllCategoriaSaida = async(req, res) => {
  if (req.session.loggedin) {
    try {
      const data = await CONN.query(sql.GetAllCategoriaSaida, )
      
      if (data.length === 0) {
        res.send(new Error('Nenhum dado encontrado!'));
      }else{
        const a = JSON.stringify(data);
        res.send(a);
      }
    }catch(error){
      res.send(new Error('Erro na consulta do Banco. ' + error.message))
    } finally {
      CONN.liberar()
    }
  } else { 
    let usrSess= {
      nomeUsr: req.session.nomeUsr,
      Usr: req.session.usuario}
  res.render('pages/not-found.ejs', { ...usrSess, ...NOAUTH});
  } 
}
export const getCategoriaSaida = async(req, res) => {
  if (req.session.loggedin) {
    const anoMes = req.params.anoMes;
    const ano = anoMes.substr(0, 4); //ou slice(0,4)
    const mes = anoMes.substr(4, 6);
    try {
      const data = await CONN.query(sql.GetCategoriaSaida,[mes, ano])
      
      if (data.length === 0) {
        res.send(new Error('Nenhum dado encontrado!'));
      }else{
        const a = JSON.stringify(data);
        res.send(a);
      }
    }catch(error){
      res.send(new Error('Erro na consulta do Banco. ' + error.message))
    } finally {
      CONN.liberar()
    }
  } else { 
    let usrSess= {
      nomeUsr: req.session.nomeUsr,
      Usr: req.session.usuario}
  res.render('pages/not-found.ejs', { ...usrSess, ...NOAUTH});
  } 
}
export const getViagens = async(req, res) => {
  if (req.session.loggedin) {
    const anoMes = req.params.anoMes;
    const ano = anoMes.substr(0, 4); //ou slice(0,4)
    const mes = anoMes.substr(4, 6);
    try {
      const data = await CONN.query(sql.GetViagens, [mes, ano])
      
      if (data.length === 0) {
        res.send(new Error('Nenhum dado encontrado!'));
      }else{
        const a = JSON.stringify(data);
        res.send(a);
      }
    }catch(error){
      res.send(new Error('Erro na consulta do Banco. ' + error.message))
    } finally {
      CONN.liberar()
    }
  } else { 
    let usrSess= {
      nomeUsr: req.session.nomeUsr,
      Usr: req.session.usuario}
  res.render('pages/not-found.ejs', { ...usrSess, ...NOAUTH});
  } 
}
export const getMotVi = async(req, res) => {
  if (req.session.loggedin) {
    const anoMes = req.params.anoMes;
    const ano = anoMes.substr(0, 4); //ou slice(0,4)
    const mes = anoMes.substr(4, 6);
    try {
      const data = await CONN.query(sql.GetMotVi, [mes, ano])
      
      if (data.length === 0) {
        res.send(new Error('Nenhum dado encontrado!'));
      }else{
        const a = JSON.stringify(data);
        res.send(a);
      }
    }catch(error){
      res.send(new Error('Erro na consulta do Banco. ' + error.message))
    } finally {
      CONN.liberar()
    }
  } else { 
    let usrSess= {
      nomeUsr: req.session.nomeUsr,
      Usr: req.session.usuario}
  res.render('pages/not-found.ejs', { ...usrSess, ...NOAUTH});
  } 
}
export const getCamVi = async(req, res) => {
  if (req.session.loggedin) {
    const anoMes = req.params.anoMes;
    const ano = anoMes.substr(0, 4); //ou slice(0,4)
    const mes = anoMes.substr(4, 6);
    try {
      const data = await CONN.query(sql.GetCamVi, [mes, ano])
      
      if (data.length === 0) {
        res.send(new Error('Nenhum dado encontrado!'));
      }else{
        const a = JSON.stringify(data);
        res.send(a);
      }
    }catch(error){
      res.send(new Error('Erro na consulta do Banco. ' + error.message))
    } finally {
      CONN.liberar()
    }
  } else { 
    let usrSess= {
      nomeUsr: req.session.nomeUsr,
      Usr: req.session.usuario}
  res.render('pages/not-found.ejs', { ...usrSess, ...NOAUTH});
  } 
}
export const getCliVi = async(req, res) => {
  if (req.session.loggedin) {
    const anoMes = req.params.anoMes;
    const ano = anoMes.substr(0, 4); //ou slice(0,4)
    const mes = anoMes.substr(4, 6);
    try {
      const data = await CONN.query(sql.GetCliVi, [mes, ano])
      
      if (data.length === 0) {
        res.send(new Error('Nenhum dado encontrado!'));
      }else{
        const a = JSON.stringify(data);
        res.send(a);
      }
    }catch(error){
      res.send(new Error('Erro na consulta do Banco. ' + error.message))
    } finally {
      CONN.liberar()
    }
  } else { 
    let usrSess= {
      nomeUsr: req.session.nomeUsr,
      Usr: req.session.usuario}
  res.render('pages/not-found.ejs', { ...usrSess, ...NOAUTH});
  } 
}
export const getSDias = async(req, res) => {
  if (req.session.loggedin) {
    const anoMes = req.params.anoMes;
    const ano = anoMes.substr(0, 4); //ou slice(0,4)
    const mes = anoMes.substr(4, 6);
    try {
      const data = await CONN.query(sql.GetSDias, [mes, ano])
      
      if (data.length === 0) {
        res.send(new Error('Nenhum dado encontrado!'));
      }else{
        const a = JSON.stringify(data);
        res.send(a);
      }
    }catch(error){
      res.send(new Error('Erro na consulta do Banco. ' + error.message))
    } finally {
      CONN.liberar()
    }
  } else { 
    let usrSess= {
      nomeUsr: req.session.nomeUsr,
      Usr: req.session.usuario}
  res.render('pages/not-found.ejs', { ...usrSess, ...NOAUTH});
  } 
}
export const getSFutura = async(req, res) => {
  if (req.session.loggedin) {
    try {
      const data = await CONN.query(sql.GetSFutura)
      
      if (data.length === 0) {
        res.send(new Error('Nenhum dado encontrado!'));
      }else{
        const a = JSON.stringify(data);
        res.send(a);
      }
    }catch(error){
      res.send(new Error('Erro na consulta do Banco. ' + error.message))
    } finally {
      CONN.liberar()
    }
  } else { 
    let usrSess= {
      nomeUsr: req.session.nomeUsr,
      Usr: req.session.usuario}
  res.render('pages/not-found.ejs', { ...usrSess, ...NOAUTH});
  } 
}
export const getEMes = async(req, res) => {
  if (req.session.loggedin) {
    const anoMes = req.params.anoMes;
    const ano = anoMes.substr(0, 4); //ou slice(0,4)
    const mes = anoMes.substr(4, 6);
    try {
      const data = await CONN.query(sql.GetEMes, [mes, ano])
      
      if (data.length === 0) {
        res.send(new Error('Nenhum dado encontrado!'));
      }else{
        const a = JSON.stringify(data);
        res.send(a);
      }
    }catch(error){
      res.send(new Error('Erro na consulta do Banco. ' + error.message))
    } finally {
      CONN.liberar()
    }
  } else { 
    let usrSess= {
      nomeUsr: req.session.nomeUsr,
      Usr: req.session.usuario}
  res.render('pages/not-found.ejs', { ...usrSess, ...NOAUTH});
  } 
}
export const getEDias = async(req, res) => {
  if (req.session.loggedin) {
    const anoMes = req.params.anoMes;
    const ano = anoMes.substr(0, 4); //ou slice(0,4)
    const mes = anoMes.substr(4, 6);
    try {
      const data = await CONN.query(sql.GetEDias, [mes, ano])
      
      if (data.length === 0) {
        res.send(new Error('Nenhum dado encontrado!'));
      }else{
        const a = JSON.stringify(data);
        res.send(a);
      }
    }catch(error){
      res.send(new Error('Erro na consulta do Banco. ' + error.message))
    } finally {
      CONN.liberar()
    }
  } else { 
    let usrSess= {
      nomeUsr: req.session.nomeUsr,
      Usr: req.session.usuario}
  res.render('pages/not-found.ejs', { ...usrSess, ...NOAUTH});
  } 
}
export const getEFutura = async(req, res) => {
  if (req.session.loggedin) {
    try {
      const data = await CONN.query(sql.GetEFutura)
    
      if (data.length === 0) {
        res.send(new Error('Nenhum dado encontrado!'));
      }else{
        const a = JSON.stringify(data);
        res.send(a);
      }
    }catch(error){
      res.send(new Error('Erro na consulta do Banco. ' + error.message))
    } finally {
      CONN.liberar()
    }
  } else { 
    let usrSess= {
      nomeUsr: req.session.nomeUsr,
      Usr: req.session.usuario}
  res.render('pages/not-found.ejs', { ...usrSess, ...NOAUTH});
  } 
}

//----------------------BALANÇO GERAL ANUAL


/* SELECT DISTINCT MONTH(E.data) AS mes,
(SELECT COUNT(X.id) from tb_entrada AS X WHERE 
 YEAR(E.data)= YEAR(X.data) AND MONTH(E.data)= MONTH(X.data)) AS Entradas,
(SELECT sum(total) from tb_entrada AS X WHERE 
 YEAR(E.data)=  YEAR(X.data) AND MONTH(E.data)= MONTH(X.data)) AS TotalE,
(SELECT COUNT(X.saida_id) FROM tb_saida AS X WHERE 
 YEAR(E.data)=  YEAR(X.data) AND MONTH(E.data)= MONTH(X.data)) AS Saidas,
IFNULL((SELECT sum(total) FROM tb_saida AS X WHERE 
 YEAR(E.data)=  YEAR(X.data) AND MONTH(E.data)= MONTH(X.data)),0) AS TotalS
FROM tb_entrada AS E 
WHERE  YEAR(E.data)= 2022
UNION ALL
SELECT DISTINCT MONTH(S.data) AS Mes,
	0 AS Entradas,
    0 AS TotalE,
(SELECT COUNT(X.saida_id) from tb_saida AS X WHERE 
 YEAR(S.data)= YEAR(X.data)&& MONTH(S.data)= MONTH(X.data)) AS Saidas,
(SELECT sum(total) from tb_saida AS X WHERE 
 YEAR(S.data)= YEAR(X.data)&& MONTH(S.data)= MONTH(X.data)) AS TotalS
FROM tb_saida AS S WHERE  YEAR(S.data)= 2022  && 
MONTH(S.data) NOT IN(SELECT DISTINCT MONTH(E.data)FROM tb_entrada AS E  WHERE YEAR(E.data)= YEAR(S.data))
ORDER BY Mes; */