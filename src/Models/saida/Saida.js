class Saida {
    constructor(id, nome, categoria, valor, obs, data) {
      this.id = id;
      this.nome = nome;
      this.categoria = categoria;
      this.valor = valor;
      this.obs = obs;
      this.data = data;
    }
    getDataUs(){
      // Divida a data e hora em partes separadas
      const partes = this.data.split(' ');
    
      // Divida a parte da data em dia, mês e ano
      const dataPartes = partes[0].split('/');
    
      // Crie uma nova data com as partes separadas
      const novaDataHora = new Date(`${dataPartes[2]}-${dataPartes[1]}-${dataPartes[0]}T${partes[1]}`);
      novaDataHora.setHours(novaDataHora.getHours() - 3);
      // Formate a nova data em um valor string compatível com o input datetime-local
      const novoValor = novaDataHora.toISOString().slice(0, 16);
    
      return novoValor;
  }
}
export default Saida;