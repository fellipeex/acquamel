 //--------1 DAO
//sets
export const Update = 'UPDATE tb_funcionario SET nome=?, dataNasc=?, ctps=?, rg=?, cpf=?, endereco=?, bairro=?, cep=?, status=?, salario=?, cargo=?, dataEnt=?, dataSai=? WHERE id=?';
export const Insert = 'INSERT INTO tb_funcionario (nome, dataNasc, ctps, rg, cpf, endereco, bairro, cep, status, salario, cargo, dataEnt, dataSai) VALUES (?, ?, ?, ?, ?, ?, ?,?,?,?,?,?,?)';
export const Delete = 'DELETE FROM tb_funcionario WHERE id=?;'
//gets
export const GetAll = "SELECT id, nome, DATE_FORMAT(dataNasc, '%d/%m/%Y')AS dataNasc, ctps, rg, cpf, endereco, bairro, cep, status, salario, cargo, DATE_FORMAT(dataEnt, '%d/%m/%Y')AS dataEnt,  DATE_FORMAT(dataSai, '%d/%m/%Y')AS dataSai FROM tb_funcionario;"
export const GetMotoristas = "SELECT id, nome, DATE_FORMAT(dataNasc, '%d/%m/%Y')AS dataNasc, ctps, rg, cpf, endereco, bairro, cep, status, salario, cargo, DATE_FORMAT(dataEnt, '%d/%m/%Y')AS dataEnt,  DATE_FORMAT(dataSai, '%d/%m/%Y')AS dataSai FROM tb_funcionario WHERE cargo = 'Motorista'"
export const GetVendedores = "SELECT id, nome, DATE_FORMAT(dataNasc, '%d/%m/%Y')AS dataNasc, ctps, rg, cpf, endereco, bairro, cep, status, salario, cargo, DATE_FORMAT(dataEnt, '%d/%m/%Y')AS dataEnt,  DATE_FORMAT(dataSai, '%d/%m/%Y')AS dataSai FROM tb_funcionario WHERE cargo = 'Vendedor'"
export const GetById = "SELECT id, nome, DATE_FORMAT(dataNasc, '%d/%m/%Y')AS dataNasc, ctps, rg, cpf, endereco, bairro, cep, status, salario, cargo, DATE_FORMAT(dataEnt, '%d/%m/%Y')AS dataEnt,  DATE_FORMAT(dataSai, '%d/%m/%Y')AS dataSai FROM tb_funcionario WHERE id=?"