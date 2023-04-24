class Caminhao {
    constructor(id, placa, nome, ano, renavam, marca, revisao,cargaMax) {
      this.id = id;
      this.placa = placa
      this.nome = nome;
      this.ano = ano;
      this.renavam = renavam;
      this.marca = marca;
      this.revisao = revisao;
      this.cargaMax = cargaMax;
    }
    getDataUs(){
      // Divida a data e hora em partes separadas
      const partes = this.revisao.split(' ');
    
      // Divida a parte da data em dia, mês e ano
      const dataPartes = partes[0].split('/');
    
      // Crie uma nova data com as partes separadas
      const novaData = new Date(`${dataPartes[2]}-${dataPartes[1]}-${dataPartes[0]}`);
      const dataFormatada = novaData.toISOString().slice(0, 10);
  
      return dataFormatada;
    }
}
export default Caminhao;