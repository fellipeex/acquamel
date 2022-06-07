//----------------------------------------------------------ENTRADA-----------------------
exports.page = async (req, res) => { 
   
  if (req.session.loggedin && (req.session.classe == 1 || req.session.classe == 0)) {
    ;
    res.render('pages/entrada/entrada.ejs', {
      nomeUsr: req.session.name,
      classeUsr: req.session.classe
    });
  } else {
    res.redirect('/');
  }
}
exports.pageCriar = (req, res) => {
  if (req.session.loggedin && (req.session.classe == 1 || req.session.classe == 0)) {
    res.render('pages/entrada/entradaCreate.ejs', {
      nomeUsr: req.session.name,
      classeUsr: req.session.classe
    });
  } else {
    res.redirect('/');
  }
}
exports.pageInfos = (req, res) => {
  if (req.session.loggedin && (req.session.classe == 1 || req.session.classe == 0)) {
    const id = req.params.id;
    res.render('pages/entrada/entradaInfo.ejs', {
      id: id,
      nomeUsr: req.session.name,
      classeUsr: req.session.classe
    });
  } else {
    res.redirect('/');
  }
}
exports.pageEditar = (req, res) => {
  if (req.session.loggedin && (req.session.classe == 1 || req.session.classe == 0)) {
    const id = req.params.id;
    res.render('pages/entrada/entradaEdit.ejs', {
      id: id,
      nomeUsr: req.session.name,
      classeUsr: req.session.classe
    });
  } else {
    res.redirect('/');
  }
}
