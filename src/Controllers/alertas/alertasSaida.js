export const SetSuccess = {
    alert: true,
    aTitle: 'Saída Criada',
    aText: 'Sucesso na criação de Saída!',
    aIcon: 'success',
    scb: false,
    timer: 2000,
    rota: '/saidas'
  }
export const SetError = {
    alert: true,
    aTitle: 'ERRO - Saída não criada',
    aText: 'Não foi possível concluir criação de Saída!',
    aIcon: 'error',
    scb: false,
    timer: 2000,
    rota: '/saidas'
}
export function UpdateSuccess(id){
    const swal={
        alert: true,
        aTitle: 'Sucesso na atualização!',
        aText: 'Saída atualizado com êxito!',
        aIcon: 'success',
        scb: false,
        timer: 2000,
        rota: `/infosSaida/${id}`
    }
    return swal
}
export function UpdateError(id){
    return {
        alert: true,
        aTitle: 'ERRO - Atualização não realizada',
        aText: 'Atualização de Saída não foi concluída!',
        aIcon: 'error',
        scb: false,
        timer: 2000,
        rota: `/infosSaida/${id}`
    }
}
export const DelSuccess = {
    alert: true,
    aTitle: 'Saída Deletada',
    aText: 'Saída deletada com sucesso!',
    aIcon: 'success',
    scb: false,
    timer: 2000,
    rota: '/saidas'
}
export const DelError = {
    alert: true,
    aTitle: 'ERRO - Saída não deletada',
    aText: 'Não foi possível apagar Saída com êxito!',
    aIcon: 'error',
    scb: false,
    timer: 2000,
    rota: '/saidas'
}
