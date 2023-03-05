//----------------------------------------------------------CLIENTES-----------------------
//-----------------------------------------------------ROTAS PARA PÁGINAS  
exports.page = (req, res) => {
  if(req.session.loggedin ){
    res.render('pages/cliente/cliente.ejs',{
      login: true,
      nomeUsr: req.session.name,
      classeUsr: req.session.classe
    });
  }else{
    res.redirect('/');
  }
}
exports.pageCriar = (req, res) => {
  if(req.session.loggedin ){
    res.render('pages/cliente/cliCreate.ejs',{
      login: true,
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
    res.render('pages/cliente/cliInfo.ejs',{
      id:id,
      login: true,
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
    res.render('pages/cliente/cliEdit.ejs',{
      id:id,
      nomeUsr: req.session.name,
      classeUsr: req.session.classe
    });
  }else{
    res.redirect('/');
  }
}