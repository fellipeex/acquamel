const conn = require('../database/db');

//------------------------------------------------------------------------USUÁRIOS
exports.saveUsr = (req,res)=>{
    const user = req.body.user;
    const email = req.body.email;
    const senha = req.body.senha;
    const classe = req.body.classe;
    conn.query('INSERT INTO tb_usuario SET ?', {u_nome:user , u_email:email, u_senha:senha, u_class:classe}, (error, results) =>{
        if(error){
            console.log(error);
        }else { 
            res.redirect('/usuarios');
        }
    })
}
exports.updateUsr = (req,res)=>{
    const id = req.body.id;
    const user = req.body.user;
    const email = req.body.email;
    const senha = req.body.senha;
    const classe = req.body.classe;
    const foto = req.body.foto;
    conn.query('UPDATE tb_usuario SET ? WHERE u_id = ?', [{u_nome:user , u_email:email, u_senha:senha, u_class:classe, u_foto:foto}, id], (error, results) =>{
        if(error){
            console.log(error);
        }else { 
            res.redirect('/usuarios');
        }
    })
}

//------------------------------------------------------------------------ENTRADA
exports.saveEnt = (req,res)=>{
    const nomeEnt = req.body.nomeEnt;
    const camEnt = req.body.camEnt;
    const cliEnt = req.body.cliEnt;
    const vendEnt = req.body.vendEnt;
    const motoEnt = req.body.motoEnt;
    const valorEnt = req.body.valorEnt;
    const qtd = req.body.qtdEnt;
    const total = (qtd * valorEnt);  
    const dataEnt = req.body.dataEnt;
    const obsEnt = req.body.obsEnt;


    conn.query('INSERT INTO tb_pedido SET ?', {ped_nome:nomeEnt, cam_id:camEnt, cli_id:cliEnt, vendedor_id:vendEnt, motorista_id:motoEnt,  ped_valor:valorEnt, ped_qtd:qtd, ped_total:total, ped_data:dataEnt, ped_obs:obsEnt}, (error, results) =>{
        if(error){
            console.log(error);
        }else { 
            res.redirect('/entrada');
        }
    })
}
exports.updateEnt = (req,res)=>{
    const id = req.body.id
    const nomeEnt = req.body.nomeEnt;
    const camEnt = req.body.camEnt;
    const cliEnt = req.body.cliEnt;
    const vendEnt = req.body.vendEnt;
    const motoEnt = req.body.motoEnt;
    const valorEnt = req.body.valorEnt;
    const qtd = req.body.qtdEnt;
    const total = qtd*valorEnt;
    const dataEnt = req.body.dataEnt;
    const obsEnt = req.body.obsEnt;
    conn.query('UPDATE tb_pedido SET ? WHERE ped_id = ?', [{pedido_nome:nomeEnt, cam_id:camEnt, cli_id:cliEnt, vendedor_id:vendEnt, motorista_id:motoEnt,  ped_valor:valorEnt, ped_qtd:qtd, ped_total:total, ped_data:dataEnt, ped_obs:obsEnt}, id], (error, results) =>{
        if(error){
            console.log(error);
        }else { 
            res.redirect('/entrada');
        }
    })
}


//------------------------------------------------------------------------SAIDA
exports.saveSaida = (req,res)=>{
    const nomeSaida = req.body.nomeSaida;
    const valorSaida = req.body.valorSaida;
    const dataSaida = req.body.dataSaida;
    const obsSaida = req.body.obsSaida;
    

    conn.query('INSERT INTO tb_saida SET ?', {saida_nome:nomeSaida, saida_valor:valorSaida, saida_data:dataSaida, saida_obs:obsSaida}, (error, results) =>{
        if(error){
            console.log(error);
        }else { 
            res.redirect('/saida');
        }
    })
}
exports.updateSaida = (req,res)=>{
    const id = req.body.id;
    const nomeSaida = req.body.nomeSaida;
    const valorSaida = req.body.valorSaida;
    const dataSaida = req.body.dataSaida;
    const obsSaida = req.body.obsSaida;
    conn.query('UPDATE tb_saida SET ? WHERE saida_id = ?', [{saida_nome:nomeSaida, saida_valor:valorSaida, saida_data:dataSaida, saida_obs:obsSaida}, id], (error, results) =>{
        if(error){
            console.log(error);
        }else { 
            res.redirect('/saida');
        }
    })
}



//------------------------------------------------------------------------CAMINHÃO
exports.saveCam = (req,res)=>{
    const nomeCam = req.body.nomeCam;
    const placaCam = req.body.placaCam;
    const tamanhoCam = req.body.tamanhoCam;
    const anoCam = req.body.anoCam;
    const renavam = req.body.renavam;


    conn.query('INSERT INTO tb_caminhao SET ?', {cam_nome:nomeCam, cam_placa:placaCam, cam_tamanho:tamanhoCam, cam_ano:anoCam, cam_renavam:renavam}, (error, results) =>{
        if(error){
            console.log(error);
        }else { 
            res.redirect('/caminhoes');
        }
    })
}
exports.updateCam = (req,res)=>{
    const id = req.body.id
    const nomeCam = req.body.nomeCam;
    const placaCam = req.body.placaCam;
    const tamanhoCam = req.body.tamanhoCam;
    const anoCam = req.body.anoCam;
    const renavam = req.body.renavam;
    conn.query('UPDATE tb_caminhao SET ? WHERE cam_id = ?', [{cam_nome:nomeCam, cam_placa:placaCam, cam_tamanho:tamanhoCam, cam_ano:anoCam, cam_renavam:renavam}, id], (error, results) =>{
        if(error){
            console.log(error);
        }else { 
            res.redirect('/caminhoes');
        }
    })
}
//------------------------------------------------------------------------FUNCIONÁRIOS
exports.saveFunc = (req,res)=>{
    const nomeFunc = req.body.nomeFunc;
    const ctpsFunc = req.body.ctpsFunc;
    const rgFunc = req.body.rgFunc;
    const cpfFunc = req.body.cpfFunc;
    const endFunc = req.body.endFunc;
    const bairroFunc = req.body.bairroFunc;
    const cepFunc = req.body.cepFunc;
    const statusFunc = req.body.statusFunc;
    const salarioFunc = req.body.salarioFunc;
    const cargoFunc = req.body.cargoFunc;
    const entradaFunc = req.body.entradaFunc;
    const saidaFunc = req.body.saidaFunc;
    conn.query('INSERT INTO tb_funcionario SET ?', {func_nome:nomeFunc , func_ctps:ctpsFunc, func_rg:rgFunc, func_cpf:cpfFunc, func_endereco:endFunc,
         func_bairro:bairroFunc, func_cep:cepFunc, func_status:statusFunc, func_salario:salarioFunc, func_cargo:cargoFunc, func_entrada:entradaFunc, func_saida:saidaFunc}, (error, results) =>{
        if(error){
            console.log(error);
        }else { 
            res.redirect('/funcionarios');
        }
    })
}
exports.updateFunc = (req,res)=>{
    const id = req.body.id;
    const nomeFunc = req.body.nomeFunc;
    const ctpsFunc = req.body.ctpsFunc;
    const rgFunc = req.body.rgFunc;
    const cpfFunc = req.body.cpfFunc;
    const endFunc = req.body.endFunc;
    const bairroFunc = req.body.bairroFunc;
    const cepFunc = req.body.cepFunc;
    const statusFunc = req.body.statusFunc;
    const salarioFunc = req.body.salarioFunc;
    const cargoFunc = req.body.cargoFunc;
    const entradaFunc = req.body.entradaFunc;
    const saidaFunc = req.body.saidaFunc;
    conn.query('UPDATE tb_funcionario SET ? WHERE func_id = ?', [{func_nome:nomeFunc , func_ctps:ctpsFunc, func_rg:rgFunc, func_cpf:cpfFunc, func_endereco:endFunc,
        func_bairro:bairroFunc, func_cep:cepFunc, func_status:statusFunc, func_salario:salarioFunc, func_cargo:cargoFunc, func_entrada:entradaFunc, func_saida:saidaFunc}, id], (error, results) =>{
        if(error){
            console.log(error);
        }else { 
            res.redirect('/funcionarios');
        }
    })
}
//------------------------------------------------------------------------CLIENTES
exports.saveCli = (req,res)=>{
    const nomeCli = req.body.nomeCli;
    const cpfCli = req.body.cpfCli;
    const cnpjCli = req.body.cnpjCli;
    const endCli = req.body.endCli;
    const bairroCli = req.body.bairroCli;
    const cepCli = req.body.cepCli;
    const telefoneCli = req.body.telefoneCli;
    const celularCli = req.body.celularCli;
    const apelidoCli = req.body.apelidoCli;
    conn.query('INSERT INTO tb_cliente SET ?', {cli_nome:nomeCli , cli_cpf:cpfCli, cli_cnpj:cnpjCli, cli_endereco:endCli, cli_bairro:bairroCli, cli_cep:cepCli, cli_telefone:telefoneCli, cli_celular:celularCli, cli_apelido:apelidoCli}, (error, results) =>{
        if(error){
            console.log(error);
        }else { 
            res.redirect('/clientes');
        }
    })
}
exports.updateCli = (req,res)=>{
    const id = req.body.id;
    const nomeCli = req.body.nomeCli;
    const cpfCli = req.body.cpfCli;
    const cnpjCli = req.body.cnpjCli;
    const endCli = req.body.endCli;
    const bairroCli = req.body.bairroCli;
    const cepCli = req.body.cepCli;
    const telefoneCli = req.body.telefoneCli;
    const celularCli = req.body.celularCli;
    const apelidoCli = req.body.apelidoCli;
    conn.query('UPDATE tb_cliente SET ? WHERE cli_id = ?', [{cli_nome:nomeCli , cli_cpf:cpfCli, cli_cnpj:cnpjCli, cli_endereco:endCli, cli_bairro:bairroCli,
         cli_cep:cepCli, cli_telefone:telefoneCli, cli_celular:celularCli, cli_apelido:apelidoCli}, id], (error, results) =>{
        if(error){
            console.log(error);
        }else { 
            res.redirect('/clientes');
        }
    })
}
