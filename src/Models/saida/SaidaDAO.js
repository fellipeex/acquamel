import Saida from './Saida.js'
import CONN from '../../Config/database/conn.js';
import * as sql from './sqlSaida.js';

export default class SaidaDAO{
    constructor() {
        this.conn = CONN;
    }
    async save(sai) {
        return new Promise(async (resolve, reject) => {
            try {
                if (sai.id != null) {
                    // update an existing Entrada
                    await this.conn.query(sql.Update, [sai.nome, sai.categoria, sai.valor, sai.obs, sai.data, sai.id])
                    this.conn.liberar();
                    resolve();
                } else {
                    // create a new saida
                    await this.conn.query(sql.Insert, [sai.nome, sai.categoria, sai.valor, sai.obs, sai.data])
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
                    reject(new Error('Nenhuma Saída foi encontrada!'));
                } else {
                    const saidas = rows.map(rows => {
                        const { id, nome, categoria, valor, obs, data} = rows;
                        return new Saida(id, nome, categoria, valor, obs, data);
                    });
                    resolve(saidas);
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
                    reject(new Error('Saída não encontrada'));
                } else {
                    const sai = result[0]
                    const saida = new Saida(sai.id, sai.nome, sai.categoria, sai.valor, sai.obs, sai.data)
                    resolve(saida);
                }
            } catch (error) {
                reject(error);
            }
        })
    }
    async getByY(year) {
        return new Promise(async (resolve, reject) => {
            try {
                const result = await this.conn.query(sql.GetByY, [year])
                this.conn.liberar()
                if (result.length === 0) {
                    reject(new Error('Saída não encontrada'));
                } else {
                    const saidas = result.map(result => {
                        const { id, nome, categoria, valor, obs, data } = result;
                        return new Saida(id, nome, categoria, valor, obs, data);
                    });
                    resolve(saidas);
                }
            } catch (error) {
                reject(error);
            }
        })
    }
    async getByYM(y,m) {
        return new Promise(async (resolve, reject) => {
            try {
                const result = await this.conn.query(sql.GetByYM, [y,m])
                this.conn.liberar()
                if (result.length === 0) {
                    reject(new Error('Entrada não encontrada'));
                } else {
                    const saidas = result.map(result => {
                        const { id, nome, categoria, valor, obs, data } = result;
                        return new Saida(id, nome, categoria, valor, obs, data);
                    });
                    resolve(saidas);
                }
            } catch (error) {
                reject(error);
            }
        })
    }
    async getCate() {
        return new Promise(async (resolve, reject) => {
            try {
                const rows = await this.conn.query(sql.GetCate,)
                this.conn.liberar()
                if (rows.length === 0) {
                    reject(new Error('Nenhuma Saída foi encontrada!'));
                } else {
                    const saidas = rows.map(rows => {
                        const {categoria} = rows;
                        return new Saida(null, null, categoria, null, null, null);
                    });
                    resolve(saidas);
                }
            } catch (error) {
                reject(new Error('Erro na consulta de Entradas no Banco. ' + error.message))
            }
        });
    }
}
export {SaidaDAO, Saida}