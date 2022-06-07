const conn = require('../database/db');

//----------------------------------------------------------CAMINHÃO-----------------------

//--------------GETS JSON ALL CAMIHÕES 
exports.getAll = async (req, res)=> {
  if(req.session.loggedin && (req.session.classe == 1||req.session.classe == 0)){
    conn.query('SELECT * FROM tb_caminhao;', (error, results) => {
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
//-----------GET JSON CAMINHÃO EXPECÍFICO
exports.get = (req, res) => {
  if(req.session.loggedin && (req.session.classe == 1||req.session.classe == 0)){  
    const id = req.params.id;
    conn.query('SELECT * FROM tb_caminhao WHERE cam_id=?', [id], (error, results) => {
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
  if(req.session.loggedin && (req.session.classe == 1||req.session.classe == 0)){
    const nomeCam = req.body.nomeCam;
    const placaCam = req.body.placaCam;
    const tamanhoCam = req.body.tamanhoCam;
    const anoCam = req.body.anoCam;
    const renavam = req.body.renavam;
    conn.query('INSERT INTO tb_caminhao SET ?', {cam_nome:nomeCam, cam_placa:placaCam, cam_tamanho:tamanhoCam, cam_ano:anoCam, cam_renavam:renavam}, (error, results) =>{
      if(error){
        console.log(error);
        res.render('pages/caminhao/camCreate.ejs',{
          nomeUsr: req.session.name,
          classeUsr: req.session.classe,
          alert:true,
          aTitle:'ERRO - Caminhão não criado',
          aText:'Não foi possível concluir a criação de Caminhão com êxito!',
          aIcon:'error',
          scb: false,
          timer: 2000,
          rota:'/caminhoes'
        });
      }else { 
        res.render('pages/caminhao/camCreate.ejs',{
          nomeUsr: req.session.name,
          classeUsr: req.session.classe,
          alert:true,
          aTitle:'Caminhão Criado',
          aText:'Sucesso na criação de Caminhão!',
          aIcon:'success',
          scb: false,
          timer: 2000,
          rota:'/caminhoes'
        });
      }
    })
  }else{
      res.redirect('/');
  }
}
//-----------------------UPDATE
exports.update = async (req,res)=>{
  if(req.session.loggedin && (req.session.classe == 1||req.session.classe == 0)){
    const id = req.body.id
    const nomeCam = req.body.nomeCam;
    const placaCam = req.body.placaCam;
    const tamanhoCam = req.body.tamanhoCam;
    const anoCam = req.body.anoCam;
    const renavam = req.body.renavam;
    conn.query('UPDATE tb_caminhao SET ? WHERE cam_id = ?', [{cam_nome:nomeCam, cam_placa:placaCam, cam_tamanho:tamanhoCam, cam_ano:anoCam, cam_renavam:renavam}, id], (error, results) =>{
      if(error){
        console.log(error);
        res.render('pages/caminhao/camEdit.ejs',{
            id:id,
            nomeUsr: req.session.name,
            classeUsr: req.session.classe,
            alert:true,
            aTitle:'ERRO - Atualização não realizada',
            aText:'Atualização de Caminhão não foi concluída com êxito!',
            aIcon:'error',
            scb: false,
            timer: 2000,
            rota:'/caminhoes'
        });
      }else { 
        res.render('pages/caminhao/camEdit.ejs',{
            id:id,
            nomeUsr: req.session.name,
            classeUsr: req.session.classe,
            alert:true,
            aTitle:'Caminhão atualizado',
            aText:'Sucesso na atualização de Caminhão!',
            aIcon:'success',
            scb: false,
            timer: 2000,
            rota:'/caminhoes'
        });
      }
    })
  } else{
    res.redirect('/');
  }
}
//----------------DELETE
exports.delete =  (req, res) => {
  if(req.session.loggedin && (req.session.classe == 1||req.session.classe == 0)){
    const id = req.params.id;
    conn.query('DELETE FROM tb_caminhao WHERE cam_id=?', [id], (error, results) => {
      if (error) {
        console.log(error);
          res.render('pages/caminhao/caminhao.ejs',{
            nomeUsr: req.session.name,
            classeUsr: req.session.classe,
            alert:true,
            aTitle:'ERRO - Caminhão não deletada',
            aText:'Não foi possível apagar Caminhão com êxito!',
            aIcon:'error',
            scb: false,
            timer: 2000,
            rota:'/caminhoes'
          });
      } else { 
        res.render('pages/caminhao/caminhao.ejs',{
          nomeUsr: req.session.name,
          classeUsr: req.session.classe,
          alert:true,
          aTitle:'Caminhão Deletada',
          aText:'Caminhão deletada com sucesso!',
          aIcon:'success',
          scb: false,
          timer: 2000,
          rota:'/caminhoes'
        });
      }
    })
  }else{
    res.redirect('/');
  }
}