const conn = require('../Config/database/db');

//----------------------------------------------------------ENTRADA-----------------------

//--------------GETS JSON ALL ENTRADAS 
exports.getAll = async (req, res)=> {
  if(req.session.loggedin){
    conn.query('SELECT * FROM tb_saida;', (error, results) => {
      if (error) {
        throw error;
      } else {
        data = JSON.stringify(results);
         res.send(data);
      }
    })
  }else{
    res.redirect('/');
  }
}
//-----------GET JSON ENTRADA EXPECÍFICO
exports.get = (req, res) => {
  if(req.session.loggedin){  
    const id = req.params.id;
    conn.query('SELECT * FROM tb_saida WHERE saida_id=?', [id], (error, results) => {
      if (error) {
        throw error;
      } else {
        data = JSON.stringify(results);
        res.send(data);
      }
    })
  }else{
    res.redirect('/');
  }
}
//-----------GET JSON TOTAL SAIDA
exports.getTotal = (req, res) => {
  if(req.session.loggedin){ 
    conn.query("SELECT (SELECT SUM(total)  FROM tb_saida) AS 'SAIDA'", (error, results) => {
      if (error) {
        throw error;
      } else {
        data = JSON.stringify(results);
        res.send(data);
      }
    })
  }else{
    res.redirect('/');
  }
}
//----------------------------------------------------------CRUD

//----------------------------SAVE
exports.set = async (req,res)=>{
  if(req.session.loggedin){
    const nomeSaida = req.body.nomeSaida;
    const categoriaSaida = req.body.categoriaSaida;
    const dataSaida = req.body.dataSaida;
    const obsSaida = req.body.obsSaida;
    let vlr;
    if(req.body.valorSaida <=0){
      vlr = req.body.valorSaida;
    }else{
      vlr = (-req.body.valorSaida)
    }
    const valorSaida = vlr;
    conn.query('INSERT INTO tb_saida SET ?', {saida_nome:nomeSaida, saida_categoria:categoriaSaida,total:valorSaida, data:dataSaida, saida_obs:obsSaida}, (error, results) =>{
      if(error){
        console.log(error);
        res.render('pages/saida/saidaCreate.ejs',{
          nomeUsr: req.session.name,
          classeUsr: req.session.classe,
          alert:true,
          aTitle:'ERRO - Saída não criado',
          aText:'Não foi possível concluir criação de Saída com êxito!',
          aIcon:'error',
          scb: false,
          timer: 2000,
          rota:'/saidas'
        });
      }else { 
        res.render('pages/saida/saidaCreate.ejs',{
          nomeUsr: req.session.name,
          classeUsr: req.session.classe,
          alert:true,
          aTitle:'Saída Criada',
          aText:'Sucesso na criação de Saída!',
          aIcon:'success',
          scb: false,
          timer: 2000,
          rota:'/saidas'
        });
      }
    })
  }else{
    res.redirect('/');
  }
}
//-----------------------UPDATE
exports.update = async (req,res)=>{
  if(req.session.loggedin){
    const id = req.body.id;
    const nomeSaida = req.body.nomeSaida;
    const categoriaSaida = req.body.categoriaSaida;
    const dataSaida = req.body.dataSaida;
    const obsSaida = req.body.obsSaida;
    let vlr;
    if(req.body.valorSaida <=0){
      vlr = req.body.valorSaida;
    }else{
      vlr = (-req.body.valorSaida)
    }
    const valorSaida = vlr;
    conn.query('UPDATE tb_saida SET ? WHERE saida_id = ?', [{saida_nome:nomeSaida, saida_categoria:categoriaSaida,total:valorSaida, data:dataSaida, saida_obs:obsSaida}, id], (error, results) =>{
      if(error){
        console.log(error);
        res.render('pages/saida/saidaEdit.ejs',{
          id:id,
          nomeUsr: req.session.name,
          classeUsr: req.session.classe,
          alert:true,
          aTitle:'ERRO - Atualização não realizada',
          aText:'Atualização de Saída não foi concluída com êxito!',
          aIcon:'error',
          scb: false,
          timer: 2000,
          rota:'/saidas'
        });
      }else { 
        res.render('pages/saida/saidaEdit.ejs',{
          id:id,
          nomeUsr: req.session.name,
          classeUsr: req.session.classe,
          alert:true,
          aTitle:'Saída atualizado',
          aText:'Sucesso na atualização de Saída!',
          aIcon:'success',
          scb: false,
          timer: 2000,
          rota:'/saidas'
        });
      }
    })
  } else{
    res.redirect('/');
  }
}
//----------------DELETE
exports.delete =  (req, res) => {
  if(req.session.loggedin && req.session.classe){
    const id = req.params.id;
    conn.query('DELETE FROM tb_saida WHERE saida_id=?', [id], (error, results) => {
      if (error) {
        console.log(error);
          res.render('pages/saida/saida.ejs',{
            nomeUsr: req.session.name,
            classeUsr: req.session.classe,
            alert:true,
            aTitle:'ERRO - Saída não deletada',
            aText:'Não foi possível apagar Saída com êxito!',
            aIcon:'error',
            scb: false,
            timer: 2000,
            rota:'/saidas'
          });
      } else { 
        res.render('pages/saida/saida.ejs',{
          nomeUsr: req.session.name,
          classeUsr: req.session.classe,
          alert:true,
          aTitle:'Saída Deletada',
          aText:'Saída deletada com sucesso!',
          aIcon:'success',
          scb: false,
          timer: 2000,
          rota:'/saidas'
        });
      }
    })
  }else { 
    res.render('pages/saida/saida.ejs',{
        nomeUsr: req.session.name,
        classeUsr: req.session.classe,
        alert:true,
        aTitle:'Você não tem Permissão',
        aText:'Usuário sem permissão para o solicitar acesso ao recurso. Contate um administrador',
        aIcon:'error',
        scb: false,
        timer: 3000,
        rota:'/saidas'
    });
  }
}