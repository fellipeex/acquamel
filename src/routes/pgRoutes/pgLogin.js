import { strUTC } from "../../Controllers/relogio/dataHora.js"
import CONN from "../../Config/database/conn.js";

export const login = (req, res) => {
    if(req.session.loggedin){
      res.redirect('/')
    }else{
        res.render('pages/login.ejs');
    }
}

export const logout = (req, res) => {
    if(req.session.loggedin){
        let d = strUTC(new Date())
        console.log("\nFim da sessão do usuário!"+
                    "\nID: " + req.session.usuario.id +" Nome: " + req.session.usuario.nome +
                    "\nData: "+ d )
        req.session.destroy(()=>{
            CONN.liberar();
            res.redirect('/');
        })
    }
}
