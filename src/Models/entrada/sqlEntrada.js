 //--------1 DAO
//sets
export const Update = 'UPDATE tb_entrada SET nome=?, idCli=?, idCam=?, idVend=?, idMoto=?, valor=?, qtd=?, total=?, obs=?, dataE=? WHERE id=?';
export const Insert = 'INSERT INTO tb_entrada (nome, idCli, idCam, idVend, idMoto, valor, qtd, total, obs, dataE) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
export const Delete = 'DELETE FROM tb_entrada WHERE id=?;'
//gets
export const GetAll = "SELECT E.id, E.nome, Cli.nome AS cliente, Cam.placa AS caminhao, V.nome AS vendedor, M.nome AS motorista, E.valor, E.qtd, E.total, E.obs, DATE_FORMAT(E.dataE, '%d/%m/%Y %H:%i') AS dataE FROM tb_entrada AS E INNER JOIN tb_cliente AS Cli ON Cli.id = E.idCli INNER JOIN tb_caminhao AS Cam ON Cam.id = E.idCam INNER JOIN tb_funcionario AS V ON  E.idVend = V.id INNER JOIN tb_funcionario AS M ON E.idMoto = M.id;"
export const GetById = "SELECT id, nome, idCam, idCli, idVend, idMoto, valor, qtd, total, obs, DATE_FORMAT(dataE, '%d/%m/%Y %H:%i') AS dataE FROM tb_entrada WHERE id=?"
export const GetByY = "SELECT * FROM tb_entrada AS E WHERE YEAR(E.dataE)= ?"
export const GetByYM = "SELECT id, nome, idCam, idCli, idVend, idMoto, valor, qtd, total, obs, DATE_FORMAT(dataE, '%d/%m/%Y %H:%i') AS dataE FROM tb_entrada WHERE YEAR(dataE)= ? && MONTH(dataE) = ?"

//-----------2 API SQL
export const sqlETotalAnual = "SELECT DISTINCT YEAR(E.dataE) AS ANO,(SELECT COUNT(X.id) from tb_entrada AS X WHERE YEAR(E.dataE)= YEAR(X.dataE) ) AS Entradas,(SELECT sum(total) from tb_entrada AS X WHERE YEAR(E.dataE)= YEAR(X.dataE)) AS TotalE FROM tb_entrada AS E;"