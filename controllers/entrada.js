const conn = require('../database/db');

//----------------------------------------------------------ENTRADA-----------------------
//--------------GETS JSON ALL ENTRADAS 
exports.getAll = async (req, res) => {
  if (req.session.loggedin && (req.session.classe == 1 || req.session.classe == 0)) {
    conn.query('SELECT * FROM tb_pedido;', (error, results) => {
      if (error) {
        throw error;
      } else {
        data = JSON.stringify(results);
        res.send(data);
      }
    })
  } else {
    res.redirect('/');
  }
}
//-----------GET JSON ENTRADA EXPECÍFICO
exports.getE = (req, res) => {
  if (req.session.loggedin && (req.session.classe == 1 || req.session.classe == 0)) {
    const id = req.params.id;
    conn.query('SELECT * FROM tb_pedido WHERE ped_id=?', [id], (error, results) => {
      if (error) {
        throw error;
      } else {
        data = JSON.stringify(results);
        res.send(data);
      }

    })
  } else {
    res.redirect('/');
  }
}
//-----------GET JSON TOTAL ENTRADA
exports.getTotal = (req, res) => {
  if (req.session.loggedin && (req.session.classe == 1 || req.session.classe == 0)) {
    conn.query("SELECT (SELECT SUM(total)  FROM tb_pedido) AS ENTRADA,", (error, results) => {
      if (error) {
        throw error;
      } else {
        data = JSON.stringify(results);
        res.send(data);
      }
    })
  } else {
    res.redirect('/');
  }
}
//-----------GET JSON ENTRADA DATA EXPECÍFICA
exports.getEMes = (req, res) => {
  if (req.session.loggedin && (req.session.classe == 1 || req.session.classe == 0)) {
    const anoMes = req.params.anoMes;
    const ano = anoMes.substr(0, 4); //ou slice(0,4)
    const mes = anoMes.substr(4, 6);
    conn.query('SELECT * FROM tb_pedido WHERE MONTH(data) = ? && YEAR(data)= ?', [mes, ano], (error, results) => {
      if (error) {
        throw error;
      } else {
        data = JSON.stringify(results);
        res.send(data);
      }

    })
  } else {
    res.redirect('/');
  }
}
//-----------------------GET ENTRADA ANUAL
exports.getEAno = (req, res) => {
  if (req.session.loggedin) {
    const ano = req.params.ano;
    conn.query( "SELECT MONTH(data) AS Mes, " +
                "SUM(DISTINCT total) AS Valor " +
                "DATE_FORMAT(data,'%m/%Y') AS 'Data', COUNT(*) AS Entradas " +
                "FROM tb_pedido WHERE YEAR(data)= ? " +
                "GROUP BY Mes ORDER BY Mes;", [ano], (error, results) => {
        if (error) {
          throw error;
        } else {
          data = JSON.stringify(results);
          res.send(data);
        }
      })
  } else {
    res.redirect('/');
  }
}

//----------------------------------------------------------CRUD

//----------------------------SAVE
exports.set = async (req, res) => {
  if (req.session.loggedin && (req.session.classe == 1 || req.session.classe == 0)) {
    const nomeEnt = req.body.nomeEnt;
    const camEnt = req.body.camEnt;
    const cliEnt = req.body.cliEnt;
    const vendEnt = req.body.vendEnt;
    const motoEnt = req.body.motoEnt;
    const valorEnt = req.body.valorEnt;
    const qtdEnt = req.body.qtdEnt;
    const totalEnt = req.body.totalEnt;
    const dataEnt = req.body.dataEnt;
    const obsEnt = req.body.obsEnt;
    conn.query('INSERT INTO tb_pedido SET ?', 
    {ped_nome: nomeEnt, cam_id: camEnt, cli_id: cliEnt, vendedor_id: vendEnt,
      motorista_id: motoEnt, ped_valor: valorEnt, ped_qtd: qtdEnt, total: totalEnt,
        data: dataEnt, ped_obs: obsEnt }, (error, results) => {
      if (error) {
        console.log(error);
        res.render('pages/entrada/entradaCreate.ejs', {
          nomeUsr: req.session.name,
          classeUsr: req.session.classe,
          alert: true,
          aTitle: 'ERRO - Entrada não criado',
          aText: 'Não foi possível concluir criação de entrada com êxito!',
          aIcon: 'error',
          scb: false,
          timer: 2000,
          rota: '/entradas'
        });
      } else {
        res.render('pages/entrada/entradaCreate.ejs', {
          nomeUsr: req.session.name,
          classeUsr: req.session.classe,
          alert: true,
          aTitle: 'Entrada Criada',
          aText: 'Sucesso na criação de entrada!',
          aIcon: 'success',
          scb: false,
          timer: 2000,
          rota: '/entradas'
        });
      }
    })
  } else {
    res.redirect('/');
  }
}
//-----------------------UPDATE
exports.update = async (req, res) => {
  if (req.session.loggedin && (req.session.classe == 1 || req.session.classe == 0)) {
    const id = req.body.id
    const nomeEnt = req.body.nomeEnt;
    const camEnt = req.body.camEnt;
    const cliEnt = req.body.cliEnt;
    const vendEnt = req.body.vendEnt;
    const motoEnt = req.body.motoEnt;
    const valorEnt = req.body.valorEnt;
    const qtd = req.body.qtdEnt;
    const total = qtd * valorEnt;
    const dataEnt = req.body.dataEnt;
    const obsEnt = req.body.obsEnt;
    conn.query('UPDATE tb_pedido SET ? WHERE ped_id = ?', 
      [{ped_nome: nomeEnt, cam_id: camEnt, cli_id: cliEnt,
        vendedor_id: vendEnt, motorista_id: motoEnt, ped_valor: valorEnt,
        ped_qtd: qtd, total: total, data: dataEnt, ped_obs: obsEnt}, id], (error, results) => {
      if (error) {
        console.log(error);
        res.render('pages/entrada/entradaEdit.ejs', {
          id: id,
          nomeUsr: req.session.name,
          classeUsr: req.session.classe,
          alert: true,
          aTitle: 'ERRO - Atualização não realizada',
          aText: 'Atualização de Entrada não foi concluída com êxito!',
          aIcon: 'error',
          scb: false,
          timer: 2000,
          rota: '/entradas'
        });
      } else {
        res.render('pages/entrada/entradaEdit.ejs', {
          id: id,
          nomeUsr: req.session.name,
          classeUsr: req.session.classe,
          alert: true,
          aTitle: 'Entrada atualizado',
          aText: 'Sucesso na atualização!',
          aIcon: 'success',
          scb: false,
          timer: 2000,
          rota: '/entradas'
        });
      }
    })
  } else {
    res.redirect('/');
  }
}
//----------------DELETE
exports.delete = (req, res) => {
  if (req.session.loggedin && (req.session.classe == 1 || req.session.classe == 0)) {
    const id = req.params.id;
    conn.query('DELETE FROM tb_pedido WHERE ped_id=?', [id], (error, results) => {
      if (error) {
        console.log(error);
        res.render('pages/entrada/entrada.ejs', {
          nomeUsr: req.session.name,
          classeUsr: req.session.classe,
          alert: true,
          aTitle: 'ERRO - Entrada não deletada',
          aText: 'Não foi possível apagar entrada com êxito!',
          aIcon: 'error',
          scb: false,
          timer: 2000,
          rota: '/entradas'
        });
      } else {
        res.render('pages/entrada/entrada.ejs', {
          nomeUsr: req.session.name,
          classeUsr: req.session.classe,
          alert: true,
          aTitle: 'Entrada Deletada',
          aText: 'Entrada deletada com sucesso!',
          aIcon: 'success',
          scb: false,
          timer: 2000,
          rota: '/entradas'
        });
      }
    })
  } else {
    res.redirect('/');
  }
}
