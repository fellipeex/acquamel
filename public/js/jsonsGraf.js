const cache = {};
function getCalenData() {
  let cale = document.getElementById("cale");
  return cale.value;
}
function getJSON(url, reqListener) {
  if (cache[url]) {
    reqListener(cache[url]);
  } else {
    const loadData = () => {
      const req = new XMLHttpRequest();
      req.onload = reqListener;
      req.open("get", url, true);
      req.send();
    }
    loadData();

  }
}
var ur;
var url;
var btnMes;
var ca;
var data;

//Criando request de ENTRADA E SAÍDA via JSON

function setBG(chart) {
  ca = document.body.querySelector('#cale');
  if (ca.value != null) {
    const reqJSONEntradaSaida = response => {
      const a = JSON.parse(response.currentTarget.response);
      // Removendo a chave "Agua" do objeto
      delete a[0].Agua;
      //setando valores Entrada e Saída
      if (a[0].Entrada == null) {
        a[0].Entrada = 0;
      } if (a[0].Saida == null) {
        a[0].Saida = 0;
      }
      a[0].Lucro = a[0].Entrada + a[0].Saida;
      let val = Object.values(a[0]);
      let nomes = Object.keys(a[0]);
      let nomeMes = getmes();
      chart.data.labels.pop();
      chart.data.labels = [nomeMes];
      const datasets = chart.data.datasets;
      if (datasets.length > 0) {
        for (let index = 0; index < datasets.length; ++index) {
          datasets[index].data.pop();
          datasets[index].label = nomes[index];
          datasets[index].data.push(val[index]);
        } chart.update();
      }
    }
    getJSON(getUrlData("/api/totalGeral/"), reqJSONEntradaSaida)
    listener(function () {
      getJSON(getUrlData("/api/totalGeral/"), reqJSONEntradaSaida)
    })
  }
}

function setGastos(chart) {
  ca = document.body.querySelector('#cale');
  if (ca.value != null) {
    const reqChartCategoria = response => {
      const a = JSON.parse(response.currentTarget.response);
      let cate = [];
      let val = [];
      let total = 0;
      if (a.length == 0) {
        cate = ["SEM GASTOS"];
        val = [0];
      }
      for (let i = 0; i < a.length; i++) {
        if (a[i].Categoria) {
          cate.push(a[i].Categoria);
        }
        if (a[i].Valor) {
          total += a[i].Valor;
          val.push(a[i].Valor);
        }
      }
      //declatação das variaveis
      let nomeMes = getmes();

      chart.options.plugins.title.text = nomeMes;
      chart.options.plugins.subtitle.text = "Total: R$" + total.toFixed(2);
      chart.data.labels.pop();
      chart.data.labels = cate;
      chart.data.datasets.forEach((dataset) => {
        dataset.data.pop();
        dataset.data = val;
      });
      chart.update();
    }
    getJSON(getUrlData('/api/categoriaSaida/'), reqChartCategoria)
    listener(function () {
      getJSON(getUrlData('/api/categoriaSaida/'), reqChartCategoria)
    })
  }
};
function setBGAnual(chart) {
  ca = document.body.querySelector('#cale');
  if (ca.value != null) {
    const reqJSONEntradaSaida = response => {
      const json = JSON.parse(response.currentTarget.response);
      let meses = [];
      let entradas = [];
      let saidas = [];
      let agua = []
      let lucros = [];
      let qtdE = [];
      let qtdS = [];
      let somaE = 0
      let somaS = 0
      let a = getCaleData()
      // Preenchendo arrays com valores ou 0
      if (json.length > 0) {
        for (let i = 1; i <= 12; i++) {
          let mesEncontrado = false;
          json.forEach((item) => {
            if (item.mes === i) {
              meses.push(nomeMes(i));
              entradas.push(item.totalE);
              saidas.push(item.totalS);
              lucros.push(item.totalE + item.totalS);
              agua.push(item.qtd)
              qtdE.push(item.entradas)
              qtdS.push(item.saidas)
              mesEncontrado = true;
            }
          });
          if (!mesEncontrado) {
            meses.push(nomeMes(i));
            entradas.push(0);
            saidas.push(0);
            agua.push(0)
            lucros.push(0);
          }
          
        }
          somaE = qtdE.reduce((total, ent) => total + ent);
          somaS = qtdS.reduce((total, sai) => total + sai);
        }else {
          somaE = 0
          somaS = 0
      }

      //titulo e sub titulo
      chart.options.plugins.title.text = `${a[0]}`//ano;
      chart.options.plugins.subtitle.text = `Entradas: ${somaE} | Saídas: ${somaS} nesse ano.`;
      chart.data.labels = meses;
      chart.data.datasets[0].data = entradas;
      chart.data.datasets[1].data = saidas;
      chart.data.datasets[2].data = agua;
      chart.data.datasets[3].data = lucros;
      chart.update();
    };
    getJSON(getUrlData('/api/totalGeralAnual/'), reqJSONEntradaSaida);
    listener(function () {
      getJSON(getUrlData('/api/totalGeralAnual/'), reqJSONEntradaSaida);
    });
  }
}
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
      for (let ind = 0; ind < jsonV.length; ++ind) {
        mot.push(jsonV[ind].Motorista);
        vi.push(jsonV[ind].Viagens)
      }
      //somando total
      let soma = 0;
      let str = "";
      for (let i = 0; i < vi.length; ++i) {
        soma += vi[i];
        if (soma == 1) {
          str = "Total: " + soma + " viagem";
        } else {
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
    getJSON(getUrlData('/api/getMotVi/'), reqJSONViagens)
    listener(function () {
      getJSON(getUrlData('/api/getMotVi/'), reqJSONViagens)
    });
  }
};
function setGrafCliVi(chart) {
  ca = document.body.querySelector('#cale');
  if (ca.value != null) {
    const reqJSONClientes = response => {
      const jsonV = JSON.parse(response.currentTarget.response);
      const cli = [];
      const vi = [];
      const vlr = [];
      let nomeMes = getmes();
      ////PUSH valores em Cliente e VIAGENS == NULL
      if (jsonV.length == 0) {
        cli.push(["Sem Viagens este mês"]);
        vi.push(0);
      }
      //PUSH valores em Cliente e VIAGENS
      for (let ind = 0; ind < jsonV.length; ++ind) {

        vi.push(jsonV[ind].Viagens);
        vlr.push(jsonV[ind].Valor);
        cli.push(jsonV[ind].Cliente + ` (${jsonV[ind].Viagens})`);
      }
      //Somando total
      let soma = 0;
      for (let i = 0; i < vi.length; ++i) {
        soma += vi[i];
      }
      //titulo e sub titulo
      chart.options.plugins.title.text = nomeMes;
      chart.options.plugins.subtitle.text = "Total: " + soma + " Viagens";
      //POP em Cliente e VIAGENS e suas inserções 
      chart.data.labels.pop()
      chart.data.labels = cli;

      chart.data.datasets.forEach((dataset) => {
        dataset.data.pop();
        dataset.data = vlr;
        /*dataset.data = vi; */
        dataset.label = "Valor Total"

      });
      chart.update();
    }
    getJSON(getUrlData('/api/getCliVi/'), reqJSONClientes)
    listener(function () {
      getJSON(getUrlData('/api/getCliVi/'), reqJSONClientes)
    });
  }
};