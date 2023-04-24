 //--------1 DAO
//sets
export const Update = 'UPDATE tb_saida SET nome=?, categoria=?, valor=?, obs=?, data=? WHERE id=?';
export const Insert = 'INSERT INTO tb_saida (nome, categoria, valor, obs, data) VALUES (?, ?, ?, ?, ?)';
export const Delete = 'DELETE FROM tb_saida WHERE id=?;'
//gets
export const GetAll = "SELECT id, nome, categoria, valor, obs, DATE_FORMAT(data, '%d/%m/%Y %H:%i') AS data FROM tb_saida;"
export const GetById = "SELECT id, nome, categoria, valor, obs, DATE_FORMAT(data, '%d/%m/%Y %H:%i') AS data FROM tb_saida WHERE id=?"
export const GetByY = "SELECT * FROM tb_saida AS S WHERE YEAR(S.data)= ?"
export const GetByYM = "SELECT * FROM tb_saida WHERE YEAR(data)= ? && MONTH(data) = ?"
export const GetCate ="SELECT DISTINCT categoria FROM tb_saida;"
