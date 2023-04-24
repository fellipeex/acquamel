
export function strDateYM(d) {
    let y = d.getFullYear();
    let m = d.getMonth() + 1;
    if (m < 10) {
        m = "0" + m
    }
    return "" + y + m
}

export function strUTC(d=Date) {
    const options = { timeZone: 'America/Sao_Paulo' };
    return d.toLocaleString('pt-BR', options)
}