export const SetSuccess = {
    alert:true,
    aTitle:'Caminhão Criado',
    aText:'Sucesso na criação de Caminhão!',
    aIcon:'success',
    scb: false,
    timer: 2000,
    rota:'/caminhoes'
}
export const SetError = {
    alert:true,
    aTitle:'ERRO - Caminhão não criado',
    aText:'Não foi possível concluir a criação de Caminhão com êxito!',
    aIcon:'error',
    scb: false,
    timer: 2000,
    rota:'/caminhoes'
}
export function UpdateSuccess(id){
    const swal={
        alert:true,
        aTitle:'Caminhão atualizado',
        aText:'Sucesso na atualização de Caminhão!',
        aIcon:'success',
        scb: false,
        timer: 2000,
        rota: '/infosCaminhao/'+id
    }
    return swal
}
export function UpdateError(id){
    return {
        alert:true,
        aTitle:'ERRO - Atualização não realizada',
        aText:'Atualização de Caminhão não foi concluída com êxito!',
        aIcon:'error',
        scb: false,
        timer: 2000,
        rota:'/infosCaminhao/'+id
    }
}
export const DelSuccess = {
    alert:true,
    aTitle:'Caminhão Deletada',
    aText:'Caminhão deletada com sucesso!',
    aIcon:'success',
    scb: false,
    timer: 2000,
    rota:'/caminhoes'
}
export const DelError = {
    alert:true,
    aTitle:'ERRO - Caminhão não deletada',
    aText:'Não foi possível apagar Caminhão com êxito!',
    aIcon:'error',
    scb: false,
    timer: 2000,
    rota:'/caminhoes'
}
