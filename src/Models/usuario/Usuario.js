class Usuario {
    constructor(id, nome, email, senha, classe, foto, lastLogin) {
      this.id = id;
      this.nome = nome;
      this.email = email;
      this.senha = senha;
      this.classe = classe;
      this.foto = foto;
      this.lastLogin = lastLogin
    }
    getPnome(){
      let arrayNome = this.nome.split(" ");
      const pnome = arrayNome[0].toUpperCase()
      return pnome
    }
}
export default Usuario;