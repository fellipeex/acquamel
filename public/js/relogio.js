
//Criando data e hora
let d = new Date();
let y = d.getFullYear();
let m = d.getMonth() + 1;


function Relogio() {
  let d = new Date();
  let t = d.toLocaleTimeString();
  let lbl = document.body.querySelectorAll('#clock');
  let i;
  for (i = 0; i < lbl.length; i++) {
    lbl[i].innerHTML = t;
  }
  listenerCalen();
}
let reload = setInterval(Relogio, 100);

function addZeros(num, len) {
  let numberWithZeroes = String(num);
  let counter = numberWithZeroes.length;
  while (counter < len) {
    numberWithZeroes = "0" + numberWithZeroes;
    counter++;
  }
  return numberWithZeroes;
}

function getStrData(){
  let strData = (y + "-" + addZeros(m, 2));
  return strData;
}
function getmes(){
  mes = nomeMes(m);
  return mes;
}
function getUrlData(url) {  
  ca = document.body.querySelector('#cale'); 
  if(ca != null){
      data = ca.value.split("-");
      y = data[0];
      m = data[1];
      url = url + y + m;
    return url;
  }
}
function listener(func) {
  let mes = document.querySelectorAll('#btn-mes');
  let ca = document.body.querySelector('#cale');
  for (let i = 0; i < mes.length; i++) {
    mes[i].addEventListener('click', func, false)
  }
  ca.addEventListener('mouseout', func, false);
}
function getCaleData() {  
  ca = document.body.querySelector('#cale');
  if(ca != null){
    let data = ca.value.split("-");
    return data;
  }
}
function listenerCalen() {
  mes = document.body.querySelector('#nomeMes');
  ca = document.body.querySelector('#cale');
  if(ca != null){
    let data = ca.value.split("-");
    y = data[0];
    m = data[1];
    mes.innerHTML = nomeMes(m);
  }  
}
function meuMes() {
  //Criando elementos HTML/
  let a = document.body.querySelector('#mes');  
  //Criando elemento calendario e setando o seu valor  
  // --------CIMA
  let cima = document.createElement('div');
  cima.className="mesCima";
  // setando dados no calendario
  let strData = getStrData();
  let calendario = document.createElement('input');
  calendario.value = strData;
  calendario.type = "month";
  calendario.id = "cale";
  calendario.name= "cale";

  // setando icone
  /* let icon = document.createElement('i');
  icon.id = "ico-calendario";
  icon.className= "bi bi-calendar3";
  icon.style.fontSize= "2.0rem";
  icon.style.color="white"; */
  /* icon.addEventListener('click',function(){
    calendario.classList.toggle('show');
  }); */
  // ---------------BAIXO
  let baixo = document.createElement('div');
  baixo.className="mesBaixo";
  //Botão MENOS
  let btnMenos = document.createElement('button');
  btnMenos.id = "btn-mes";
  btnMenos.innerHTML = "<button class='btn-mes btn-outline-light '> < </button>";
  btnMenos.onclick = function(){mesMenos()};
  //Botão MAIS
  let btnMais = document.createElement('button');
  btnMais.id = "btn-mes";
  btnMais.innerHTML = "<button class='btn-mes btn-outline-light'> > </button>";
  btnMais.onclick =  function(){mesMais()};
  //Nome do Mês
  let mes =  document.createElement('h5');
  mes.id = "nomeMes";
  mes.className ="text-white"
  mes.innerHTML = nomeMes(m);

  //Exibindo
  /* cima.appendChild(icon); */
  cima.appendChild(calendario);
  baixo.appendChild(btnMenos);
  baixo.appendChild(mes);
  baixo.appendChild(btnMais);
  a.appendChild(cima);
  a.appendChild(baixo);
  
}
function mesMenos() {
  mes = document.body.querySelector('#nomeMes');
  cale = document.body.querySelector('#cale');
  if (m <= 1){
    --y;
    m = 12;
    strData = (y + "-" + addZeros(m, 2));
    cale.value = strData;
    mes.innerHTML = nomeMes(m);
  } else{
    --m;
    strData = (y + "-" + addZeros(m, 2));
    cale.value = strData;
    mes.innerHTML = nomeMes(m);
  }
}



function mesMais() {
  mes = document.body.querySelector('#nomeMes');
  cale = document.body.querySelector('#cale');
  if (m >= 12){
    ++y;
    m = 1;
    strData = (y + "-" + addZeros(m, 2));
    cale.value = strData;
    mes.innerHTML = nomeMes(m);
  } else{
    ++m;
    strData = (y + "-" + addZeros(m, 2));
    cale.value = strData;
    mes.innerHTML = nomeMes(m);
  }
}
function nomeMes(x) {
  let mes = "";
  if (x == 1)  { mes = "Janeiro" };
  if (x == 2)  { mes = "Fevereiro" };
  if (x == 3)  { mes = "Março" };
  if (x == 4)  { mes = "Abril" };
  if (x == 5)  { mes = "Maio" };
  if (x == 6)  { mes = "Junho" };
  if (x == 7)  { mes = "Julho" };
  if (x == 8)  { mes = "Agosto" };
  if (x == 9)  { mes = "Setembro" };
  if (x == 10) { mes = "Outubro" };
  if (x == 11) { mes = "Novembro" };
  if (x == 12) { mes = "Dezembro" };
  return mes;
}
// Date.prototype.getMesEmPortugues = function () {
//   if (this.getMonth() == 0) { this.mesEmPortugues = "Janeiro" };
// };
function txtMA(txt){
  let ca = document.body.querySelector('#calendario');
  if(ca != null){
    let data = ca.value.split("-");
    let y = data[0];
    let m = data[1];
    let url = txt+y+m;
    return url;
  }
}
