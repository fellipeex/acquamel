import Usuario from "./Usuario.js";
import bcrypt from 'bcrypt';
import CONN from '../../Config/database/conn.js';
import * as sql from './sqlUsuario.js'
export default class UserDAO {
  constructor() {
    this.conn = CONN;
  }
  async getAll() {
    return new Promise(async (resolve, reject) => {
      try {
        const rows = await this.conn.query(sql.GetAll,)
        this.conn.liberar()
        if (rows.length === 0) {
          reject({ message: new Error('Nenhum usuário encontrado!') });
        } else {
          const users = rows.map(rows => {
            const { id, nome, email, classe, foto, lastLogin } = rows;
            //criando verificacao de img um diretorio para salvar as imagens  
            let dir = '/public/img/uploads/'
            if (!foto || foto == '') {
              dir = null
            } else {
              dir = "" + dir + foto
            }
            //setando em User e omitindo senha
            return new Usuario(id, nome, email, null, classe, dir, lastLogin);
          });
          resolve(users);
        }
      } catch (error) {
        reject(new Error('Erro na consulta de Usuário no Banco. ' + error.message))
      }
    });
  }
  async getById(id) {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await this.conn.query(sql.GetById, [id])
        this.conn.liberar()
        if (result.length === 0) {
          reject(new Error('O ID do usuário precisa ser válido!'));
        } else {
          const usr = result[0]
          let dir = '/public/img/uploads/'
          if (!usr.foto || usr.foto == '') {
            dir = '/public/img/uploads/none.jpg'
          } else {
            dir = '' + dir + usr.foto
          }
          const usrJson = {
            id: usr.id,
            nome: usr.nome,
            email: usr.email,
            classe: usr.classe,
            foto: dir,
            lastLogin: usr.lastLogin
          }
          // Extrai as propriedades do objeto usrJson usando desestruturação
          const { id, nome, email, classe, foto, lastLogin } = usrJson;
          // Cria uma nova instância de Usuario passando as propriedades como argumentos
          const user = new Usuario(id, nome, email, null, classe, dir, lastLogin);
          resolve(user);
        }
      } catch (error) {
        reject(error);
      }
    })
  }
  async getByEmail(email) {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await this.conn.query(sql.GetByEmail, [email])
        //this.conn.disconnect()
        if (result.length === 0) {
          reject(new Error('Usuário não encontrado'));
        } else {
          let dir = '/public/img/uploads/'
          const { id, nome, email, senha, classe, foto } = result[0];
          //criando verificacao de img um diretorio para salvar as imagens  
          if (!foto || foto == '') {
            dir = '/public/img/uploads/none.jpg'
          } else {
            dir = "" + dir + foto
          }
          const user = new Usuario(id, nome, email, senha, classe, dir, null);

          // Cria uma nova instância de Usuario passando as propriedades como argumentos
          resolve(user);
        }
      } catch (error) {
        reject(error);
      }
    });
  }
  async save(user) {
    return new Promise(async (resolve, reject) => {
      try {
        
        if (user.id != null) {
          // update an existing user
          await this.conn.query(sql.Update, [user.nome, user.email, user.classe, user.id])
          this.conn.liberar();
          resolve();
        } else if (user.senha != null) {
          const hash = bcrypt.hashSync(user.senha, 10);
          // create a new user
          await this.conn.query(sql.Insert, [user.nome, user.email, hash, user.classe, user.foto])
          this.conn.liberar();
          resolve();
        }
      } catch (error) {
        reject(error);
      }
    })
  }
  async lastLogin(user) {
    return new Promise(async (resolve, reject) => {
      try {
        if (user.id != null) {
          // update an existing user
          await this.conn.query(sql.SetLastLogin, [user.id]);
          this.conn.liberar()
          resolve();

        } else {
          reject(new Error('User ID cannot be null.'));
        }
      } catch (error) {
        reject(error);
      }
    })
  }
  async trocarFoto(user) {
    return new Promise(async (resolve, reject) => {
      try {
        if (user.id != null) {
          await this.conn.query(sql.SetFoto, [user.foto, user.id])
          this.conn.liberar()
          resolve();
        } else {
          reject(new Error('Usuário sem ID, este campo não pode ser núlo.'));
        }
      } catch (error) {
        reject(error);
      }
    })
  }
  async trocarSenha(user) {
    return new Promise(async (resolve, reject) => {
      try {
        const hash = bcrypt.hashSync(user.senha, 10);
        if (user.id != null) {
          // update an existing user
          await this.conn.query(sql.SetPass, [hash, user.id]);
          this.conn.liberar()
          resolve();
        } else {
          reject(new Error('Usuário sem ID, este campo não pode ser núlo.'));
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
      } catch (error) {
        reject(error);
      };
    })
  }
}
export { UserDAO, Usuario };