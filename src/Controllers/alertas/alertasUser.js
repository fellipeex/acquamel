export const UsrSetSuccess = {
    alert: true,
    aTitle: 'Usuário Criado',
    aText: 'Sucesso na criação do usuário!',
    aIcon: 'success',
    scb: false,
    timer: 2000,
    rota: '/usuarios'
}
export const UsrSetError = {
    alert: true,
    aTitle: 'ERRO - Usuario não criado',
    aText: 'Criação de usuário não foi concluída com êxito!',
    aIcon: 'error',
    scb: false,
    timer: 2000,
    rota: '/novoUsuario'
}
export function UpdateSuccess(id) {
    const swal = {
        alert: true,
        aTitle: 'Usuário Atualizado',
        aText: 'Sucesso na atualização do usuário!',
        aIcon: 'success',
        scb: false,
        timer: 2000,
        rota: `/infosUsuario/${id}`
    }
    return swal
}
export function UpdateError(id) {
    return {
        alert: true,
        aTitle: 'ERRO - Usuario não foi atualizado',
        aText: 'Atualização de usuário não foi concluída!',
        aIcon: 'error',
        scb: false,
        timer: 2000,
        rota: `/infosUsuario/${id}`
    }
}
export const UsrDelSuccess = {
    alert: true,
    aTitle: 'Usuário Deletado',
    aText: 'Usuário deletado com sucesso!',
    aIcon: 'success',
    scb: false,
    timer: 2000,
    rota: '/usuarios'
}
export const UsrDelError = {
    alert: true,
    aTitle: 'ERRO - Operação não realizada',
    aText: 'Usuário não foi deletado com êxito!',
    aIcon: 'error',
    scb: false,
    timer: 2000,
    rota: '/usuarios'
}
export function SenhaSuccess(id) {
    return {
        alert: true,
        aTitle: 'Senha trocada!',
        aText: 'Senha do usuário foi trocada com sucesso!',
        aIcon: 'success',
        scb: false,
        timer: 2000,
        rota: `/editarUsuario/${id}`
    }
}
export function SenhaError(id) {
    return {
        alert: true,
        aTitle: 'ERRO - Operação não realizada',
        aText: 'Senha do usuário não foi trocada com êxito!',
        aIcon: 'error',
        scb: false,
        timer: 4000,
        rota: `/editarUsuario/${id}`
    }
}
export function SenhaIncorreta(id) {
    return {
        alert: true,
        aTitle: 'Senha incorreta',
        aText: 'A senha que está sendo digitada não coincíde.',
        aIcon: 'error',
        scb: false,
        timer: 6000,
        rota: `/editarUsuario/${id}`
    }
}
export const SenhaCreateError = {
        alert: true,
        aTitle: 'Senha incorreta',
        aText: 'A senha que está sendo digitada não coincíde com a confirmação',
        aIcon: 'error',
        scb: false,
        timer: 6000,
        rota: `/novoUsuario/`
    
}
export function UsrFotoSuccess(id) {
    return {
        alert: true,
        aTitle: 'Foto de perfil Atualizada',
        aText: 'Sucesso na atualização da imagem do usuário!',
        aIcon: 'success',
        scb: false,
        timer: 2000,
        rota: `/editarUsuario/${id}`
    }
}
export function UsrFotoError(id) {
    return {
        alert: true,
        aTitle: 'A Foto não foi Salva',
        aText: 'Erro na atualização da imagem do usuário!',
        aIcon: 'error',
        scb: false,
        timer: 2000,
        rota: `/editarUsuario/${id}`
    }
}