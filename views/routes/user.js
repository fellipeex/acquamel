const Axios = require('axios')

//-----------------------------------------------------USUÁRIOS  
exports.page = (req, res) => {
  if(req.session.loggedin && req.session.classe){
  res.render('pages/usuario/usuario.ejs',{
      nomeUsr: req.session.name,
      classeUsr: req.session.classe
    });
  }else { 
    res.render('pages/index.ejs',{
        nomeUsr: req.session.name,
        classeUsr: req.session.classe,
        alert:true,
        aTitle:'Você não tem Permissão',
        aText:'Usuário sem permissão para o solicitar acesso ao recurso',
        aIcon:'error',
        scb: false,
        timer: 2000,
        rota:'/'
    });
  }
}
exports.pageCriar = (req, res) => {
  if(req.session.loggedin && req.session.classe){
    res.render('pages/usuario/userCreate.ejs',{
        nomeUsr: req.session.name,
        classeUsr: req.session.classe
    });
  }else { 
    res.render('pages/index.ejs',{
        nomeUsr: req.session.name,
        classeUsr: req.session.classe,
        alert:true,
        aTitle:'Você não tem Permissão',
        aText:'Usuário sem permissão para o solicitar acesso ao recurso',
        aIcon:'error',
        scb: false,
        timer: 2000,
        rota:'/'
    });
  }
}
exports.pageInfos = async (req, res) => {
  if(req.session.loggedin && req.session.classe){
    const id = req.params.id;
    /* axios.defaults.headers.common =
    {'Content-Type': 'application/json'}
    axios.defaults.headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }; */
    Axios({
      method: 'get', // ou 'get', 'put', 'delete', etc.
      url: 'http://localhost:5050/getUsr/'+id,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
    const usuario = response.data;
    console.log(usuario)
    // Se não for possível transformar a resposta em um JSON, use a resposta original 
    // armazenar o usuário retornado pela API em uma variável
      res.render('pages/usuario/userInfo.ejs',{
        usu:usuario,
        id:id,
        nomeUsr: req.session.name,
        classeUsr: req.session.classe
      })
    });
  } else{ 
    res.render('pages/index.ejs',{
      nomeUsr: req.session.name,
      classeUsr: req.session.classe,
      alert:true,
      aTitle:'Você não tem Permissão',
      aText:'Usuário sem permissão para o solicitar acesso ao recurso',
      aIcon:'error',
      scb: false,
      timer: 2000,
      rota:'/'
    });
}}
exports.pageEditar = (req, res) => {
  if(req.session.loggedin && req.session.classe){
  const id = req.params.id;
    res.render('pages/usuario/userEdit.ejs',{
        id:id,
        nomeUsr: req.session.name,
        classeUsr: req.session.classe
    });
  }else { 
    res.render('pages/index.ejs',{
        nomeUsr: req.session.name,
        classeUsr: req.session.classe,
        alert:true,
        aTitle:'Você não tem Permissão',
        aText:'Usuário sem permissão para o solicitar acesso ao recurso',
        aIcon:'error',
        scb: false,
        timer: 2000,
        rota:'/'
    });
  }
}