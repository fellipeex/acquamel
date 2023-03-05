const conn = require('../Config/database/db');

//----------------------------------------------------------FUNCIONARIOS-----------------------

//--------------GETS JSON ALL CAMIHÕES 

exports.getAll = async (req, res)=> {
  if(req.session.loggedin){
    conn.query('SELECT * FROM tb_funcionario;', (error, results) => {
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
//-----------GET JSON FUNCIONARIOS EXPECÍFICO
exports.get = (req, res) => {
  if(req.session.loggedin ){  
    const id = req.params.id;
    conn.query('SELECT * FROM tb_funcionario WHERE func_id=?', [id], (error, results) => {
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
    const nomeFunc = req.body.nomeFunc;
    const ctpsFunc = req.body.ctpsFunc;
    const rgFunc = req.body.rgFunc;
    const cpfFunc = req.body.cpfFunc;
    const endFunc = req.body.endFunc;
    const bairroFunc = req.body.bairroFunc;
    const cepFunc = req.body.cepFunc;
    const statusFunc = req.body.statusFunc;
    const salarioFunc = req.body.salarioFunc;
    const cargoFunc = req.body.cargoFunc;
    const entFunc = req.body.entFunc;
    const saidaFunc = req.body.saidaFunc;
    conn.query('INSERT INTO tb_funcionario SET ?', {func_nome:nomeFunc , func_ctps:ctpsFunc, func_rg:rgFunc, func_cpf:cpfFunc, func_endereco:endFunc,
         func_bairro:bairroFunc, func_cep:cepFunc, func_status:statusFunc, func_salario:salarioFunc, func_cargo:cargoFunc, func_entrada:entFunc, func_saida:saidaFunc}, (error, results) =>{
        if(error){
          console.log(error);
          res.render('pages/funcionario/funcCreate.ejs',{
              nomeUsr: req.session.name,
              classeUsr: req.session.classe,
              alert:true,
              aTitle:'ERRO - Funcionário não criado',
              aText:'Não foi possível concluir criação de Funcionário com êxito!',
              aIcon:'error',
              scb: false,
              timer: 2000,
              rota:'/funcionarios'
          });
      }else { 
          res.render('pages/funcionario/funcCreate.ejs',{
              nomeUsr: req.session.name,
              classeUsr: req.session.classe,
              alert:true,
              aTitle:'Funcionário Criado',
              aText:'Sucesso na criação de Funcionário!',
              aIcon:'success',
              scb: false,
              timer: 2000,
              rota:'/funcionarios'
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
    const nomeFunc = req.body.nomeFunc;
    const ctpsFunc = req.body.ctpsFunc;
    const rgFunc = req.body.rgFunc;
    const cpfFunc = req.body.cpfFunc;
    const endFunc = req.body.endFunc;
    const bairroFunc = req.body.bairroFunc;
    const cepFunc = req.body.cepFunc;
    const statusFunc = req.body.statusFunc;
    const salarioFunc = req.body.salarioFunc;
    const cargoFunc = req.body.cargoFunc;
    const entFunc = req.body.entFunc;
    const saidaFunc = req.body.saidaFunc;
    conn.query('UPDATE tb_funcionario SET ? WHERE func_id = ?', [{func_nome:nomeFunc , func_ctps:ctpsFunc, func_rg:rgFunc, func_cpf:cpfFunc, func_endereco:endFunc,
        func_bairro:bairroFunc, func_cep:cepFunc, func_status:statusFunc, func_salario:salarioFunc, func_cargo:cargoFunc, func_entrada:entFunc, func_saida:saidaFunc}, id], (error, results) =>{
        if(error){
        console.log(error);
        res.render('pages/funcionario/funcEdit.ejs',{
            id:id,
            nomeUsr: req.session.name,
            classeUsr: req.session.classe,
            alert:true,
            aTitle:'ERRO - Atualização não realizada',
            aText:'Atualização de Funcionário não foi concluída com êxito!',
            aIcon:'error',
            scb: false,
            timer: 2000,
            rota:'/funcionarios'
        });
      }else { 
        res.render('pages/funcionario/funcEdit.ejs',{
            id:id,
            nomeUsr: req.session.name,
            classeUsr: req.session.classe,
            alert:true,
            aTitle:'Funcionário atualizado',
            aText:'Sucesso na atualização de Funcionário!',
            aIcon:'success',
            scb: false,
            timer: 2000,
            rota:'/funcionarios'
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
    conn.query('DELETE FROM tb_funcionario WHERE func_id=?', [id], (error, results) => {
      if (error) {
        console.log(error);
          res.render('pages/funcionario/funcionario.ejs',{
            nomeUsr: req.session.name,
            classeUsr: req.session.classe,
            alert:true,
            aTitle:'ERRO - Funcionário não deletado',
            aText:'Não foi possível apagar Funcionário com êxito!',
            aIcon:'error',
            scb: false,
            timer: 2000,
            rota:'/funcionarios'
          });
      } else { 
        res.render('pages/funcionario/funcionario.ejs',{
          nomeUsr: req.session.name,
          classeUsr: req.session.classe,
          alert:true,
          aTitle:'Usuário Deletado',
          aText:'Usuário deletado com sucesso!',
          aIcon:'success',
          scb: false,
          timer: 2000,
          rota:'/funcionarios'
        });
      }
    })
  }else { 
    res.render('pages/funcionario/funcionario.ejs',{
        nomeUsr: req.session.name,
        classeUsr: req.session.classe,
        alert:true,
        aTitle:'Você não tem Permissão',
        aText:'Usuário sem permissão para o solicitar acesso ao recurso. Contate um administrador',
        aIcon:'error',
        scb: false,
        timer: 3000,
        rota:'/funcionarios'
    });
  }
}