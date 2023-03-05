const conn = require('../Config/database/db');
const bcrypt = require('bcrypt');

//-----------------------------------------------------2 LOGIN 
exports.auth = async (req, res)=>{
  const email = req.body.email;
  const senha = req.body.senha;

  // Verificar se o usuário excedeu o número máximo de tentativas de login falhas
  if (req.session.loginAttempts >= 5) {
    res.render('pages/login.ejs',{
      alert:true,
      aTitle:'Conta Bloqueada',
      aText:'Sua conta foi bloqueada devido a muitas tentativas de login falhas. Por favor, tente novamente mais tarde.',
      aIcon:'error',
      scb: false,
      timer: 3000,
      rota:'/login'
    });
    return;
  }
  if(email && senha){
    conn.query('SELECT * FROM tb_usuario WHERE u_email = ?', [email], async (error, results)=>{
      if (error){
        console.log(error)
        res.render('pages/login.ejs',{
          alert:true,
          aTitle:'ERRO - Banco de dados',
          aText:'Problemas de com conexão com o banco de dados',
          aIcon:'error',
          scb: false,
          timer: 3000,
          rota:'/login'
        });  
      }
      else if(results.length == 0 || !(bcrypt.compareSync(senha, results[0].u_senha))){
        req.session.loginAttempts++;
        res.render('pages/login.ejs',{
          alert:true,
          aTitle:'Erro - Login',
          aText:'E-mail e/ou Senha incorretos',
          aIcon:'error',
          scb: false,
          timer: 3000,
          rota:'/login'
        });
      }else{
        let arrayNome = results[0].u_nome.split(" ");
        let timer = new Date();
        let d = new Date();
        let y = d.getFullYear();
        let m = d.getMonth() + 1;
        if(m<10){
          m = "0"+ m
        }
        if(results[0].u_class=="admin"){
          req.session.classe = true;
        }
        if(results[0].u_class=="comum"){
          req.session.classe = false;
        }

        //console classico com os dados de login
        console.log("Nome: " + results[0].u_nome +
                    "\nData: " + timer + 
                    "\nClasse: " + results[0].u_class) ;

        req.session.loginAttempts = 0;
        req.session.dataLogin = d;              
        req.session.anoMes = ""+y+m;
        req.session.loggedin = true;
        req.session.name = arrayNome[0].toUpperCase();
        res.render('pages/login.ejs',{
          alert:true,
          aTitle:'Bem vindo ' + arrayNome[0].toUpperCase(),
          aText:'Usuário autenticado com sucesso!',
          aIcon:'success',
          scb: false,
          timer: 3000,
          rota:'/'
        });
      }
    })
  }
};
  
  //--------------------------------------------------------3 LOGOUT-----------------------
exports.logout = (req, res) =>{
    req.session.destroy(()=>{
      res.redirect('/');
    })
};