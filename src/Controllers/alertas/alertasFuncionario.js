export const SetSuccess = {
    alert:true,
    aTitle:'Funcionario Criado',
    aText:'Sucesso na criação de Funcionario!',
    aIcon:'success',
    scb: false,
    timer: 2000,
    rota:'/funcionarios'
}
export const SetError = {
    alert:true,
    aTitle:'ERRO - Funcionario não criado',
    aText:'Não foi possível concluir a criação de Funcionario com êxito!',
    aIcon:'error',
    scb: false,
    timer: 2000,
    rota:'/funcionarios'
}
export function UpdateSuccess(id){
    const swal={
        alert:true,
        aTitle:'Funcionario atualizado',
        aText:'Sucesso na atualização de Funcionario!',
        aIcon:'success',
        scb: false,
        timer: 2000,
        rota: '/infosFuncionario/'+id
    }
    return swal
}
export function UpdateError(id){
    return {
        alert:true,
        aTitle:'ERRO - Atualização não realizada',
        aText:'Atualização de Funcionario não foi concluída com êxito!',
        aIcon:'error',
        scb: false,
        timer: 2000,
        rota:'/infosFuncionario/'+id
    }
}
export const DelSuccess = {
    alert:true,
    aTitle:'Funcionario Deletado',
    aText:'Funcionario deletado com sucesso!',
    aIcon:'success',
    scb: false,
    timer: 2000,
    rota:'/funcionarios'
}
export const DelError = {
    alert:true,
    aTitle:'ERRO - Funcionario não deletado',
    aText:'Não foi possível apagar Funcionario com êxito!',
    aIcon:'error',
    scb: false,
    timer: 2000,
    rota:'/funcionarios'
}
