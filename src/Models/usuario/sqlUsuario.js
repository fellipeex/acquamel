 //--------1 DAO
//sets
export const Update = 'UPDATE tb_usuario SET nome=?, email=?, classe=? WHERE id=?';
export const Insert = 'INSERT INTO tb_usuario (nome, email, senha, classe, foto) VALUES (?, ?, ?, ?, ?)';
export const Delete = 'DELETE FROM tb_usuario WHERE id=?;'
export const SetLastLogin = "UPDATE tb_usuario SET lastLogin=NOW() WHERE id=?;"
export const SetFoto = "UPDATE tb_usuario SET foto=? WHERE id=?;"
export const SetPass = "UPDATE tb_usuario SET senha=? WHERE id=?;"
//gets
export const GetAll = "SELECT id, nome, email, senha, classe, foto, DATE_FORMAT(lastLogin, '%d/%m/%Y %H:%i:%s') AS lastLogin FROM tb_usuario;"
export const GetByEmail = "SELECT id, nome, email, senha, classe, foto FROM tb_usuario WHERE email = ?;"
export const GetById = "SELECT id, nome, email, classe, foto, DATE_FORMAT(lastLogin, '%d/%m/%Y %H:%i:%s') AS lastLogin FROM tb_usuario WHERE id=?"