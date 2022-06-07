function balanco() {
  baMensal();
  listener(baMensal);}
//Criando FUNÇÃO Infos iniciais
function baMensal() {
  //Criando Elementos do HTML
  let ent = document.getElementById('ENT');
  let sai = document.getElementById('SAIDA');
  let saldo = document.getElementById('BRUTO');
  let perc = document.getElementById('PERCENTUAL');
  let viagens = document.getElementById('VIAGENS');
  let saiF = document.getElementById('FS');
  let entF = document.getElementById('FE');

  //-----------------Criando req Infos iniciais
  const reqBalanco = response => {
    const a = JSON.parse(response.currentTarget.response);
    const json = a[0];
    if (json.Entrada == null) {
      json.Entrada = 0;
    }
    if (json.Saida == null) {
      json.Saida = 0;
    }
    let bruto =  (json.Saida) + json.Entrada
    if (bruto < 0) {
      saldo.className = "text-laranja";
    }
    if (bruto >= 0) {
      saldo.className = "text-white";
    }
    // Definindo valores no HTML
    ent.innerHTML = 'R$ ' + json.Entrada.toFixed(2);
    sai.innerHTML = 'R$ ' + json.Saida.toFixed(2);
    saldo.innerHTML = 'R$ ' + bruto.toFixed(2);

    //-----------------------------------PERCENTUAL
    const reqPercent = response => {
      const a = JSON.parse(response.currentTarget.response);
      const json = a[0];
      if (json.Entrada == null) {
        json.Entrada = 0;
      }
      if (json.Saida == null) {
        json.Saida = 0;
      }
      json.Bruto = json.Saida + json.Entrada;
      let percent = (bruto / json.Bruto) * 100
      if (percent < 0) {
        perc.className = "text-laranja";
      }
      if (percent >= 0) {
        perc.className = "text-white";
      }
      perc.innerHTML = '% ' + percent.toFixed(2);
    }
    let urlPercent = "/totalGeral";
    getJSON(urlPercent, reqPercent);


    //----------------------------------VIAGENS DO MÊS
    const reqViagens = response => {
      const jsonV = JSON.parse(response.currentTarget.response);
        viagens.innerHTML = jsonV.length;
    }
    data = getCaleData()
    data[0] = y;
    data[1] = m;
    urlViagens = '/getViagens/' + y + m
    getJSON(urlViagens, reqViagens);
  }

  //-------------------Gerando Informaçoes iniciais
  url = getUrlData("/totalGeral/")
  getJSON(url, reqBalanco);
 
//saidas futuras
const reqSF = response => {
  const json = JSON.parse(response.currentTarget.response);
  saiF.innerHTML = json.length;
}
urlSF = "/getSF";
getJSON(urlSF, reqSF);
//Entradas futuras
const reqEF = response => {
  const json = JSON.parse(response.currentTarget.response);
  entF.innerHTML = json.length;
}
urlEF = "/getEF";
getJSON(urlEF, reqEF);
}; 