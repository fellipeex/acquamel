//-----------------------------------USUARIO
function getUserInfoById(i){
    let link = '/infosUsuario/'
    getFrame(link,i)
    recarregarTabela("#usu")
}
function getUserEditById(i){
  let link = '/editarUsuario/'
  getFrame(link,i)
  recarregarTabela("#usu")
}
//------------------------------ENTRADA
function getEntInfoById(i){
  let link = '/infosEntrada/'
  getFrame(link,i)
  recarregarTabela("#tbEnt")
}
function getEntEditById(i){
  let link = '/editarEntrada/'
  getFrame(link,i)
  recarregarTabela("#tbEnt")
}
//------------------------------SAIDA
function getSaiInfoById(i){
  let link = '/infosSaida/'
  getFrame(link,i)
  recarregarTabela("#tbSai")
}
function getSaiEditById(i){
let link = '/editarSaida/'
getFrame(link,i)
recarregarTabela("#tbSai")
}
//------------------------------CAMINHÃO
function getCamInfoById(i){
  let link = '/infosCaminhao/'
  getFrame(link,i)
  recarregarTabela("#tbCam")
}
function getCamEditById(i){
let link = '/editarCaminhao/'
getFrame(link,i)
recarregarTabela("#tbCam")
}
//------------------------------FUNCIONÁRIO
function getFuncInfoById(i){
  let link = '/infosFuncionario/'
  getFrame(link,i)
  recarregarTabela("#tbFunc")
}
function getFuncEditById(i){
let link = '/editarFuncionario/'
getFrame(link,i)
recarregarTabela("#tbFunc")
}
//------------------------------CLIENTE
function getCliInfoById(i){
  let link = '/infosCliente/'
  getFrame(link,i)
  recarregarTabela("#tbCli")

}
function getCliEditById(i){
let link = '/editarCliente/'
getFrame(link,i)
recarregarTabela("#tbCli")
}
//função para todos os frames
function getFrame(link,i){
  let div = document.getElementById('infos')
  if(document.getElementById('iframe-infos')){
    div.removeChild(document.getElementById('iframe-infos'))
  }
  let frame = document.createElement('iframe')
  let url  = link+i;
  frame.setAttribute("src", url)
  frame.setAttribute("id","iframe-infos")
  div.appendChild(frame)
  window.scrollTo(0, document.body.scrollHeight);
  
  
}
 function recarregarTabela(tb){
  let tabela  = $(tb).DataTable()
  document.getElementById('iframe-infos').addEventListener('load', () => {
    // recarrega a tabela usando dataTable().ajax.reload()
    tabela.ajax.reload(null, false);
  });
 
}



