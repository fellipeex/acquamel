import Funcionario from './Funcionario.js'
import CONN from '../../Config/database/conn.js';
import * as sql from './sqlFuncionario.js';

export default class FuncionarioDAO{
    constructor() {
        this.conn = CONN;
    }
    async save(func) {
        return new Promise(async (resolve, reject) => {
            try {
                if (func.id != null) {
                    // update an existing funcrada
                    await this.conn.query(sql.Update, [func.nome,func.dataNasc, func.ctps, func.rg, func.cpf, func.endereco, func.bairro, func.cep, func.status, func.salario, func.cargo, func.dataEnt, func.dataSai, func.id])
                    this.conn.liberar();
                    resolve();
                } else {
                    // create a new Entrada
                    await this.conn.query(sql.Insert, [func.nome,func.dataNasc, func.ctps, func.rg, func.cpf, func.endereco, func.bairro, func.cep, func.status, func.salario, func.cargo, func.dataEnt, func.dataSai])
                    this.conn.liberar()
                    resolve();
                }
            } catch (error) {
                reject(error);
            }
        });
    }
    async delete(id) {
        return new Promise(async (resolve, reject) => {
            try {
                await this.conn.query(sql.Delete, [id]);
                this.conn.liberar()
                resolve();
            }catch (error) {
                reject(error);
            };
        })
    }
    async getAll() {
        return new Promise(async (resolve, reject) => {
            try {
                const rows = await this.conn.query(sql.GetAll,)
                this.conn.liberar()
                if (rows.length === 0) {
                    reject(new Error('Nenhum Funcionário encontrado!'));
                } else {
                    const funcionarios = rows.map(rows => {
                        const { id, nome,dataNasc, ctps, rg, cpf, endereco, bairro, cep, status, salario, cargo, dataEnt, dataSai} = rows;
                        return new Funcionario(id, nome,dataNasc, ctps, rg, cpf, endereco, bairro, cep, status, salario, cargo, dataEnt, dataSai)
                    });
                    resolve(funcionarios);
                }
            } catch (error) {
                reject(new Error('Erro na consulta de Entradas no Banco. ' + error.message))
            }
        });
    }
    async getById(id) {
        return new Promise(async (resolve, reject) => {
            try {
                const result = await this.conn.query(sql.GetById, [id])
                this.conn.liberar()
                if (result.length === 0) {
                    reject(new Error('O Id do Funcionário Precisa ser válido!'));
                } else {
                    const func = result[0]                                        
                    const funcionario = new Funcionario(func.id,func.nome,func.dataNasc,func.ctps,func.rg,func.cpf,func.endereco,func.bairro,func.cep,
                        func.status,func.salario,func.cargo,func.dataEnt,func.dataSai)
                    resolve(funcionario);
                }
            } catch (error) {
                reject(error);
            }
        })
    }
    async getMotoristas() {
        return new Promise(async (resolve, reject) => {
            try {
                const rows = await this.conn.query(sql.GetMotoristas,)
                this.conn.liberar()
                if (rows.length === 0) {
                    reject(new Error('Nenhuma Entrada encontrada!'));
                } else {
                    const funcionarios = rows.map(rows => {
                        const { id, nome,dataNasc, ctps, rg, cpf, endereco, bairro, cep, status, salario, cargo, dataEnt, dataSai} = rows;
                        return new Funcionario(id, nome,dataNasc, ctps, rg, cpf, endereco, bairro, cep, status, salario, cargo, dataEnt, dataSai)
                    });
                    resolve(funcionarios);
                }
            } catch (error) {
                reject(new Error('Erro na consulta de Entradas no Banco. ' + error.message))
            }
        });
    }
    async getVendedores() {
        return new Promise(async (resolve, reject) => {
            try {
                const rows = await this.conn.query(sql.GetVendedores,)
                this.conn.liberar()
                if (rows.length === 0) {
                    reject(new Error('Nenhuma Entrada encontrada!'));
                } else {
                    const funcionarios = rows.map(rows => {
                        const { id, nome,dataNasc, ctps, rg, cpf, endereco, bairro, cep, status, salario, cargo, dataEnt, dataSai} = rows;
                        return new Funcionario(id, nome,dataNasc, ctps, rg, cpf, endereco, bairro, cep, status, salario, cargo, dataEnt, dataSai)
                    });
                    resolve(funcionarios);
                }
            } catch (error) {
                reject(new Error('Erro na consulta de Entradas no Banco. ' + error.message))
            }
        });
    }
}
export {FuncionarioDAO, Funcionario}