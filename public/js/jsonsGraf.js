function getJSON(url, reqListener) {
  const loadData = () => {
    const req = new XMLHttpRequest();
    req.onload = reqListener;
    req.open("get", url, true);
    req.send();
  };
  loadData();
};
let ur;
let url;
let btnMes;
let ca;
let data;

//Criando request de ENTRADA E SAÍDA via JSON
function setBalanco(chart) {
  ca = document.body.querySelector('#cale');
  if (ca.value != null) {
    const reqJSONEntradaSaida = response => {
      const a = JSON.parse(response.currentTarget.response);
      const json = a[0];
      //setando valores Entrada e Saída
      if (json.Entrada == null) {
        json.Entrada = 0;
      } if (json.Saida == null) {
        json.Saida = 0;
      }
      json.Bruto = (json.Saida) + json.Entrada;

      let val = Object.values(json);
      let nomes = Object.keys(json);
      let nomeMes = getmes();

      chart.data.labels.pop();
      chart.data.labels = [nomeMes];

      const datasets = chart.data.datasets;
      if (datasets.length > 0) {
        for (let index = 0; index < datasets.length; ++index) {

          datasets[index].data.pop();
          datasets[index].label = nomes[index];
          datasets[index].data.push(val[index]);
        }chart.update();
      }
    }
    data = getCaleData()
    data[0] = y;
    data[1] = m;
    url = '/totalGeral/' + y + m;
    getJSON(url, reqJSONEntradaSaida)
    listener(function () {
      getJSON(url, reqJSONEntradaSaida);
   });
  }
};

function setGastos(chart) {
  ca = document.body.querySelector('#cale');
  if (ca.value != null) {
    const reqChartCategoria = response => {
      const a = JSON.parse(response.currentTarget.response);
      let cate = [];
      let val = [];
      let total = 0;
      if (a.length == 0){
        cate = ["SEM GASTOS"];
        val = [0];
      }
      for (let i = 0; i < a.length; i++) {
        if (a[i].Categoria){
          cate.push(a[i].Categoria);
        }
        if (a[i].Valor) {
          total += a[i].Valor;
          val.push(a[i].Valor);
        }
      }
      //declatação das variaveis
      let nomeMes = getmes();

      chart.options.plugins.title.text = "Gastos em " + nomeMes;
      chart.options.plugins.subtitle.text = "Total: R$" + total.toFixed(2);
      chart.data.labels.pop();
      chart.data.labels = cate;
      chart.data.datasets.forEach((dataset) => {
        dataset.data.pop();
        dataset.data = val;
      });
      chart.update();
    }
    data = getCaleData()
    data[0] = y;
    data[1] = m;
    let url = '/categoriaSaida/' + y + m;
    getJSON(url, reqChartCategoria)
    listener(function () {
      url = '/categoriaSaida/' + y + m;
      getJSON(url, reqChartCategoria);
    });
  }
};

function setGrafMotVi(chart) {
  ca = document.body.querySelector('#cale');
  if (ca.value != null) {
    const reqJSONViagens = response => {
      const jsonV = JSON.parse(response.currentTarget.response);
      const mot = []
      const vi = [];
      let nomeMes = getmes();
      ////PUSH valores em MOTORISTA e VIAGENS == NULL
      if (jsonV.length == 0) {
        mot.push(["Sem Viagens este mês"]);
        vi.push(0);
      }
      //PUSH valores em MOTORISTA e VIAGENS
      for(let ind = 0 ; ind < jsonV.length; ++ind ) {
        mot.push(jsonV[ind].Motorista);
        vi.push(jsonV[ind].Viagens)
      }
      //somando total
      let soma = 0;
      let str = "";
      for(let i = 0; i < vi.length; ++i) {
        soma += vi[i];
        if(soma == 1){
          str = "Total: " + soma + " viagem";
        }else{
          str = "Total: " + soma + " viagens";
        }
      }
      //titulo e sub titulo
      chart.options.plugins.title.text = nomeMes;
      chart.options.plugins.subtitle.text = str;

      //POP em MOTORISTA e VIAGENS e suas inserções 
      chart.data.labels.pop();
      chart.data.labels = mot;
      chart.data.datasets.forEach((dataset) => {
        dataset.data.pop();
        dataset.data = vi;
      });
      chart.update();
    }
    data = getCaleData()
    data[0] = y;
    data[1] = m;
    let urlMV = '/getMotVi/' + y + m;
    getJSON(urlMV, reqJSONViagens)
    listener(function () {
      let urlMV = '/getMotVi/' + y + m;
      getJSON(urlMV, reqJSONViagens);
   });
  }
};
function setGrafCliVi(chart) {
  ca = document.body.querySelector('#cale');
  if (ca.value != null) {
    const reqJSONClientes = response => {
      const jsonV = JSON.parse(response.currentTarget.response);
      const cli = []
      const vi = [];
      let nomeMes = getmes();
      ////PUSH valores em Cliente e VIAGENS == NULL
      if (jsonV.length == 0) {
        cli.push(["Sem Viagens este mês"]);
        vi.push(0);
      }
      //PUSH valores em Cliente e VIAGENS
      for(let ind = 0 ; ind < jsonV.length; ++ind ) {
        cli.push(jsonV[ind].Cliente);
        vi.push(jsonV[ind].Viagens)
      }
      //Somando total
      let soma = 0;
      for(let i = 0; i < vi.length; ++i) {
        soma += vi[i];
      }
      //titulo e sub titulo
      chart.options.plugins.title.text = "Clientes de " + nomeMes;
      chart.options.plugins.subtitle.text = "Total: " + soma + " Viagens";

      //POP em Cliente e VIAGENS e suas inserções 
      chart.data.labels.pop();
      chart.data.labels = cli;
      chart.data.datasets.forEach((dataset) => {
        dataset.data.pop();
        dataset.data = vi;
      });
      chart.update();
    }
    data = getCaleData()
    data[0] = y;
    data[1] = m;
    let urlMV = '/getCliVi/' + y + m;
    getJSON(urlMV, reqJSONClientes)
    listener(function () {
      let urlMV = '/getCliVi/' + y + m;
      getJSON(urlMV, reqJSONClientes);
   });
  }
};
function setBGAnual(chart) {
  ca = document.body.querySelector('#cale');
  if (ca.value != null) {
    const reqJSONEntradaSaida = response => {
      const a = JSON.parse(response.currentTarget.response);
      const json = a[0];
      //setando valores Entrada e Saída
      if (json.Entrada == null) {
        json.Entrada = 0;
      } if (json.Saida == null) {
        json.Saida = 0;
      }
      json.Bruto = json.Entrada - json.Saida;
      json.Saida = json.Saida * -1;

      let val = Object.values(json);
      let nomes = Object.keys(json);
      let nomeMes = getmes();

      chart.data.labels.pop();
      chart.data.labels = [nomeMes];

      const datasets = chart.data.datasets;
      if (datasets.length > 0) {
        for (let index = 0; index < datasets.length; ++index) {

          datasets[index].data.pop();
          datasets[index].label = nomes[index];
          datasets[index].data.push(val[index]);
        }chart.update();
      }
    }
    data = getCaleData()
    data[0] = y;
    data[1] = m;
    url = '/totalGeral/' + y + m;
    getJSON(url, reqJSONEntradaSaida)
    listener(function () {
      getJSON(url, reqJSONEntradaSaida);
   });
  }
}