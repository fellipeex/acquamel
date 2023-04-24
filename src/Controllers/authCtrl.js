import bcrypt from 'bcrypt';
import UserDAO from '../Models/usuario/UserDAO.js';
import { strDateYM, strUTC } from './relogio/dataHora.js';
import * as al from './alertas/alertas.js';
//-----------------------------------------------------1 auth 
export const auth = async (req, res) =>{
  //cria variaveis a partir do body
  const email = req.body.email;
  const senha = req.body.senha;
  // Verificar se o usuário excedeu o número máximo de tentativas de login falhas
  if (req.session.loginAttempts >= 6) {
    res.render('pages/login.ejs',al.BLOCKBAN);
    return;
  }
  //caso tenha email e senha
  if(email && senha){
    try {
      const userDAO = new UserDAO();
      // chama o método getByEmail para obter o usuário correspondente ao email fornecido  
      const user = await userDAO.getByEmail(email)
      //comparando senha
      if(user.senha && bcrypt.compareSync(senha, user.senha)){
        const d = new Date();

        //validação e atualização de último Login
        try {
          await userDAO.lastLogin(user);
        //console classico com os dados de login
          console.log("\nSessão iniciada!"+
                    "\nNome: " + user.nome+
                    "\nData: " + strUTC(d)+
                    "\nClasse: " + user.classe);
        } catch (error) {
          console.error(error);
          req.session.loginAttempts++;
          res.render('pages/login.ejs',al.ERROBD);
        }

        //caso o processo seja concluído seta as variáveis de sessão
        req.session.loginAttempts = 0;
        req.session.anoMes = strDateYM(d);
        req.session.loggedin = true;
        req.session.usuario = user;
        req.session.nomeUsr = user.getPnome();
        res.render('pages/login.ejs',al.LOGINSUCESS(user.getPnome()));
      }else{
        //caso a senha esteja incorreta
        req.session.loginAttempts++;
        res.render('pages/login.ejs',al.ERROLOGIN);
      }
    }catch (err) {
      console.log(err);
      //caso o usuário esteja incorreto
      if (err.message === 'Usuário não encontrado') {
        req.session.loginAttempts++;
        res.render('pages/login.ejs',al.ERROLOGIN);
      } else {
        //caso o problema seja no banco de dados
        req.session.loginAttempts++;
        res.render('pages/login.ejs', al.ERROBD);
      }
    }
  } 
}