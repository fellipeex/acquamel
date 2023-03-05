const conn = require('../../Config/database/db');
const bcrypt = require('bcrypt');
class Usuario {
    constructor(nome, email, senha, classe, foto) {
      this.nome = nome;
      this.email = email;
      this.senha = senha;
      this.classe = classe;
      this.foto = foto;
    }
    
  async salvar(callback)  {
    const hash = bcrypt.hashSync(this.senha, 10);
          const sql = 'INSERT INTO tb_usuario (u_nome, u_email, u_senha, u_class, u_foto) VALUES (?, ?, ?, ?, ?)';
          conn.query(sql, [this.nome, this.email, hash, this.classe, this.foto], async (error, results, fields) => {
        if (error) {
          console.error(error);
          callback(error);
        } else {
            callback(null, results.insertId);
          }
        });
      }    
  salvarConfiguracoes(verPrimeiro, tema, callback) {
    const sql = 'INSERT INTO configuracoes (id_usuario, ver_primeiro, tema) VALUES (?, ?, ?)';
    conn.query(sql, [this.id, verPrimeiro, tema], (error, results, fields) => {
      if (error) {
        console.error(error);
        callback(error);
      } else {
        callback(null);
      }
    });
  }
}
module.exports = Usuario;