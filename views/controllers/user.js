//-----------------------------------------------------USUÁRIOS  
exports.page = (req, res) => {
    if(req.session.loggedin && req.session.classe == 1){
    res.render('pages/usuario/usuario.ejs',{
        nomeUsr: req.session.name,
        classeUsr: req.session.classe
      });
    }else{
      res.redirect('/');
    }
}
exports.pageCriar = (req, res) => {
    if(req.session.loggedin && req.session.classe == 1){
      res.render('pages/usuario/userCreate.ejs',{
          nomeUsr: req.session.name,
          classeUsr: req.session.classe
        });
      }else{
        res.redirect('/');
      }
}
exports.pageInfos = (req, res) => {
    if(req.session.loggedin && req.session.classe == 1){
      const id = req.params.id;
      res.render('pages/usuario/userInfo.ejs',{
          id:id,
          nomeUsr: req.session.name,
          classeUsr: req.session.classe
        });
      }else{
        res.redirect('/');
    }
}
exports.pageEditar = (req, res) => {
    if(req.session.loggedin && req.session.classe == 1){
    const id = req.params.id;
      res.render('pages/usuario/userEdit.ejs',{
          id:id,
          nomeUsr: req.session.name,
          classeUsr: req.session.classe
        });
      }else{
        res.redirect('/');
    }
}