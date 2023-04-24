export const SetSuccess = {
    alert: true,
    aTitle: 'Entrada Criada',
    aText: 'Sucesso na criação de entrada!',
    aIcon: 'success',
    scb: false,
    timer: 2000,
    rota: '/entradas'
  }
export const SetError = {
    alert: true,
    aTitle: 'ERRO - Entrada não criada',
    aText: 'Não foi possível concluir criação de entrada!',
    aIcon: 'error',
    scb: false,
    timer: 2000,
    rota: '/entradas'
}
export function UpdateSuccess(id){
    const swal={
        alert: true,
        aTitle: 'Sucesso na atualização!',
        aText: 'Entrada atualizado com êxito!',
        aIcon: 'success',
        scb: false,
        timer: 2000,
        rota: `/infosEntrada/${id}`
    }
    return swal
}
export function UpdateError(id){
    const swal={
        alert: true,
        aTitle: 'ERRO - Atualização não realizada',
        aText: 'Atualização de Entrada não foi concluída!',
        aIcon: 'error',
        scb: false,
        timer: 2000,
        rota: `/infosEntrada/${id}`
    }
    return swal
}
export const DelSuccess = {
    alert: true,
    aTitle: 'Entrada Deletada',
    aText: 'Entrada deletada com sucesso!',
    aIcon: 'success',
    scb: false,
    timer: 2000,
    rota: '/entradas'
}
export const DelError = {
    alert: true,
    aTitle: 'ERRO - Entrada não deletada',
    aText: 'Não foi possível apagar entrada com êxito!',
    aIcon: 'error',
    scb: false,
    timer: 2000,
    rota: '/entradas'
}
