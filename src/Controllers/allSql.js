export const GetAllTotalGeral = "SELECT(select SUM(total) FROM tb_entrada)AS Entrada,(SELECT SUM(valor) FROM tb_saida)AS Saida;"
export const GetTotalGeral = "SELECT(select SUM(total) FROM tb_entrada WHERE MONTH(dataE) = ? && YEAR(dataE)= ?)AS Entrada,(SELECT SUM(valor) FROM tb_saida WHERE MONTH(data) = ? && YEAR(data)= ?)AS Saida,(SELECT SUM(qtd) FROM tb_entrada WHERE MONTH(dataE) = ? && YEAR(dataE)= ?)AS Agua"
export const GetTotalGeralAnual = "SELECT meses.mes, IFNULL(entradas.entradas, 0) AS entradas, IFNULL(entradas.totalE, 0) AS totalE, IFNULL(saidas.saidas, 0) AS saidas, IFNULL(saidas.totalS, 0) AS totalS, IFNULL(qtd_entrada.qtd, 0) AS qtd FROM (SELECT DISTINCT MONTH(dataE) AS mes FROM tb_entrada WHERE YEAR(dataE) = ? UNION SELECT DISTINCT MONTH(data) AS mes FROM tb_saida WHERE YEAR(data) = ?) AS meses LEFT JOIN (SELECT MONTH(dataE) AS mes, COUNT(id) AS entradas, SUM(total) AS totalE FROM tb_entrada WHERE YEAR(dataE) = ? GROUP BY mes) AS entradas ON meses.mes = entradas.mes LEFT JOIN (SELECT MONTH(data) AS mes, COUNT(id) AS saidas, SUM(valor) AS totalS FROM tb_saida WHERE YEAR(data) = ? GROUP BY mes) AS saidas ON meses.mes = saidas.mes LEFT JOIN (SELECT MONTH(dataE) AS mes, SUM(qtd) AS qtd FROM tb_entrada WHERE YEAR(dataE) = ? GROUP BY mes) AS qtd_entrada ON meses.mes = qtd_entrada.mes ORDER BY meses.mes;"
export const GetAllCategoriaSaida = "(SELECT(categoria) FROM tb_saida)AS Categoria,(SELECT SUM(valor) FROM tb_saida)AS Valor;"
export const GetCategoriaSaida = "SELECT S.categoria AS Categoria, SUM(DISTINCT S.valor) AS Valor,COUNT(*) as Qtd FROM tb_saida AS S WHERE MONTH(S.data) = ? && YEAR(S.data)= ? GROUP BY Categoria ORDER BY Valor DESC;"
export const GetViagens = "SELECT E.id AS entrada, F.nome AS Motorista, C.nome AS Caminhao FROM tb_entrada AS E INNER JOIN  tb_funcionario AS F INNER JOIN tb_caminhao AS C ON F.id = E.idMoto && C.id = E.idCam WHERE MONTH(E.dataE) = ? && YEAR(E.dataE)= ? GROUP BY entrada ORDER BY entrada DESC;"
export const GetMotVi = "SELECT DISTINCT F.nome AS Motorista, COUNT(*) AS Viagens FROM tb_funcionario AS F INNER JOIN tb_entrada AS E ON F.id = E.idMoto WHERE MONTH(E.dataE) = ? && YEAR(E.dataE)= ? GROUP BY Motorista ORDER BY Viagens DESC;"
export const GetCamVi = "SELECT DISTINCT C.cam_nome AS Caminhao, C.cam_id AS ID, COUNT(*) AS Viagens FROM tb_caminhao AS C INNER JOIN tb_entrada AS E ON C.cam_id = E.idCam WHERE MONTH(E.dataE) = ? && YEAR(E.dataE)= ? GROUP BY Caminhao ORDER BY Viagens DESC;"
export const GetCliVi = "SELECT C.nome AS Cliente, SUM(E.total) AS Valor, COUNT(*) AS Viagens FROM tb_entrada AS E INNER JOIN tb_cliente AS C ON E.idCli = C.id WHERE MONTH(E.dataE) = ? && YEAR(E.dataE) = ? GROUP BY Cliente ORDER BY Viagens DESC;"
export const GetSDias = "SELECT DAY(data) AS Dia, DATE_FORMAT(data,'%d/%m/%Y') AS 'Data', SUM(valor) AS Valor,COUNT(*) AS Saidas FROM tb_saida WHERE MONTH(data) = ? && YEAR(data)= ? GROUP BY Dia ORDER BY Dia;"
export const GetSFutura = "SELECT * FROM tb_saida WHERE data >= (SELECT DATE_ADD(CURDATE(),INTERVAL 1 DAY));"
export const GetEMes = "SELECT id AS ID SUM(total)AS Total, FROM tb_entrada WHERE MONTH(data) = ? && YEAR(data)= ?"
export const GetEDias = "SELECT DAY(dataE) AS Dia, DATE_FORMAT(dataE,'%d/%m/%Y') AS 'DataE', SUM(E.total) AS Valor, COUNT(*) AS Entradas FROM tb_entrada WHERE MONTH(dataE) = ? && YEAR(dataE)= ? GROUP BY DIA ORDER BY DIA;"
export const GetEFutura = "SELECT * FROM tb_entrada WHERE dataE >= (SELECT DATE_ADD(CURDATE(),INTERVAL 1 DAY));"









