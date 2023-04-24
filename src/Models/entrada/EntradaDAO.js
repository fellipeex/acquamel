import Entrada from './Entrada.js'
import CONN from '../../Config/database/conn.js';
import * as sql from './sqlEntrada.js';
import CaminhaoDAO from '../caminhao/CaminhaoDAO.js';
import FuncionarioDAO from '../funcionario/FuncionarioDAO.js';
import ClienteDAO from '../cliente/ClienteDAO.js';

export default class EntradaDAO{
    constructor() {
        this.conn = CONN;
    }
    async save(ent) {
        return new Promise(async (resolve, reject) => {
            try {
                if (ent.id != null) {
                    // update an existing Entrada
                    await this.conn.query(sql.Update, [ent.nome, ent.cliente, ent.caminhao, ent.vendedor, ent.motorista, ent.valor, ent.qtd, ent.total, ent.obs, ent.dataE, ent.id])
                    this.conn.liberar();
                    resolve();
                } else {
                    // create a new Entrada
                    await this.conn.query(sql.Insert, [ent.nome, ent.cliente, ent.caminhao, ent.vendedor, ent.motorista, ent.valor, ent.qtd, ent.total, ent.obs, ent.dataE])
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
                    const entradas = rows.map(rows => {
                        const { id, nome, cliente, caminhao, vendedor, motorista, valor, qtd, total, obs, dataE } = rows;
                        return new Entrada(id, nome, cliente, caminhao, vendedor, motorista, valor, qtd, total, obs, dataE)
                    });
                    resolve(entradas);
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
                    const ent = result[0]
                    const entrada = new Entrada(
                        ent.id, ent.nome, ent.idCli, ent.idCam, ent.idVend, ent.idMoto, 
                        ent.valor, ent.qtd, ent.total, ent.obs, ent.dataE
                    )
                    resolve(entrada);
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
                    reject(new Error('Nenhuma Entrada no ano Pesquisado'));
                    
                } else {
                    const entradas = result.map(result => {
                        const { id, nome, idCli, idCam, idVend, idMoto, valor, qtd, total, obs, dataE } = result;
                        return new Entrada(id, nome, idCli, idCam, idVend, idMoto, valor, qtd, total, obs, dataE);
                    });
                    resolve(entradas);
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
                    const entradas = result.map(result => {
                        const { id, nome, idCli, idCam, idVend, idMoto, valor, qtd, total, obs, dataE } = result;
                        return new Entrada(id, nome, idCli, idCam, idVend, idMoto, valor, qtd, total, obs, dataE);
                    });
                    resolve(entradas);
                }
            } catch (error) {
                reject(error);
            }
        })
    }
    async getOutros(ent) {
        return new Promise(async (resolve, reject) => {
            const cliDAO = new ClienteDAO();
            const camDAO = new CaminhaoDAO();
            const funcDAO = new FuncionarioDAO();
            try {
                const cliente = await cliDAO.getById(ent.cliente)
                const caminhao = await camDAO.getById(ent.caminhao)
                const motorista = await funcDAO.getById(ent.motorista)
                const vendedor = await funcDAO.getById(ent.vendedor)
                if (caminhao, cliente, motorista, vendedor) 
                {
                    resolve({ cliente, caminhao, motorista, vendedor});
                } else {
                    reject(new Error('Entrada não encontrada'));
                }
            } catch (error) {
                reject(error);
            }
        })
    }
}
export {EntradaDAO, Entrada}