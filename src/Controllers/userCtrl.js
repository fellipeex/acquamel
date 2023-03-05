const conn = require('../Config/database/db');
const bcrypt = require('bcrypt');
const Usuario = require('./Models/Usuario');
//ROTAS PARA JSON DE TODOS OS USUÁRIOS  

exports.getAll = async (req, res)=> {
    if(req.session.loggedin && req.session.classe){
        conn.query('SELECT * FROM tb_usuario', async (error, results) => {
            if (error) {
            throw error;
            } else {
            data = JSON.stringify(results);
            res.send(data);
            }
        })
    }else { 
        res.render('pages/index.ejs',{
            nomeUsr: req.session.name,
            classeUsr: req.session.classe,
            alert:true,
            aTitle:'Você não tem Permissão',
            aText:'Usuário sem permissão para o solicitar acesso ao recurso',
            aIcon:'error',
            scb: false,
            timer: 3000,
            rota:'/'
        });
    }
}
  //ROTA PARA JSON USUARIO EXPECÍFICO
exports.get = async (req, res) => {
    if(req.session.loggedin && req.session.classe){  
        const id = req.params.id;
        conn.query('SELECT * FROM tb_usuario WHERE u_id=?', [id], (error, results) => {
            if (error) {
                console.error(error);
                res.status(500).json({ message: 'Server error' });
                return;
            }if (results.length === 0) {
                res.status(404).json({ message: 'User not found' });
            } else {
                // Retorna os dados do usuário em formato JSON
                res.setHeader('Content-Type', 'application/json');
                usuario = results[0];
                res.redirect(`/infosUsuario/${id}?usuario=${JSON.stringify(usuario)}`);
            }
        });
    } else { 
        res.render('pages/index.ejs',{
            nomeUsr: req.session.name,
            classeUsr: req.session.classe,
            alert:true,
            aTitle:'Você não tem Permissão',
            aText:'Usuário sem permissão para o solicitar acesso ao recurso',
            aIcon:'error',
            scb: false,
            timer: 3000,
            rota:'/'
        });
    }   
}
//----------------------------------------------------------CRUD
//----------------------------SAVE
exports.set = async(req,res)=>{
    if(req.session.loggedin && req.session.classe){
        const {nome, email, senha, classe} = req.body;
        const foto = req.file.filename;
        const usuario = new Usuario (nome, email, senha, classe, foto);
        usuario.salvar((err) => {
            if (err) {
                console.error(err);
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
            } else {
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
        });
    } else { 
        res.render('pages/index.ejs',{
            nomeUsr: req.session.name,
            classeUsr: req.session.classe,
            alert:true,
            aTitle:'Você não tem Permissão',
            aText:'Usuário sem permissão para o solicitar acesso ao recurso',
            aIcon:'error',
            scb: false,
            timer: 3000,
            rota:'/'
        });
    }
}
        
 /*        conn.query('INSERT INTO tb_usuario SET ?', {u_nome:user , u_email:email, u_senha:passHash, u_class:classe}, async (error, results) =>{
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
    }else { 
        res.render('pages/index.ejs',{
            nomeUsr: req.session.name,
            classeUsr: req.session.classe,
            alert:true,
            aTitle:'Você não tem Permissão',
            aText:'Usuário sem permissão para o solicitar acesso ao recurso',
            aIcon:'error',
            scb: false,
            timer: 3000,
            rota:'/'
        });
    }
} */
//-----------------------UPDATE
exports.update = async (req,res)=>{
    if(req.session.loggedin && req.session.classe){
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
    }else { 
        res.render('pages/index.ejs',{
            nomeUsr: req.session.name,
            classeUsr: req.session.classe,
            alert:true,
            aTitle:'Você não tem Permissão',
            aText:'Usuário sem permissão para o solicitar acesso ao recurso',
            aIcon:'error',
            scb: false,
            timer: 3000,
            rota:'/'
        });
    }
}
//----------------DELETE
exports.delete =  (req, res) => {
    if(req.session.loggedin && req.session.classe){
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
    }else { 
        res.render('pages/index.ejs',{
            nomeUsr: req.session.name,
            classeUsr: req.session.classe,
            alert:true,
            aTitle:'Você não tem Permissão',
            aText:'Usuário sem permissão para o solicitar acesso ao recurso',
            aIcon:'error',
            scb: false,
            timer: 3000,
            rota:'/'
        });
    }    
  }