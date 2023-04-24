class Funcionario {
  constructor(id, nome, dataNasc, ctps, rg, cpf, endereco, bairro, cep, status, salario, cargo, dataEnt, dataSai) {
    this.id = id;
    this.nome = nome;
    this.dataNasc = dataNasc;
    this.ctps = ctps;
    this.rg = rg;
    this.cpf = cpf;
    this.endereco = endereco;
    this.bairro = bairro;
    this.cep = cep;
    this.status = status;
    this.salario = salario;
    this.cargo = cargo;
    this.dataEnt = dataEnt;
    this.dataSai = dataSai;
  }
  getDataNascUs() {
    if (this.dataNasc != null || this.dataNasc != undefined) {
      // Divida a data e hora em partes separadas
      const partes = this.dataNasc.split(' ');

      // Divida a parte da data em dia, mês e ano
      const dataPartes = partes[0].split('/');

      // Crie uma nova data com as partes separadas
      const novaData = new Date(`${dataPartes[2]}-${dataPartes[1]}-${dataPartes[0]}`);
      const dataFormatada = novaData.toISOString().slice(0, 10);

      return dataFormatada;
    }else{
      return null;
    }
  }
  getDataEntUs() {
    if (this.dataEnt!= null || this.dataEnt != undefined) {
      // Divida a data e hora em partes separadas
      const partes = this.dataEnt.split(' ');

      // Divida a parte da data em dia, mês e ano
      const dataPartes = partes[0].split('/');

      // Crie uma nova data com as partes separadas
      const novaData = new Date(`${dataPartes[2]}-${dataPartes[1]}-${dataPartes[0]}`);
      const dataFormatada = novaData.toISOString().slice(0, 10);

      return dataFormatada;
    } else {
        return "-"
    }
  }
  getDataSaiUs() {
    if (this.dataSai != null || this.dataSai != undefined) {
      // Divida a data e hora em partes separadas
      const partes = this.dataSai.split(' ');

      // Divida a parte da data em dia, mês e ano
      const dataPartes = partes[0].split('/');

      // Crie uma nova data com as partes separadas
      const novaData = new Date(`${dataPartes[2]}-${dataPartes[1]}-${dataPartes[0]}`);
      const dataSFormatada = novaData.toISOString().slice(0, 10);

      return dataSFormatada;
    }else{
      return null;
    }
  }
  getIdade() {
    const hoje = new Date();
    const partes = this.dataNasc.split(' ');

    // Divida a parte da data em dia, mês e ano
    const dataPartes = partes[0].split('/');

    // Crie uma nova data com as partes separadas
    const dataNascimento = new Date(`${dataPartes[2]}-${dataPartes[1]}-${dataPartes[0]}`);
    let idade = hoje.getFullYear() - dataNascimento.getFullYear();
    const mes = hoje.getMonth() - dataNascimento.getMonth();
    
    if (mes < 0 || (mes === 0 && hoje.getDate() < dataNascimento.getDate())) {
      idade--;
    }
  
    return idade;
  }
}
export default Funcionario;