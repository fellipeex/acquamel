import Caminhao from './Caminhao.js'
import CONN from '../../Config/database/conn.js';
import * as sql from './sqlCaminhao.js';

export default class CaminhaoDAO{
    constructor() {
        this.conn = CONN;
    }
    async save(cam) {
        return new Promise(async (resolve, reject) => {
            try {
                if (cam.id != null) {
                    // update an existing camrada   
                    await this.conn.query(sql.Update, 
                        [cam.placa, cam.nome, cam.ano, cam.renavam, cam.marca, cam.revisao, cam.cargaMax, cam.id])
                    this.conn.liberar();
                    resolve();
                } else {
                    // create a new Entrada
                    await this.conn.query(sql.Insert, 
                        [cam.placa, cam.nome, cam.ano, cam.renavam, cam.marca, cam.revisao, cam.cargaMax]);
                    this.conn.liberar()
                    resolve();
                }
            } catch (error) {
                reject(error);
            };
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
                    const caminhoes = rows.map(rows => {
                        const { id, placa, nome, ano, renavam, marca, revisao, cargaMax } = rows;
                        return new Caminhao(id, placa, nome, ano, renavam, marca, revisao, cargaMax);
                    });
                    resolve(caminhoes);
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
                    reject(new Error('Caminhão não encontrada'));
                } else {
                    const cam = result[0]
                    const caminhao = new Caminhao(cam.id,cam.placa,cam.nome,cam.ano,cam.renavam,cam.marca,cam.revisao,cam.cargaMax)
                    resolve(caminhao);
                }
            } catch (error) {
                reject(new Error('Erro na consulta de Entradas no Banco. ' + error.message));
            }
        })
    }
}
export {CaminhaoDAO, Caminhao}
