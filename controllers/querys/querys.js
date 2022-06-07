const conn = require('../../database/db');
//-------------------------------------------------------------------INDEX
//-----------GET JSON TOTAL ENTRADA e SAIDA
exports.getAllTotalGeral = (req, res) => {
  if (req.session.loggedin) {
    conn.query("SELECT(select SUM(total) FROM tb_pedido)AS Entrada," +
      "(SELECT SUM(total) FROM tb_saida)AS Saida;", (error, results) => {
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
exports.getTotalGeral = (req, res) => {
  if (req.session.loggedin) {
    const anoMes = req.params.anoMes;
    const ano = anoMes.substr(0, 4); //ou slice(0,4)
    const mes = anoMes.substr(4, 6);
    conn.query( "SELECT(select SUM(total) FROM tb_pedido "+
                "WHERE MONTH(data) = ? && YEAR(data)= ?)AS Entrada," +
                "(SELECT SUM(total) FROM tb_saida "+
                "WHERE MONTH(data) = ? && YEAR(data)= ?)AS Saida;", [mes, ano, mes, ano], (error, results) => {
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


/* (SELECT MONTH(P.data) AS 'Data',P.total AS Valor  FROM tb_pedido AS P WHERE YEAR(P.data)= 2022)  
UNION (SELECT MONTH(S.data)AS 'Data', S.total AS Valor FROM tb_saida AS S WHERE YEAR(S.data)= 2022); */

exports.getAllCategoriaSaida = (req, res) => {
  if (req.session.loggedin) {
    conn.query("(SELECT(saida_categoria) FROM tb_saida)AS Categoria," +
      "(SELECT SUM(total) FROM tb_saida)AS Valor;", (error, results) => {
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
exports.getCategoriaSaida = (req, res) => { 
  if (req.session.loggedin) {
    const anoMes = req.params.anoMes;
    const ano = anoMes.substr(0, 4); //ou slice(0,4)
    const mes = anoMes.substr(4, 6);
    conn.query( "SELECT saida_categoria AS Categoria, SUM(DISTINCT total) AS Valor," +
                "COUNT(*) as Qtd FROM tb_saida " +
                "WHERE MONTH(data) = ? && YEAR(data)= ? " +
                "GROUP BY Categoria ORDER BY Valor DESC;", [mes, ano], (error, results) => {
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
 exports.getViagens = (req, res) => {
  if (req.session.loggedin) {
    const anoMes = req.params.anoMes;
    const ano = anoMes.substr(0, 4); //ou slice(0,4)
    const mes = anoMes.substr(4, 6);
    conn.query( "SELECT P.ped_id AS Pedido, F.func_nome AS Motorista, C.cam_nome AS Caminhao " +
                "FROM tb_pedido AS P INNER JOIN  tb_funcionario AS F " +
                "INNER JOIN tb_caminhao AS C " +
                "ON F.func_id = P.motorista_id && C.cam_id = P.cam_id " +
                "WHERE MONTH(P.data) = ? && YEAR(P.data)= ? "+
                "GROUP BY Pedido ORDER BY Pedido  DESC;", [mes, ano], (error, results) => {
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
exports.getMotVi = (req, res) => {
  if (req.session.loggedin) {
    const anoMes = req.params.anoMes;
    const ano = anoMes.substr(0, 4); //ou slice(0,4)
    const mes = anoMes.substr(4, 6);
    conn.query("SELECT DISTINCT F.func_nome AS Motorista, COUNT(*) AS Viagens " +
                "FROM tb_funcionario AS F INNER JOIN tb_pedido AS P " +
                "ON F.func_id = P.motorista_id "+
                "WHERE MONTH(P.data) = ? && YEAR(P.data)= ? " +
                "GROUP BY Motorista ORDER BY Viagens DESC;", [mes, ano], (error, results) => {
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
exports.getCamVi = (req, res) => {
  if (req.session.loggedin) {
    const anoMes = req.params.anoMes;
    const ano = anoMes.substr(0, 4); //ou slice(0,4)
    const mes = anoMes.substr(4, 6);
    conn.query( "SELECT DISTINCT C.cam_nome AS Caminhao, C.cam_id AS ID, COUNT(*) AS Viagens " +
                "FROM tb_caminhao AS C INNER JOIN tb_pedido AS P " +
                "ON C.cam_id = P.cam_id " +
                "WHERE MONTH(P.data) = ? && YEAR(P.data)= ? " +
                "GROUP BY Caminhao ORDER BY Viagens DESC;", [mes, ano], (error, results) => {
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
exports.getCliVi = (req, res) => {
  if (req.session.loggedin) {
    const anoMes = req.params.anoMes;
    const ano = anoMes.substr(0, 4); //ou slice(0,4)
    const mes = anoMes.substr(4, 6);
    conn.query( "SELECT C.cli_nome AS Cliente," +
                "SUM(P.total) AS Valor, COUNT(*) AS Viagens " +
                "FROM tb_pedido AS P INNER JOIN tb_cliente AS C " +
                "ON P.cli_id = C.cli_id " +
                "WHERE MONTH(P.data) = ? && YEAR(P.data) = ? "+
                "GROUP BY Cliente ORDER BY Viagens DESC;", [mes, ano], (error, results) => {
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

exports.getDiasS = (req, res) => {
  if (req.session.loggedin) {
    const anoMes = req.params.anoMes;
    const ano = anoMes.substr(0, 4); //ou slice(0,4)
    const mes = anoMes.substr(4, 6);
    conn.query( "SELECT DAY(data) AS Dia, " +
                "DATE_FORMAT(data,'%d/%m/%Y') AS 'Data', " +
                "SUM(total) AS Valor," +
                "COUNT(*) AS Saidas " +
                "FROM tb_saida WHERE MONTH(data) = ? && YEAR(data)= ? " +
                "GROUP BY Dia ORDER BY Dia;", [mes, ano], (error, results) => {
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
exports.getFSaida = (req, res) => {
  if (req.session.loggedin) {
    conn.query("SELECT * FROM tb_saida WHERE data >= (SELECT DATE_ADD(CURDATE(),INTERVAL 1 DAY));",
       (error, results) => {
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
//----------------------ENTRADA
exports.getEMes = (req, res) => {
  if (req.session.loggedin) {
    const anoMes = req.params.anoMes;
    const ano = anoMes.substr(0, 4); //ou slice(0,4)
    const mes = anoMes.substr(4, 6);
    conn.query( "SELECT ped_id AS ID " +
                "SUM(total)AS Total," +
                "FROM tb_pedido "+
                "WHERE MONTH(data) = ? && YEAR(data)= ?", [mes, ano], (error, results) => {
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
exports.getEDias = (req, res) => {
  if (req.session.loggedin) {
    const anoMes = req.params.anoMes;
    const ano = anoMes.substr(0, 4); //ou slice(0,4)
    const mes = anoMes.substr(4, 6);
    conn.query( "SELECT DAY(data) AS Dia, " +
                "DATE_FORMAT(data,'%d/%m/%Y') AS 'Data', " +
                "SUM(P.total) AS Valor," +
                "COUNT(*) AS Entradas " +
                "FROM tb_pedido WHERE MONTH(data) = ? && YEAR(data)= ? " +
                "GROUP BY DIA ORDER BY DIA;", [mes, ano], (error, results) => {
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
exports.getFEnt = (req, res) => {
  if (req.session.loggedin) {
    conn.query("SELECT * FROM tb_pedido WHERE data >= (SELECT DATE_ADD(CURDATE(),INTERVAL 1 DAY));",
       (error, results) => {
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