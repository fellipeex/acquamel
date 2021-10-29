const mysql = require('mysql');
const conn = mysql.createConnection({
    host: 'localhost',
    user: 'aqua_user',
    password: 'Zezinho10@@',
    database: 'dbaquamel'
});

conn.connect((error)=>{
    if(error){
        console.error('O erro da conexão é: ' + error);
        return
    }
    console.log('Conectado ao Banco Mysql');

})
module.exports = conn;