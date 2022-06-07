const conn = require('../database/db');
const bcrypt = require('bcrypt');
//ROTAS PARA JSON DE TODOS OS USUÁRIOS  

exports.getAll = async (req, res)=> {
    if(req.session.loggedin && req.session.classe == 1){
        conn.query('SELECT * FROM tb_usuario', async (error, results) => {
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
  //ROTA PARA JSON USUARIO EXPECÍFICO
exports.get = (req, res) => {
    if(req.session.loggedin && req.session.classe == 1){  
      const id = req.params.id;
      conn.query('SELECT * FROM tb_usuario WHERE u_id=?', [id], (error, results) => {
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
    if(req.session.loggedin && req.session.classe == 1){
        const user = req.body.user;
        const email = req.body.email;
        const classe = req.body.classe;
        const senha = req.body.senha;
        const passHash = bcrypt.hashSync(senha, 8);
        
        conn.query('INSERT INTO tb_usuario SET ?', {u_nome:user , u_email:email, u_senha:passHash, u_class:classe}, async (error, results) =>{
            if(error){
                console.log(error);
                res.render('pages/usuario/userCreate.ejs',{
                    nomeUsr: req.session.name,
                    classeUsr: req.session.classe,
                    alert:true,
                    aTitle:'ERRO - Usuario não criado',
                    aText:'Criação de usuário não foi concluída com êxito!',
                    aIcon:'error',
                    scb: false,
                    timer: 2000,
                    rota:'/usuarios'
                });
            }else { 
                res.render('pages/usuario/userCreate.ejs',{
                    nomeUsr: req.session.name,
                    classeUsr: req.session.classe,
                    alert:true,
                    aTitle:'Usuário Criado',
                    aText:'Sucesso na criação do usuário!',
                    aIcon:'success',
                    scb: false,
                    timer: 2000,
                    rota:'/usuarios'
                });
            }
        })
    }else{
        res.render('pages/usuario/login.ejs',);
    }
}
//-----------------------UPDATE
exports.update = async (req,res)=>{
    if(req.session.loggedin && req.session.classe == 1){
        const id = req.body.id;
        const nome = req.body.nome;
        const email = req.body.email;
        const senha = req.body.senha;
        const classe = req.body.classe;
        const foto = req.body.foto;
        const passHash = bcrypt.hashSync(senha, 8)
        conn.query('UPDATE tb_usuario SET ? WHERE u_id = ?', [{u_nome:nome , u_email:email, u_senha:passHash, u_class:classe, u_foto:foto}, id], async (error, results) =>{
            if(error){
                console.log(error);
                res.render('pages/usuario/userEdit.ejs',{
                    id:id,
                    nomeUsr: req.session.name,
                    classeUsr: req.session.classe,
                    alert:true,
                    aTitle:'ERRO - Atualização não realizada',
                    aText:'Atualização de usuário não foi concluída com êxito!',
                    aIcon:'error',
                    scb: false,
                    timer: 2000,
                    rota:'/usuarios'
                });
            }else { 
                res.render('pages/usuario/userEdit.ejs',{
                    id:id,
                    nomeUsr: req.session.name,
                    classeUsr: req.session.classe,
                    alert:true,
                    aTitle:'Usuário atualizado',
                    aText:'Sucesso na atualização de Usuário!',
                    aIcon:'success',
                    scb: false,
                    timer: 2000,
                    rota:'/usuarios'
                });
            }
        })
    }else{
        res.redirect('/');
    }
}
//----------------DELETE
exports.delete =  (req, res) => {
    if(req.session.loggedin && req.session.classe == 1){
        const id = req.params.id;
        conn.query('DELETE FROM tb_usuario WHERE u_id=?', [id], (error, results) => {
        if (error) {
            console.log(error);
                res.render('pages/usuario/usuario.ejs',{
                    nomeUsr: req.session.name,
                    classeUsr: req.session.classe,
                    alert:true,
                    aTitle:'ERRO - Atualização não realizada',
                    aText:'Atualização de Usuário não foi concluída com êxito!',
                    aIcon:'error',
                    scb: false,
                    timer: 2000,
                    rota:'/usuarios'
                });
            }else { 
                res.render('pages/usuario/usuario.ejs',{
                    nomeUsr: req.session.name,
                    classeUsr: req.session.classe,
                    alert:true,
                    aTitle:'Usuário Deletado',
                    aText:'Usuário deletado com sucesso!',
                    aIcon:'success',
                    scb: false,
                    timer: 2000,
                    rota:'/usuarios'
                });
            }
        })
    }else{
        res.redirect('/');
    }    
  }