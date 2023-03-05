const conn = require('../Config/database/db');

//----------------------------------------------------------CLIENTES-----------------------
//--------------GETS JSON ALL CLIENTES 
exports.getAll = async (req, res)=> {
  if(req.session.loggedin){
    conn.query('SELECT * FROM tb_cliente;', (error, results) => {
      if (error) {
        throw error;
      } else {
        data = JSON.stringify(results);
         res.send(data);
      }
    })
  }else{
    res.redirect('/');
  }
}
//-----------GET JSON CLIENTES EXPECÍFICO
exports.get = (req, res) => {
  if(req.session.loggedin){  
    const id = req.params.id;
    conn.query('SELECT * FROM tb_cliente WHERE cli_id=?', [id], (error, results) => {
      if (error) {
        throw error;
      } else {
        data = JSON.stringify(results);
        res.send(data);
      }
      
    })
  }else{
    res.redirect('/');
  }
}
//----------------------------------------------------------CRUD

//----------------------------SAVE
exports.set = async (req,res)=>{
  if(req.session.loggedin){
    const nomeCli = req.body.nomeCli;
    const cpfCli = req.body.cpfCli;
    const cnpjCli = req.body.cnpjCli;
    const endCli = req.body.endCli;
    const bairroCli = req.body.bairroCli;
    const cepCli = req.body.cepCli;
    const telefoneCli = req.body.telefoneCli;
    const celularCli = req.body.celularCli;
    const apelidoCli = req.body.apelidoCli;
    conn.query('INSERT INTO tb_cliente SET ?', {cli_nome:nomeCli , cli_cpf:cpfCli, cli_cnpj:cnpjCli, cli_endereco:endCli, cli_bairro:bairroCli, cli_cep:cepCli, cli_telefone:telefoneCli, cli_celular:celularCli, cli_apelido:apelidoCli}, (error, results) =>{
        if(error){
          console.log(error);
          res.render('pages/cliente/cliCreate.ejs',{
              nomeUsr: req.session.name,
              classeUsr: req.session.classe,
              alert:true,
              aTitle:'ERRO - Cliente não criado',
              aText:'Não foi concluir criação de Cliente com êxito!',
              aIcon:'error',
              scb: false,
              timer: 2000,
              rota:'/clientes'
          });
      }else { 
          res.render('pages/cliente/cliCreate.ejs',{
              nomeUsr: req.session.name,
              classeUsr: req.session.classe,
              alert:true,
              aTitle:'Cliente Criado',
              aText:'Sucesso na criação de Cliente!',
              aIcon:'success',
              scb: false,
              timer: 2000,
              rota:'/clientes'
          });
      }
    })
  }else{
    res.redirect('/');
  }
}
//-----------------------UPDATE
exports.update = async (req,res)=>{
  if(req.session.loggedin){
    const id = req.body.id;
    const nomeCli = req.body.nomeCli;
    const cpfCli = req.body.cpfCli;
    const cnpjCli = req.body.cnpjCli;
    const endCli = req.body.endCli;
    const bairroCli = req.body.bairroCli;
    const cepCli = req.body.cepCli;
    const telefoneCli = req.body.telefoneCli;
    const celularCli = req.body.celularCli;
    const apelidoCli = req.body.apelidoCli;
    conn.query('UPDATE tb_cliente SET ? WHERE cli_id = ?', [{cli_nome:nomeCli , cli_cpf:cpfCli, cli_cnpj:cnpjCli, cli_endereco:endCli, cli_bairro:bairroCli,
         cli_cep:cepCli, cli_telefone:telefoneCli, cli_celular:celularCli, cli_apelido:apelidoCli}, id], (error, results) =>{
        if(error){
        console.log(error);
        res.render('pages/cliente/cliEdit.ejs',{
            id:id,
            nomeUsr: req.session.name,
            classeUsr: req.session.classe,
            alert:true,
            aTitle:'ERRO - Atualização não realizada',
            aText:'Atualização de Cliente não foi concluída com êxito!',
            aIcon:'error',
            scb: false,
            timer: 2000,
            rota:'/clientes'
        });
      }else { 
        res.render('pages/cliente/cliEdit.ejs',{
            id:id,
            nomeUsr: req.session.name,
            classeUsr: req.session.classe,
            alert:true,
            aTitle:'Cliente atualizado',
            aText:'Sucesso na atualização de Cliente!',
            aIcon:'success',
            scb: false,
            timer: 2000,
            rota:'/clientes'
        });
      }
    })
  } else{
    res.redirect('/');
  }
}
//----------------DELETE
exports.delete =  (req, res) => {
  if(req.session.loggedin && req.session.classe){
    const id = req.params.id;
    conn.query('DELETE FROM tb_cliente WHERE cli_id=?', [id], (error, results) => {
      if (error) {
        console.log(error);
          res.render('pages/cliente/cliente.ejs',{
            nomeUsr: req.session.name,
            classeUsr: req.session.classe,
            alert:true,
            aTitle:'ERRO - Cliente não deletado',
            aText:'Não foi possível apagar Cliente com êxito!',
            aIcon:'error',
            scb: false,
            timer: 2000,
            rota:'/clientes'
          });
      } else { 
        res.render('pages/cliente/cliente.ejs',{
          nomeUsr: req.session.name,
          classeUsr: req.session.classe,
          alert:true,
          aTitle:'Cliente Deletado',
          aText:'Cliente deletado com sucesso!',
          aIcon:'success',
          scb: false,
          timer: 2000,
          rota:'/clientes'
        });
      }
    })
  }else { 
    res.render('pages/cliente/cliente.ejs',{
        nomeUsr: req.session.name,
        classeUsr: req.session.classe,
        alert:true,
        aTitle:'Você não tem Permissão',
        aText:'Usuário sem permissão para o solicitar acesso ao recurso. Contate um administrador',
        aIcon:'error',
        scb: false,
        timer: 3000,
        rota:'/clientes'
    });
  }
}