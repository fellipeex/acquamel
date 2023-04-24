 //--------1 DAO
//sets
export const Update = 'UPDATE tb_caminhao SET placa=?, nome=?, ano=?, renavam=?, marca=?, revisao=?, cargaMax=? WHERE id=?';
export const Insert = 'INSERT INTO tb_caminhao (placa, nome, ano, renavam, marca, revisao, cargaMax) VALUES (?, ?, ?, ?, ?, ?, ?)';
export const Delete = 'DELETE FROM tb_caminhao WHERE id=?;'
//gets
export const GetAll = "SELECT id, placa, nome, ano, renavam, marca,DATE_FORMAT(revisao, '%d/%m/%Y') AS revisao, cargaMax FROM tb_caminhao;"
export const GetById = "SELECT id, placa, nome, ano, renavam, marca,DATE_FORMAT(revisao, '%d/%m/%Y') AS revisao, cargaMax FROM tb_caminhao WHERE id=?"