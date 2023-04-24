export function LOGINSUCESS(nome){
    return {
        alert:true,
        aTitle:'Bem vindo ' + nome,
        aText:'Usuário autenticado com sucesso!',
        aIcon:'success',
        scb: true,
        timer: 3000,
        rota:'/'
    }
}
export const ERROLOGIN = {
    alert:true,
    aTitle:'Erro - Login',
    aText:'E-mail e/ou Senha incorretos',
    aIcon:'error',
    scb: false,
    timer: 3000,
    rota:'/login'
}
export const ERROBD = {
    alert:true,
    aTitle:'ERRO - Banco de dados',
    aText:'Problemas de com conexão com o banco de dados',
    aIcon:'error',
    scb: false,
    timer: 3000,
    rota:'/login'
}
export const NOAUTH = {
    alert:true,
    aTitle:'Você não tem Permissão',
    aText:'Usuário sem permissão para o solicitar acesso ao recurso',
    aIcon:'error',
    scb: false,
    timer: 2000,
    rota:'/'
}
export const BLOCKBAN = {
    alert:true,
    aTitle:'Conta Bloqueada',
    aText:'Sua conta foi bloqueada devido a muitas tentativas de login falhas. Por favor, contate um Desenvolvedor.',
    aIcon:'error',
    scb: false,
    timer: 3000,
    rota:'/login'
  }
export function NOTFOUND(err){
    return {
        alert:true,
        aTitle:'Problema na consulta',
        aText:''+err,
        aIcon:'error',
        scb: true,
        timer: 3000,
        rota:'/'
    }
} 
