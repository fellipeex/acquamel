
const express = require('express');
const router = express.Router();
const conn = require('./database/db');
router.get('/', (req, res) => {
  res.render('pages/index.ejs',);
});



//                   ----------------------------------USUÁRIOS-----------------------

//ROTAS PARA PÁGINAS  
router.get('/usuarios', (req, res) => {
      res.render('pages/usuarios.ejs',);
    }
  );

router.get('/novoUsuario', (req, res) => {
  res.render('pages/userCreate.ejs',);
});
router.get('/infosUsuario/:id', (req, res) => {
  const id = req.params.id;
  res.render('pages/infosUsuario.ejs',{id:id});
});
router.get('/editarUsuario', (req, res) => {
  res.render('pages/editarUsuario.ejs',);
});

router.get('/getUsuarios', (req, res) => {
  conn.query('SELECT * FROM tb_usuario', (error, results) => {
    if (error) {
      throw error;
    } else {
      data = JSON.stringify(results);
      res.send(data);
    }
  })
});

//ROTAS PARA GET USUARIO
router.get('/getUser/:id', (req, res) => {
  const id = req.params.id;
  conn.query('SELECT * FROM tb_usuario WHERE u_id=?', [id], (error, results) => {
    if (error) {
      throw error;
    } else {
      data = JSON.stringify(results);
      res.send(data);
    }
  })
});

//ROTA DE ELIMINAÇÃO
router.get('/userDel/:id', (req, res) => {
  const id = req.params.id;
  conn.query('DELETE FROM tb_usuario WHERE u_id=?', [id], (error, results) => {
    if (error) {
      throw error;
    } else {
      res.redirect('/usuarios');
    }
  })
});

//                   ----------------------------------ENTRADA-----------------------
router.get('/entrada', (req, res) => {
  conn.query('SELECT * FROM tb_pedido', (error, results) => {
    if (error) {
      throw error;
    } else {
      res.render('pages/entrada.ejs', { results: results });
    }
  })
});

//RODA PARA CRIAR REGISTROS  
router.get('/entCreate', (req, res) => {
  res.render('pages/entradaCreate.ejs');
});

router.get('/getEntradas', (req, res) => {
  conn.query('SELECT * FROM tb_pedido', (error, results) => {
    if (error) {
      throw error;
    } else {
      data = JSON.stringify(results);
      res.send(data);
    }
  })
});
//RODA PARA VER USUARIO COMPLETO
router.get('/entGet/:id', (req, res) => {
  const id = req.params.id;
  conn.query('SELECT * FROM tb_pedido WHERE ped_id=?', [id], (error, results) => {
    if (error) {
      throw error;
    } else {
      res.render('pages/entradaGet.ejs', { tb_pedido: results[0] });
    }
  })
});
//RODA PARA EDITAR REGISTROS
router.get('/entEdit/:id', (req, res) => {
  const id = req.params.id;
  conn.query('SELECT * FROM tb_pedido WHERE ped_id=?;', [id], (error, results) => {
    if (error) {
      throw error;
    } else {
      res.render('pages/entradaEdit.ejs', { tb_pedido: results[0] });
    }
  })
});

//ROTA DE ELIMINAÇÃO
router.get('/entDel:id', (req, res) => {
  const id = req.params.id;
  conn.query('DELETE tb_pedido WHERE ped_id=?;', [id], (error, results) => {
    if (error) {
      throw error;
    } else {
      res.redirect('/entrada');;
    }
  })
});
//                   ----------------------------------SAÍDA-----------------------
router.get('/saida', (req, res) => {
  conn.query('SELECT * FROM tb_saida', (error, results) => {
    if (error) {
      throw error;
    } else {
      res.render('pages/saida.ejs', { results: results });
    }
  })
});

//RODA PARA CRIAR REGISTROS  
router.get('/saidaCreate', (req, res) => {
  res.render('pages/saidaCreate.ejs');
});

//RODA PARA VER USUARIO COMPLETO
router.get('/saidaGet/:id', (req, res) => {
  const id = req.params.id;
  conn.query('SELECT * FROM tb_saida WHERE saida_id=?', [id], (error, results) => {
    if (error) {
      throw error;
    } else {
      res.render('pages/saidaGet.ejs', { tb_saida: results[0] });
    }
  })
});
//RODA PARA EDITAR REGISTROS
router.get('/saidaEdit/:id', (req, res) => {
  const id = req.params.id;
  conn.query('SELECT * FROM tb_saida WHERE saida_id=?', [id], (error, results) => {
    if (error) {
      throw error;
    } else {
      res.render('pages/saidaEdit.ejs', { tb_saida: results[0] });
    }
  })
});

//ROTA DE ELIMINAÇÃO
router.get('/saidaDel/:id', (req, res) => {
  const id = req.params.id;
  conn.query('DELETE FROM tb_saida WHERE saida_id=?', [id], (error, results) => {
    if (error) {
      throw error;
    } else {
      res.redirect('/saida');
    }
  })
});

//                   ----------------------------------CAMINHÕES-----------------------
router.get('/caminhoes', (req, res) => {
  conn.query('SELECT * FROM tb_caminhao', (error, results) => {
    if (error) {
      throw error;
    } else {
      res.render('pages/caminhoes.ejs', { results: results });
    }
  })
});

//RODA PARA CRIAR REGISTROS  
router.get('/camCreate', (req, res) => {
  res.render('pages/camCreate.ejs');
});

//RODA PARA VER USUARIO COMPLETO
router.get('/camGet/:id', (req, res) => {
  const id = req.params.id;
  conn.query('SELECT * FROM tb_caminhao WHERE cam_id=?', [id], (error, results) => {
    if (error) {
      throw error;
    } else {
      res.render('pages/camGet.ejs', { tb_caminhao: results[0] });
    }
  })
});
//RODA PARA EDITAR REGISTROS
router.get('/camEdit/:id', (req, res) => {
  const id = req.params.id;
  conn.query('SELECT * FROM tb_caminhao WHERE cam_id=?', [id], (error, results) => {
    if (error) {
      throw error;
    } else {
      res.render('pages/camEdit.ejs', { tb_caminhao: results[0] });
    }
  })
});

//ROTA DE ELIMINAÇÃO
router.get('/camDel/:id', (req, res) => {
  const id = req.params.id;
  conn.query('DELETE FROM tb_caminhao WHERE u_id=?', [id], (error, results) => {
    if (error) {
      throw error;
    } else {
      res.redirect('/caminhoes');
    }
  })
});

//                   ----------------------------------FUNCIONARIOS-----------------------
router.get('/funcionarios', (req, res) => {
  conn.query('SELECT * FROM tb_funcionario', (error, results) => {
    if (error) {
      throw error;
    } else {
      res.render('pages/funcionarios.ejs', { results: results });
    }
  })
});

//RODA PARA CRIAR REGISTROS  
router.get('/funcCreate', (req, res) => {
  res.render('pages/funcCreate.ejs');
});

//RODA PARA VER USUARIO COMPLETO
router.get('/funcGet/:id', (req, res) => {
  const id = req.params.id;
  conn.query('SELECT * FROM tb_funcionario WHERE func_id=?', [id], (error, results) => {
    if (error) {
      throw error;
    } else {
      res.render('pages/funcGet.ejs', { tb_funcionario: results[0] });
    }
  })
});
//RODA PARA EDITAR REGISTROS
router.get('/funcEdit/:id', (req, res) => {
  const id = req.params.id;
  conn.query('SELECT * FROM tb_funcionario WHERE func_id=?', [id], (error, results) => {
    if (error) {
      throw error;
    } else {
      res.render('pages/funcEdit.ejs', { tb_funcionario: results[0] });
    }
  })
});

//ROTA DE ELIMINAÇÃO
router.get('/funcDel/:id', (req, res) => {
  const id = req.params.id;
  conn.query('DELETE FROM tb_funcionario WHERE func_id=?', [id], (error, results) => {
    if (error) {
      throw error;
    } else {
      res.redirect('/funcionarios');
    }
  })
});
//                   ----------------------------------CLIENTES-----------------------
router.get('/clientes', (req, res) => {
  conn.query('SELECT * FROM tb_cliente', (error, results) => {
    if (error) {
      throw error;
    } else {
      res.render('pages/clientes.ejs', { results: results });
    }
  })
});

//RODA PARA CRIAR REGISTROS  
router.get('/cliCreate', (req, res) => {
  res.render('pages/cliCreate.ejs');
});

//RODA PARA VER USUARIO COMPLETO
router.get('/cliGet/:id', (req, res) => {
  const id = req.params.id;
  conn.query('SELECT * FROM tb_cliente WHERE cli_id=?', [id], (error, results) => {
    if (error) {
      throw error;
    } else {
      res.render('pages/cliGet.ejs', { tb_cliente: results[0] });
    }
  })
});
//RODA PARA EDITAR REGISTROS
router.get('/cliEdit/:id', (req, res) => {
  const id = req.params.id;
  conn.query('SELECT * FROM tb_cliente WHERE cli_id=?', [id], (error, results) => {
    if (error) {
      throw error;
    } else {
      res.render('pages/cliEdit.ejs', { tb_cliente: results[0] });
    }
  })
});

//ROTA DE ELIMINAÇÃO
router.get('/cliDel/:id', (req, res) => {
  const id = req.params.id;
  conn.query('DELETE FROM tb_cliente WHERE cli_id=?', [id], (error, results) => {
    if (error) {
      throw error;
    } else {
      res.redirect('/clientes');
    }
  })
});



const crud = require('./controllers/crud.js');
router.post('/saveUsr', crud.saveUsr);
router.post('/updateUsr', crud.updateUsr);
router.post('/saveEnt', crud.saveEnt);
router.post('/updateEnt', crud.updateEnt);
router.post('/saveSaida', crud.saveSaida);
router.post('/updateSaida', crud.updateSaida);
router.post('/saveCam', crud.saveCam);
router.post('/updateCam', crud.updateCam);
router.post('/saveFunc', crud.saveFunc);
router.post('/updateFunc', crud.updateFunc);
router.post('/saveCli', crud.saveCli);
router.post('/updateCli', crud.updateCli);
module.exports = router;