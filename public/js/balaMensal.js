function balanco() {
  baMensal();
  listener(baMensal);
}
//Criando FUNÇÃO Infos iniciais
function baMensal() {
  localStorage.clear();
  //Criando Elementos do HTML
  let ent = document.getElementById('ENT');
  let sai = document.getElementById('SAIDA');
  let lucro = document.getElementById('LUCRO');
  let perc = document.getElementById('PERCENTUAL');
  let viagens = document.getElementById('VIAGENS');
  let agua = document.getElementById('AGUAFORNECIDA');
  let saiF = document.getElementById('FS');
  let entF = document.getElementById('FE');

  //-----------------Criando req Infos iniciais
  const reqBalanco = response => {
    const jsonResponse = response.currentTarget.response;
    try {
      const a = JSON.parse(jsonResponse);
      const json = a[0];
      if (json.Entrada == null) {
        json.Entrada = 0;
        json.Agua = 0
        agua.className = "text-amarelo";
      }
      if (json.Saida == null) {
        json.Saida = 0;
      }
      let liq = json.Entrada + (json.Saida)
      let percentM
      if (liq < 0 || json.Entrada === 0) {
        lucro.className = "text-laranja";
        perc.className = "text-laranja"
        percentM = (liq / json.Saida) * -100;
      }
      if (liq === 0) {
        lucro.className= "text-amarelo";
        perc.className = "text-amarelo";
        percentM = 0
      }
      if (liq > 0) {
        lucro.className = "text-white";
        perc.className = "text-white";
        agua.className = "text-white"
        percentM = (liq / json.Entrada) * 100;
      }
      // Definindo valores no HTML
      ent.innerHTML = 'R$ ' + json.Entrada.toFixed(2);
      sai.innerHTML = 'R$ ' + json.Saida.toFixed(2);
      lucro.innerHTML = 'R$ ' + liq.toFixed(2);
      perc.innerHTML = '% ' + percentM.toFixed(2);
      agua.innerHTML = json.Agua + ' M³'

    } catch (e) {
      console.error('Erro ao tentar analisar a resposta da API Balanço ', e);
    }
  }

  //----------------------------------VIAGENS DO MÊS
  const reqViagens = response => {
    const jsonResponse = response.currentTarget.response;
    try {
      const jsonV = JSON.parse(jsonResponse);
      if (jsonV.length > 0) {
        viagens.className= "text-white";
        viagens.innerHTML = jsonV.length;
      } else {
        viagens.className= "text-amarelo";
        viagens.innerHTML = "0"
      }
    } catch (e) {
      console.error('Erro ao tentar analisar a resposta da API Viagens ');
    }
  }

  //Saídas futuras
  const reqSF = response => {
    const jsonResponse = response.currentTarget.response;
    try {
      const json = JSON.parse(jsonResponse);
      if (json.length > 0) {
        saiF.innerHTML = json.length;
      } else {
        saiF.innerHTML = "0"
      }
      getJSON("/api/getSF", reqSF);
    } catch (e) {
      console.error('Erro ao tentar analisar a resposta da API SF' );
    }
  }

  //Entradas futuras
  const reqEF = response => {
    const jsonResponse = response.currentTarget.response;
    try {
      const json = JSON.parse(jsonResponse);
      if (json.length > 0) {
        entF.innerHTML = json.length;
      } else {
        entF.innerHTML = "0"
      }
      getJSON("/api/getEF", reqEF);
    } catch (e) {
      console.error('Erro ao tentar analisar a resposta da API EF ');
    }
  }
  try{
  getJSON(getUrlData("/api/totalGeral/"), reqBalanco);
  getJSON(getUrlData("/api/getViagens/"), reqViagens);
  getJSON("/api/getEF", reqEF);
  getJSON("/api/getSF", reqSF);
  
  }catch(e){
    console.error('Erro ao tentar REANALIZAR a resposta da API');
  }
}; 