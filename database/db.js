const mysql = require('mysql');
const conn = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DATABASE
});

conn.connect((error)=>{
    if(error){
        console.error('O erro da conexão é: ' + error);
        return
    }
    console.log('Conectado ao Banco Mysql');

})
module.exports = conn;