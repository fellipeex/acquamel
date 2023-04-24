import { NOAUTH, NOTFOUND } from "../../Controllers/alertas/alertas.js";
import CaminhaoDAO from "../../Models/caminhao/CaminhaoDAO.js";


//----------------------------------------------------------CAMINHÃO-----------------------

//-----------------------------------------------------ROTAS PARA PÁGINAS  
export const page = async (req, res) => {
  let usrSess = {
    nomeUsr: req.session.nomeUsr,
    Usr: req.session.usuario
  }
  if (req.session.loggedin) {
    res.render('pages/caminhao/caminhao.ejs', { ...usrSess });
  } else {
    res.render('pages/not-found.ejs', { ...usrSess, ...NOAUTH });
  }
}


export const pageCriar = async(req, res) => {
  let usrSess = {
    nomeUsr: req.session.nomeUsr,
    Usr: req.session.usuario
  }
  if (req.session.loggedin) {
    
      res.render('pages/caminhao/camCreate.ejs', {
        ...usrSess
      })
    
  } else {
    res.render('pages/not-found.ejs', { ...usrSess, ...NOAUTH });
  }
}

export const pageInfos = async(req, res) => {
  let usrSess = {
    nomeUsr: req.session.nomeUsr,
    Usr: req.session.usuario
  }
  if (req.session.loggedin) {
    const id = req.params.id;
    try {
      const camDAO = new CaminhaoDAO();
      const cam = await camDAO.getById(id)
      res.render('pages/caminhao/camInfo.ejs', {
        ...usrSess,
        cam:cam
      })
    } catch (err) {
      res.render('pages/not-found.ejs', { ...usrSess, ...NOTFOUND(err) })
    }
  } else {
    res.render('pages/not-found.ejs', { ...usrSess, ...NOAUTH });
  }
}

export const pageEditar = async(req, res) => {
  let usrSess = {
    nomeUsr: req.session.nomeUsr,
    Usr: req.session.usuario
  }
  if (req.session.loggedin) {
    const id = req.params.id;
    try {
      const camDAO = new CaminhaoDAO();
      const cam = await camDAO.getById(id)
      res.render('pages/caminhao/camEdit.ejs', {
        ...usrSess,
        cam:cam
      })
    } catch (err) {
      res.render('pages/not-found.ejs', { ...usrSess, ...NOTFOUND(err) })
    }
  } else {
    res.render('pages/not-found.ejs', { ...usrSess, ...NOAUTH });
  }
}