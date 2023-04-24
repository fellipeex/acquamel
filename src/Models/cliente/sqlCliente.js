 //--------1 DAO
//sets
export const Update = 'UPDATE tb_cliente SET nome=?, apelido=?, cnpj=?, cpf=?, endereco=?, bairro=?, cep=?, telefone=?, celular=? WHERE id=?';
export const Insert = 'INSERT INTO tb_cliente (nome, apelido, cnpj, cpf, endereco, bairro, cep, telefone, celular) VALUES (?,?,?, ?,?,?, ?,?,?)';
export const Delete = 'DELETE FROM tb_cliente WHERE id=?;'
//gets
export const GetAll = "SELECT * FROM tb_cliente;"
export const GetById = "SELECT * FROM tb_cliente WHERE id=?"