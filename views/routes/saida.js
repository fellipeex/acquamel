//----------------------------------------------------------SAÍDA------------------
//-----------------------------------------------------ROTAS PARA PÁGINAS  
exports.page = (req, res) => {
    if(req.session.loggedin ){
    res.render('pages/saida/saida.ejs',{
        nomeUsr: req.session.name,
        classeUsr: req.session.classe
      });
    }else{
      res.redirect('/');
    }
}
exports.pageCriar = (req, res) => {
    if(req.session.loggedin ){
      res.render('pages/saida/saidaCreate.ejs',{
          nomeUsr: req.session.name,
          classeUsr: req.session.classe
        });
      }else{
        res.redirect('/');
      }
}
exports.pageInfos = (req, res) => {
    if(req.session.loggedin ){
      const id = req.params.id;
      res.render('pages/saida/saidaInfo.ejs',{
          id:id,
          nomeUsr: req.session.name,
          classeUsr: req.session.classe
        });
      }else{
        res.redirect('/');
    }
}
exports.pageEditar = (req, res) => {
  if(req.session.loggedin ){
    const id = req.params.id;
    res.render('pages/saida/saidaEdit.ejs',{
      id:id,
      nomeUsr: req.session.name,
      classeUsr: req.session.classe
    });
  }else{
    res.redirect('/');
  }
}