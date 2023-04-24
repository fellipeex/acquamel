class Entrada {
    constructor(id, nome, cliente, caminhao, vendedor, motorista, valor, qtd, total, obs, dataE) {
      this.id = id;
      this.nome = nome;
      this.cliente = cliente;
      this.caminhao = caminhao;
      this.vendedor = vendedor;
      this.motorista = motorista;
      this.valor = valor;
      this.qtd = qtd;
      this.total = total;
      this.obs = obs;
      this.dataE = dataE;
    }
    getDataUs(){
        // Divida a data e hora em partes separadas
        const partes = this.dataE.split(' ');
      
        // Divida a parte da data em dia, mês e ano
        const dataPartes = partes[0].split('/');
      
        // Crie uma nova data com as partes separadas
        const novaDataHora = new Date(`${dataPartes[2]}-${dataPartes[1]}-${dataPartes[0]}T${partes[1]}`);
        novaDataHora.setHours(novaDataHora.getHours() - 3);
        // Formate a nova data em um valor string compatível com o input datetime-local
        const novoValor = novaDataHora.toISOString().slice(0, 16);
      
        return novoValor;
    }
    getLitros(){
      const Litros = 1000 * this.qtd
      return Litros  
    }
}
export default Entrada;