export const SetSuccess = {
    alert:true,
    aTitle:'Cliente Criado',
    aText:'Sucesso na criação de Cliente!',
    aIcon:'success',
    scb: false,
    timer: 2000,
    rota:'/clientes'
}
export const SetError = {
    alert:true,
    aTitle:'ERRO - Cliente não criado',
    aText:'Não foi possível concluir a criação de Cliente com êxito!',
    aIcon:'error',
    scb: false,
    timer: 2000,
    rota:'/clientes'
}
export function UpdateSuccess(id){
    const swal={
        alert:true,
        aTitle:'Cliente atualizado',
        aText:'Sucesso na atualização de Cliente!',
        aIcon:'success',
        scb: false,
        timer: 2000,
        rota: '/infosCliente/'+id
    }
    return swal
}
export function UpdateError(id){
    return {
        alert:true,
        aTitle:'ERRO - Atualização não realizada',
        aText:'Atualização de Cliente não foi concluída com êxito!',
        aIcon:'error',
        scb: false,
        timer: 2000,
        rota:'/infosCliente/'+id
    }
}
export const DelSuccess = {
    alert:true,
    aTitle:'Cliente Deletado',
    aText:'Cliente deletado com sucesso!',
    aIcon:'success',
    scb: false,
    timer: 2000,
    rota:'/clientes'
}
export function DelError(error) {
    return {alert:true,
    aTitle:'ERRO - Cliente não deletado',
    aText:'Problema ao apagar Cliente '+error,
    aIcon:'error',
    scb: false,
    timer: 2000,
    rota:'/clientes'
}}
