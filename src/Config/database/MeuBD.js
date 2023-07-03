
import {DBCONFIG} from './config.js'
import mysql from 'mysql2/promise'
import fs from 'fs';

const POOL = mysql.createPool(DBCONFIG);
let connection = null;

class MySQLConnection {
  constructor() {
    this.config = DBCONFIG;
    this.connection = null;
    this.pool = POOL;
  }

  async connect() {
    if (!this.connection || this.connection.state === 'disconnected') {
      try {
        this.connection = await this.pool.getConnection();
        console.log('Conectado ao Banco de dados: ' + this.config.database);
      } catch (err) {
        console.error('Erro ao conectar ao banco de dados.\nCriando arquivo de reset...');
        // Criar o arquivo restart.txt em caso de erro
        fs.writeFileSync('restart.txt', 'Erro ao conectar ao banco de dados');
        throw err;
      }
    }
  }

  async disconnect() {
    if (this.connection) {
      await this.connection.end();
      console.log('Desconectado do Banco de dados: ' + this.config.database);
    }
  }
  async liberar() {
    if (this.connection) {
      await this.connection.release();
    }
  }
  async query(sql, params) {
    try {
      if (!this.connection|| this.connection.state === 'disconnected') {
        await this.connection.connect();
      }
      const [rows, fields] = await this.connection.query(sql, params);
      return rows;
    } catch (err) {
        console.error(err);
      throw err;
    }
  }
}

class MeuBD {
  constructor() {
    this.connection = new MySQLConnection()
    this.connection.connect();
  }

  async query(sql, params) {
    return this.connection.query(sql, params);
  }
  async liberar() {
    return this.connection.liberar();
  }
  async disconnect() {
    return this.connection.disconnect();
  }
  async heartbeat() {
    const sql = 'SELECT 1';
    try {
      await this.query(sql);
    } catch (err) {
      console.error('Heartbeat failed', err);
      await this.liberar();
      await this.connection.connect();
    }
  }
}
export default MeuBD