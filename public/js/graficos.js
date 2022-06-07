const COR = {
    verde:'rgb(18,231,22,0.7)',vermelho:'rgb(238,17,42,0.7)',
    azul1:'rgb(28,56,217,0.7)',azul2:'rgb(19,110,240,0.7)',azul3:'rgb(18,161,230,0.7)',azul4:'rgb(19,110,240,0.7)',
    amarelo1:'rgb(255,229,41,0.5)',amarelo2:'rgb(204,184,33,0.5)',amarelo3:'rgb(255,239,117,0.5)',amarelo4:'rgb(128,115,20,0.5)',amarelo5:'rgb(128,119,59,0.7)',
    ciano1:'rgb(13,202,240,0.5)',ciano2:'rgb(9,148,176,0.5)',ciano3:'rgb(11,180,214,0.5)',ciano4:'rgb(6,94,112,0.5)',ciano5:'rgb(38,219,255,0.7)',
    laranha:'rgb(41, 133, 232,0.5)',roxo:'rgb(101,18,230,0.5)'
};
const BORDA ={
    verde:'rgb(3, 101, 24)',vermelho:'rgb(222,22,22,1)',
    azul1:'rgb(28,56,217)',azul2:'rgb(19,110,240)',azul3:'rgb(18,161,230)',azul4:'rgb(19,110,240)',
    amarelo1:'rgb(255,229,41)',amarelo5:'rgb(128,119,59)',amarelo3:'rgb(255,239,117)',amarelo4:'rgb(128,115,20)',amarelo2:'rgb(204,184,33)',
    ciano1:'rgb(13,202,240,0.5)',ciano2:'rgb(9,148,176,0.5)',ciano3:'rgb(11,180,214,0.5)',ciano4:'rgb(6,94,112,0.5)',ciano5:'rgb(38,219,255,0.7)',
    laranja:'rgb(41, 133, 232,1)',roxo:'rgb(101,18,230)'
};
function graficos(){
    chartBG();
    chartGastos();
    chartMotVi();
    chartCliVi();
    chartBGAnual();
    btnGraf();
};
function chartBG(){
    let ctx = document.getElementById("graf1");
    let config = {
        type: 'bar',
        data: {
            labels:["mes"],
            datasets: [{
                data: [30],
                label: "Entrada",
                backgroundColor:COR.verde,
                borderColor:BORDA.verde,
                borderWidth: 2,
                borderRadius: 15
            },
            {
                data: [20],
                label: "Saída",
                backgroundColor:COR.vermelho,
                borderColor: BORDA.vermelho,
                borderWidth: 2,
                borderRadius: 15
            },
            {
                label: "Bruto",
                data: [10],
                backgroundColor: COR.azul1,
                borderColor: COR.azul1,
                pointRadius: 10,
                pointHoverRadius: 15,
                type: 'line'
            }
        ]
        },
        options: {
            interaction:{
                axis: 'x',
                mode: 'nearest'
            },
            animation:{ 
                duration:200
            },
            scales:{
                y:{
                    display:true
                }
            },
            plugins:{
                tooltip:{
                    animation:false
                }
            } 
        }
    };
    
    const cBalanco = new Chart(ctx, config);
    setBalanco(cBalanco);
    
}
function chartGastos(){
    let ctx = document.getElementById("graf2");
    let cores = new Array
    cores.push([COR.azul1,COR.azul2,COR.azul3,COR.azul4,COR.roxo]);
    cores.push([BORDA.azul1,BORDA.azul2,BORDA.azul3,BORDA.azul4,BORDA.roxo]);  
   
   /* 
    cores.push([COR.ciano1,COR.ciano2,COR.ciano3,COR.ciano4,COR.ciano5]);
    cores.push([BORDA.ciano1,BORDA.ciano2,BORDA.ciano3,BORDA.ciano4,BORDA.ciano5]);  */
    let config = {
        type: 'doughnut',
        data: {
            labels: ['label1','label1','label3'],
            datasets: [{
                label: "Gastos",
                data: [10,20,10],
                backgroundColor: cores[0],
                borderColor: cores[1],
                borderWidth: 2
            }]
        },
        options: {
            animation:{ 
                duration:200
            },
            plugins:{
                title:{
                    display: true
                },
                subtitle:{
                    display: true
                },
                legend:{
                    display:true
                },
                tooltip:{
                    animation:false
                }
            } 
        }
    };
    const cGastos = new Chart(ctx, config);
    setGastos(cGastos);
};
function chartMotVi(){
    let ctx = document.getElementById("graf3");
    let cores = Array();
    cores.push([COR.amarelo1, COR.amarelo2,COR.amarelo3,COR.amarelo4,COR.amarelo5]);
    cores.push([BORDA.amarelo1, BORDA.amarelo2,BORDA.amarelo3,BORDA.amarelo4,BORDA.amarelo5])
    let config = {
        type: 'polarArea',
        data: {
            labels:["Mot1","Mot2","Mot3"],
            datasets: [{
                data: [1,2,3],
                label: ["mes"],
                backgroundColor:cores[0],
                borderColor:cores[1],
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                    display:true
                },
                title: {
                    display: true,
                    font:{  
                        size: 22
                    }
                },
                subtitle:{
                    display: true,
                    font:{  
                        size: 14
                    }
                },
                tooltip:{
                    animation:false
                }
            }
        }
    };
    
    const cViagens = new Chart(ctx, config);
    setGrafMotVi(cViagens);
};
function chartCliVi(){
    let ctx = document.getElementById("graf4");
    let cores = Array();
    cores.push([COR.ciano1,COR.ciano2,COR.ciano3,COR.ciano4,COR.ciano5]);
    cores.push([BORDA.ciano1,BORDA.ciano2,BORDA.ciano3,BORDA.ciano4,BORDA.ciano5]);
    let config = {
        type: 'polarArea',
        data: {
            labels:["Cli1","Cli2","Cli3"],
            datasets: [{
                data: [1,2,3],
                label: ["mes"],
                backgroundColor:cores[0],
                borderColor:cores[1],
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                    display:true
                },
                title: {
                    display: true
                },
                subtitle:{
                    display: true
                },
                tooltip:{
                    animation:false
                }
            }
        }
    };
    
    const cCliVi = new Chart(ctx, config);
    setGrafCliVi(cCliVi);
};
function chartBGAnual(){
    let ctx = document.getElementById("graf5");
    let config = {
        type: 'bar',
        data: {
            labels:["mes"],
            datasets: [{
                data: [30],
                label: "Entrada",
                backgroundColor:COR.verde,
                borderColor:BORDA.verde,
                borderWidth: 2,
                borderRadius: 15
            },
            {
                data: [20],
                label: "Saída",
                backgroundColor:COR.vermelho,
                borderColor: BORDA.vermelho,
                borderWidth: 2,
                borderRadius: 15
            },
            {
                label: "Bruto",
                data: [10],
                backgroundColor: COR.azul1,
                borderColor: COR.azul1,
                pointRadius: 10,
                pointHoverRadius: 15,
                type: 'line'
            }
        ]
        },
        options: {
            interaction:{
                axis: 'x',
                mode: 'nearest'
            },
            animation:{ 
                duration:200
            },
            scales:{
                y:{
                    display:true
                }
            },
            plugins:{
                tooltip:{
                    animation:false
                }
            } 
        }
    };
    
    const cBGA = new Chart(ctx, config);
    setBGAnual(cBGA);
    
}
function btnGraf(){
    let bx = document.body.querySelectorAll("canvas")
    let row = document.body.querySelectorAll("#rowGraf");
    for(let i = 0; i< row.length;i++){ 
        let btnMov = document.createElement('button');
        btnMov.className = "btn btn-outline-light";
        btnMov.draggable = true;
        btnMov.innerHTML= "<i class='bi bi-arrows-move'></i>";
        let icone = document.createElement('i');
        icone.className = "bi bi-eye-slash-fill";
        let btnView = document.createElement('button');
        btnView.className = "btn btn-outline-light";
        btnView.appendChild(icone)
        btnView.onclick = function() {  
            ocultar(bx[i]);
            icoOlho(icone);
        };
        row[i].appendChild(btnMov);
        row[i].appendChild(btnView);
        // bxGraf.textContent = '<button class="btn btn-outline-dark" draggable="true"><i class="bi bi-eye-fill"></i> </button>';
    }
}
function ocultar(canvas){
    canvas.classList.toggle('oculto');
}
function icoOlho(btn){
    btn.classList.toggle('bi-eye-slash-fill');
    btn.classList.toggle('bi-eye-fill');
}

