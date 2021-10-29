const express = require('express');
const app = express();

app.use('/fa', express.static(__dirname + '/node_modules/@fontawesome/fontawesome-free/css'));
app.use('/public', express.static('public'));

app.set('view-engine', 'ejs');
app.use(express.urlencoded({ extended: false }));

app.use('/', require('./router'));
app.listen(5050, ()=>{
    console.log('Server rodando em http://localhost:5050');
});