//----------------------------------------------------------CAMINHÃO-----------------------

//-----------------------------------------------------ROTAS PARA PÁGINAS  
exports.page = (req, res) => {
  if(req.session.loggedin && (req.session.classe == 1||req.session.classe == 0)){
    res.render('pages/caminhao/caminhao.ejs',{
      nomeUsr: req.session.name,
      classeUsr: req.session.classe
    });
  }else{
    res.redirect('/');
  }
}
exports.pageCriar = (req, res) => {
  if(req.session.loggedin && (req.session.classe == 1||req.session.classe == 0)){
    res.render('pages/caminhao/camCreate.ejs',{
      nomeUsr: req.session.name,
      classeUsr: req.session.classe
    });
  }else{
    res.redirect('/');
  }
}
exports.pageInfos = (req, res) => {
  if(req.session.loggedin && (req.session.classe == 1||req.session.classe == 0)){
    const id = req.params.id;
    res.render('pages/caminhao/camInfo.ejs',{
      id:id,
      nomeUsr: req.session.name,
      classeUsr: req.session.classe
    });
  }else{
    res.redirect('/');
  }
}
exports.pageEditar = (req, res) => {
  if(req.session.loggedin && (req.session.classe == 1||req.session.classe == 0)){
    const id = req.params.id;
    res.render('pages/caminhao/camEdit.ejs',{
      id:id,
      nomeUsr: req.session.name,
      classeUsr: req.session.classe
    });
  }else{
    res.redirect('/');
  }
}