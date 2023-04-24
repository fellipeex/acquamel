import Cliente from './Cliente.js'
import CONN from '../../Config/database/conn.js';
import * as sql from './sqlCliente.js';

export default class ClienteDAO{
    constructor() {
        this.conn = CONN;
    }
    async save(cli) {
        return new Promise(async (resolve, reject) => {
            try {
                if (cli.id != null) {
                    // update an existing funcrada
                    await this.conn.query(sql.Update, [cli.nome, cli.apelido, cli.cnpj, cli.cpf, cli.endereco, cli.bairro, cli.cep, cli.telefone, cli.celular, cli.id])
                    this.conn.liberar();
                    resolve();
                } else {
                    // create a new Entrada
                    await this.conn.query(sql.Insert, [cli.nome, cli.apelido, cli.cnpj, cli.cpf, cli.endereco, cli.bairro, cli.cep, cli.telefone, cli.celular])
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
                    reject(new Error('Nenhuma Entrada encontrada!'));
                } else {
                    const clientes = rows.map(rows => {
                        const {id, nome, apelido, cnpj, cpf, endereco, bairro, cep, telefone, celular} = rows;
                        return new Cliente(id, nome, apelido, cnpj, cpf, endereco, bairro, cep, telefone, celular)
                    });
                    resolve(clientes);
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
                    reject(new Error('O Id da Entrada Precisa ser válido!'));
                } else {
                    const cli = result[0];
                    
                    const cliente = new Cliente(cli.id,cli.nome,cli.apelido,cli.cnpj,
                        cli.cpf,cli.endereco,cli.bairro,cli.cep,cli.telefone,cli.celular)
                    resolve(cliente);
                }
            } catch (error) {
                reject(error);
            }
        })
    }
}
export {ClienteDAO, Cliente}