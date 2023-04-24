import bcrypt from 'bcrypt';
import {UserDAO, Usuario} from '../Models/usuario/UserDAO.js';
import { NOAUTH } from './alertas/alertas.js';
import {criarImagemInicial} from './gerais/imageProfile.js'
import * as al from './alertas/alertasUser.js';
//----------------------------------------------------------CRUD
//----------------------------SAVE
export const set = async(req,res)=>{
    let usrSess= {
        nomeUsr: req.session.nomeUsr,
        Usr: req.session.usuario}
    if(req.session.loggedin && req.session.usuario.classe =="admin"){
        const {nome, email, senha,confirmacaoSenha, classe} = req.body;
        let foto = '';
        if(req.file && req.file.filename){
            foto = req.file.filename;
        }
        if(confirmacaoSenha ===senha){
            try{
                const usuario = new Usuario(null, nome, email, senha, classe, foto);
                const userDAO = new UserDAO()
                await userDAO.save(usuario)
                res.render('pages/usuario/userCreate.ejs',{...usrSess, ...al.UsrSetSuccess});
            }catch(err) {
                console.error(err);
                res.render('pages/usuario/userCreate.ejs',{...usrSess, ...al.UsrSetError});
            }
        } else { 
            res.render('pages/usuario/userCreate.ejs',{...usrSess, ...al.SenhaCreateError});
        }
    } else { 
        res.render('pages/not-found.ejs',{...usrSess, ...NOAUTH});
    }
}
//-----------------------UPDATE
export const update = async (req,res)=>{
    let usrSess= {
        nomeUsr: req.session.nomeUsr,
        Usr: req.session.usuario}
    if(req.session.loggedin && req.session.usuario.classe =="admin"){
        const {id,nome,email,classe} = req.body;
        const usuario = new Usuario(id,nome,email,null, classe, null, null)
        try{
            const userDAO = new UserDAO()
            await userDAO.save(usuario)
            res.render('pages/usuario/userCreate.ejs',{...usrSess, ...al.UpdateSuccess(id)});
        }catch(err) {
            console.error(err);
            res.render('pages/usuario/userCreate.ejs',{...usrSess, ...al.UpdateError(id)});
        }
    } else { 
        res.render('pages/not-found.ejs',{...usrSess, ...NOAUTH});
    }
}
//------update senha e foto && req.session.usuario.email === email    && bcrypt.compareSync(senha, user.senha)
export const tsdua = async (req,res)=>{
    let usrSess= {
        nomeUsr: req.session.nomeUsr,
        Usr: req.session.usuario
    }
        const email = req.params.email;
    if(req.session.loggedin  && req.session.usuario.classe =="admin"){
        const {senhaAdmin, novaSenha} = req.body;
        const userDAO = new UserDAO()
        let id;
        try{
            const user = await userDAO.getByEmail(email)
            id = user.id
            if(user && bcrypt.compareSync(senhaAdmin, req.session.usuario.senha)){
                user.senha = novaSenha;
                await userDAO.trocarSenha(user)
                const usu = await userDAO.getById(user.id)
                res.render('pages/usuario/userEdit.ejs',{...usrSess,usu:usu, ...al.SenhaSuccess(id)});
            }else{
                res.render('pages/usuario/userCreate.ejs',{...usrSess, ...al.SenhaIncorreta(id)});
            }
        }catch(err) {
            console.error(err);
            res.render('pages/usuario/userCreate.ejs',{...usrSess, ...al.SenhaError(id)});
        }
    } else { 
        res.render('pages/not-found.ejs',{...usrSess, ...NOAUTH});
    }
}
export const tsduc = async (req,res)=>{
    let usrSess= {
        nomeUsr: req.session.nomeUsr,
        Usr: req.session.usuario
    }
        const email = req.params.email;
    if(req.session.loggedin  && req.session.usuario.email == email){
        const {senha, novaSenha} = req.body;
        const userDAO = new UserDAO()
        let id;
        try{
            const user = await userDAO.getByEmail(email)
            id = user.id
            if(user && bcrypt.compareSync(senha, req.session.usuario.senha)){
                user.senha = novaSenha;
                await userDAO.trocarSenha(user)
                res.render('pages/usuario/userConfig.ejs',{...usrSess, ...al.SenhaSuccess(id)});
            }else{
                res.render('pages/usuario/userConfig.ejs',{...usrSess, ...al.SenhaIncorreta(id)});
            }
        }catch(err) {
            console.error(err);
            res.render('pages/usuario/userConfig.ejs',{...usrSess, ...al.SenhaError(id)});
        }
    } else { 
        res.render('pages/not-found.ejs',{...usrSess, ...NOAUTH});
    }
}
export const trocarFoto = async (req,res)=>{
    let usrSess= {
        nomeUsr: req.session.nomeUsr,
        Usr: req.session.usuario
    }
    const id = req.params.id
    if(req.session.loggedin){
        const foto = req.file.filename;
        console.log(foto)
        console.log(id)
        const userDAO = new UserDAO()
        try{
            const usuario = await userDAO.getById(id)
            usuario.foto = foto;
            console.log(usuario)
            
            await userDAO.trocarFoto(usuario);
            console.log('foto atualizada com sucesso')
            res.render('pages/usuario/userEdit.ejs',{...usrSess, ...al.UsrFotoSuccess(id), usu:usuario});
        }catch(err) {
            console.error(err);
            res.render('pages/not-found.ejs',{...usrSess, ...al.UsrFotoError(id)});
        }
    } else { 
        res.render('pages/not-found.ejs',{...usrSess, ...NOAUTH});
    }
}
//----------------DELETE
export const del = async(req, res) => {
    let usrSess= {
        nomeUsr: req.session.nomeUsr,
        Usr: req.session.usuario}
    if(req.session.loggedin && req.session.usuario.classe =="admin"){
        const id = req.params.id;
        try{
            const userDAO = new UserDAO()
            await userDAO.delete(id)
            res.render('pages/usuario/usuario.ejs',{...usrSess, ...al.UsrDelSuccess});
        }catch(err) {
            console.error(err);
            res.render('pages/usuario/usuario.ejs',{...usrSess, ...al.UsrDelError});
        }
    } else { 
        res.render('pages/not-found.ejs',{...usrSess, ...NOAUTH});
    }
}
//ROTAS PARA JSON DE TODOS OS USUÁRIOS  

export const getAll = async (req, res)=> {
    if(req.session.loggedin && req.session.usuario.classe =="admin"){
        const userDAO = new UserDAO();
        try {
            const rows = await userDAO.getAll();
            if (rows.length === 0) {
                res.json(rows);
            }else{
                const users = rows.map(rows => {
                const { id, nome, email, classe, foto, lastLogin } = rows;
                //criando verificacao de img um diretorio para salvar as imagens
                let novaFoto  
                if(foto ==null ){
                  novaFoto = criarImagemInicial(nome);
                }else{
                    novaFoto = foto
                }
                 //setando em User e omitindo senha
                return new Usuario(id, nome, email, null, classe, novaFoto, lastLogin);
                })
                res.json(users)
            }
        }catch(error){
            res.json({message: `Problema de consulta no banco, erro: ${error}`})
            }
    }else { 
        let usrSess= {
            nomeUsr: req.session.nomeUsr,
            Usr: req.session.usuario}
        res.render('pages/not-found.ejs', { ...usrSess, ...NOAUTH});
    }
}
  //ROTA PARA JSON USUARIO EXPECÍFICO POR ID
export const getById = async (req, res) => {
    if(req.session.loggedin && req.session.usuario.classe =="admin"){ 
        const id = req.params.id;
        const userDAO = new UserDAO();
        try {
            const data = await userDAO.getById(id)
            if (data.length === 0) {
                res.json(data);
            }else{
                let novaFoto  
                if(data.foto == null ){
                novaFoto = criarImagemInicial(data.nome);
                }else{
                    novaFoto = data.foto
                }
                //setando em User e omitindo senha
                const user = new Usuario(data.id, data.nome, data.email, null, data.classe, novaFoto, data.lastLogin);
                res.json(user);
            }    
        }catch(err){
            res.json({message:`${err}`})
        }
    } else { 
        let usrSess= {
            nomeUsr: req.session.nomeUsr,
            Usr: req.session.usuario}
        res.render('pages/not-found.ejs', { ...usrSess, ...NOAUTH});
    }   
}
  //ROTA PARA JSON USUARIO EXPECÍFICO POR EMAIL
export const getByEmail = async (req, res) => {
    if(req.session.loggedin){ 
        const email = req.params.email;
        const userDAO = new UserDAO();
        try{
            const data = await userDAO.getByEmail(email)
            if (data.length === 0) {
                err = new Error('O email do usuário precisa ser válido!')
                res.json({message: `Problema de consulta no banco,\n ${err}`});
            }else{
                let novaFoto  
                if(data.foto == null){
                    novaFoto = '/public/img/uploads/none.jpg';
                }else{
                    novaFoto = data.foto
                }
                //setando em User e omitindo senha
                const user = new Usuario(data.id, data.nome, data.email, data.senha, data.classe, novaFoto, null);
                res.json(user);
            } 
        }catch(err){
            res.json({message: `Problema de consulta no banco. ${err}`})
        }
    } else { 
        let usrSess= {
            nomeUsr: req.session.nomeUsr,
            Usr: req.session.usuario}
        res.render('pages/not-found.ejs', { ...usrSess, ...NOAUTH});
    }   
}
