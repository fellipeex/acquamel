var myVar = setInterval(myTimer, 1000);

function myTimer() {
  var d = new Date();
  var t = d.toLocaleTimeString();
  var lbl = document.body.querySelectorAll('#clock');
  var i;
  for(i=0;i<lbl.length;i++){
    lbl[i].innerHTML = t;
  //document.getElementById("clock").innerHTML = t;
  };
};


function total(qtd,val){
  var q = qtd;
  var v = val;
  var t = (q*v);
  document.getElementById("total").innerHTML = t;
};