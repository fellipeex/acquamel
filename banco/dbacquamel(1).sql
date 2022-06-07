-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 07-Jun-2022 às 21:11
-- Versão do servidor: 10.4.20-MariaDB
-- versão do PHP: 7.3.29

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `dbacquamel`
--

-- --------------------------------------------------------

--
-- Estrutura da tabela `tb_caminhao`
--

CREATE TABLE `tb_caminhao` (
  `cam_id` int(11) NOT NULL,
  `cam_placa` varchar(11) NOT NULL,
  `cam_tamanho` float NOT NULL,
  `cam_ano` int(4) NOT NULL,
  `cam_nome` varchar(40) NOT NULL,
  `cam_renavam` varchar(40) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Extraindo dados da tabela `tb_caminhao`
--

INSERT INTO `tb_caminhao` (`cam_id`, `cam_placa`, `cam_tamanho`, `cam_ano`, `cam_nome`, `cam_renavam`) VALUES
(1, 'paz-1010', 25, 2016, 'Caminhão azul2', 'CODE-REN4V4N'),
(2, 'dnv-1072', 25, 1989, 'Caminhão fodabagarai', 'CODE-REN4V4N');

-- --------------------------------------------------------

--
-- Estrutura da tabela `tb_cliente`
--

CREATE TABLE `tb_cliente` (
  `cli_id` int(11) NOT NULL,
  `cli_nome` varchar(100) NOT NULL,
  `cli_cpf` int(20) NOT NULL,
  `cli_cnpj` int(20) NOT NULL,
  `cli_endereco` varchar(66) NOT NULL,
  `cli_bairro` varchar(44) NOT NULL,
  `cli_cep` int(10) NOT NULL,
  `cli_telefone` int(10) NOT NULL,
  `cli_celular` int(15) NOT NULL,
  `cli_apelido` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Extraindo dados da tabela `tb_cliente`
--

INSERT INTO `tb_cliente` (`cli_id`, `cli_nome`, `cli_cpf`, `cli_cnpj`, `cli_endereco`, `cli_bairro`, `cli_cep`, `cli_telefone`, `cli_celular`, `cli_apelido`) VALUES
(1, 'Padaria Karina', 123456, 2147483647, 'Rua manoel ferreira pires, 22', 'Colorado', 3383, 0, 0, 'PK'),
(4, 'WILL SALLON - BARBEIRO', 2147483647, 2147483647, ' rUA TAL', 'NÃO SEI OQ LA', 3124501, 1189898989, 2147483647, 'WILL');

-- --------------------------------------------------------

--
-- Estrutura da tabela `tb_funcionario`
--

CREATE TABLE `tb_funcionario` (
  `func_id` int(11) NOT NULL,
  `func_nome` varchar(100) NOT NULL,
  `func_ctps` varchar(20) NOT NULL,
  `func_rg` varchar(15) NOT NULL,
  `func_cpf` varchar(11) NOT NULL,
  `func_endereco` varchar(200) NOT NULL,
  `func_bairro` varchar(50) NOT NULL,
  `func_cep` int(15) NOT NULL,
  `func_status` varchar(15) NOT NULL,
  `func_salario` double(11,2) NOT NULL,
  `func_cargo` varchar(40) NOT NULL,
  `func_entrada` datetime NOT NULL,
  `func_saida` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `tb_funcionario`
--

INSERT INTO `tb_funcionario` (`func_id`, `func_nome`, `func_ctps`, `func_rg`, `func_cpf`, `func_endereco`, `func_bairro`, `func_cep`, `func_status`, `func_salario`, `func_cargo`, `func_entrada`, `func_saida`) VALUES
(1, 'Luiz Harry Potter', '123456123456', '395478547', '12121278910', 'Rua endereço de tal não sei das quantas, 22 Casa 7', 'Vila Tal e Etc', 3276010, 'Ligado', 1500.00, 'Desenvolvedor WEB', '2022-01-06 00:00:00', '0000-00-00 00:00:00'),
(2, 'LUIZ FELIPE SANTOS DO CARMO', '3453453', '3453453', '345345', 'Rua Lago das Rosas, 22', 'Vila Tal', 3383, 'Desligado', 1212.44, 'Caminhoneiro', '2022-01-05 00:00:00', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Estrutura da tabela `tb_pedido`
--

CREATE TABLE `tb_pedido` (
  `ped_id` int(11) NOT NULL,
  `ped_nome` varchar(60) NOT NULL,
  `cam_id` int(11) NOT NULL,
  `cli_id` int(11) NOT NULL,
  `vendedor_id` int(11) NOT NULL,
  `motorista_id` int(11) NOT NULL,
  `ped_valor` float(11,2) NOT NULL,
  `ped_qtd` int(11) NOT NULL,
  `total` float NOT NULL,
  `data` datetime NOT NULL,
  `ped_obs` varchar(1000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Extraindo dados da tabela `tb_pedido`
--

INSERT INTO `tb_pedido` (`ped_id`, `ped_nome`, `cam_id`, `cli_id`, `vendedor_id`, `motorista_id`, `ped_valor`, `ped_qtd`, `total`, `data`, `ped_obs`) VALUES
(1, 'Vende de agua para Karina', 1, 1, 1, 2, 17.33, 30, 519.9, '2022-04-13 00:00:00', ''),
(2, 'Venda TESTE 2', 1, 4, 1, 2, 66.00, 66, 4356, '2022-04-13 00:00:00', ''),
(3, 'ENTRADA DZMBR', 2, 4, 1, 2, 11.00, 11, 121, '2021-12-17 00:00:00', ''),
(4, 'ent TESTE 2', 1, 1, 1, 2, 66.00, 12, 792, '2022-01-06 00:00:00', ''),
(5, 'teste3', 1, 1, 1, 1, 30.00, 13, 390, '2022-02-22 00:00:00', ''),
(6, 'NOVA ENT', 2, 1, 1, 1, 12.00, 12, 144, '2021-12-17 00:00:00', ''),
(7, 'teste', 1, 1, 1, 1, 33.33, 100, 3333, '2021-12-16 00:00:00', ''),
(8, 'jasjda', 1, 1, 1, 1, 2.00, 2, 4, '2021-12-16 00:00:00', 'teste3'),
(9, 'Pedido Março', 2, 4, 2, 1, 111.00, 10, 11111, '2022-05-08 16:18:55', '');

-- --------------------------------------------------------

--
-- Estrutura da tabela `tb_saida`
--

CREATE TABLE `tb_saida` (
  `saida_id` int(11) NOT NULL,
  `saida_nome` varchar(100) NOT NULL,
  `saida_categoria` varchar(40) NOT NULL,
  `total` float(11,2) NOT NULL,
  `data` datetime NOT NULL,
  `saida_obs` varchar(1000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `tb_saida`
--

INSERT INTO `tb_saida` (`saida_id`, `saida_nome`, `saida_categoria`, `total`, `data`, `saida_obs`) VALUES
(1, 'Pagamento Secretária', 'SALARIO', -1500.00, '2022-02-04 00:00:00', 'sem obs'),
(2, 'GASOSA CAM 2', 'GASOLINA', -100.00, '2021-12-16 00:00:00', 'sem obs'),
(3, 'INTERNET', 'DESPEZAS', -111.00, '2022-02-17 00:00:00', '1'),
(5, 'luz', 'DESPEZAS', -250.00, '2022-02-04 00:00:00', ''),
(6, 'GASOSA CAM 3', 'GASOLINA', -450.00, '2022-03-09 00:00:00', ''),
(7, 'FUTURA', 'DESCONHECIDA', -100.00, '2022-01-11 00:00:00', 'Data teste lançada para ver a capacidade de desenrolar do sistema.'),
(8, 'JANEIRO', 'GASOSA', -99.50, '2022-01-19 00:00:00', 'Data 2 teste lançada para ver a capacidade de desenrolar do sistema.'),
(9, 'Nova saida', 'DESPEZAS', -2000.00, '2021-12-15 00:00:00', ''),
(11, 'TESTE ABRIL', 'DESPEZA1', -157.00, '2022-04-25 00:00:00', ''),
(12, 'TESTE ABRIL2', 'GASOLINA', -22.00, '2022-04-22 00:00:00', '');

-- --------------------------------------------------------

--
-- Estrutura da tabela `tb_usuario`
--

CREATE TABLE `tb_usuario` (
  `u_id` int(11) NOT NULL,
  `u_nome` varchar(100) NOT NULL,
  `u_email` varchar(100) NOT NULL,
  `u_senha` varchar(100) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `u_last_login` date DEFAULT NULL,
  `u_foto` varchar(4000) NOT NULL,
  `u_class` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Extraindo dados da tabela `tb_usuario`
--

INSERT INTO `tb_usuario` (`u_id`, `u_nome`, `u_email`, `u_senha`, `u_last_login`, `u_foto`, `u_class`) VALUES
(1, 'Luiz Fellipe Guimarães Zoio', 'fellipe@fellipe', '$2b$08$iKgL.dxjXbWfpGXRfCseIua6/RnX98t8xMjmC8xPV09tINvtjz40u', '0000-00-00', '', 'admin'),
(3, 'fellipix', 'fe@fe', '', '0000-00-00', '', 'comum'),
(6, 'Luiz', 'fellipeex@hotmail.com', '', '0000-00-00', '', 'admin'),
(12, 'TESTANDO', '1233@1hfhee.com', '$2a$08$VbR/LThzgkCIF', NULL, '', 'comum'),
(13, 'WEPPA123', 'fee@fee', '$2a$08$fK6E/j222vJrf25WzX8W3O5tWtgWkl.I8BC0uT6wxrnNaRlCEa4ie', NULL, '', 'comum'),
(14, 'teste', 'teste@teste', '$2b$08$pHPV7oj9.P0c4mRer7.QCOB6lri5LUA/1vHx04lOwJ31X0xxYfEJe', NULL, 'sem', 'comum'),
(16, '123', '123@123.com', '$2a$08$.ITHDLfqNMc1siL7LtXtC.THYL3NiNwDPL7L90/UhEJyvcHc.znRu', NULL, '', 'admin'),
(17, 'aaron', 'aaron@gmail.com', '$2b$08$QYsGLhXnkcyzdk6zf6jODeReCBkNN.IJb5ZN9qljDPCDUpn0jwc8G', NULL, '', 'comum');

--
-- Índices para tabelas despejadas
--

--
-- Índices para tabela `tb_caminhao`
--
ALTER TABLE `tb_caminhao`
  ADD PRIMARY KEY (`cam_id`);

--
-- Índices para tabela `tb_cliente`
--
ALTER TABLE `tb_cliente`
  ADD PRIMARY KEY (`cli_id`);

--
-- Índices para tabela `tb_funcionario`
--
ALTER TABLE `tb_funcionario`
  ADD PRIMARY KEY (`func_id`);

--
-- Índices para tabela `tb_pedido`
--
ALTER TABLE `tb_pedido`
  ADD PRIMARY KEY (`ped_id`),
  ADD KEY `fk_pedido_cliente` (`cli_id`),
  ADD KEY `fk_pedido_caminhao` (`cam_id`),
  ADD KEY `fk_pedido_motorista` (`motorista_id`),
  ADD KEY `fk_pedido_vendedor` (`vendedor_id`);

--
-- Índices para tabela `tb_saida`
--
ALTER TABLE `tb_saida`
  ADD PRIMARY KEY (`saida_id`);

--
-- Índices para tabela `tb_usuario`
--
ALTER TABLE `tb_usuario`
  ADD PRIMARY KEY (`u_id`);

--
-- AUTO_INCREMENT de tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `tb_caminhao`
--
ALTER TABLE `tb_caminhao`
  MODIFY `cam_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de tabela `tb_cliente`
--
ALTER TABLE `tb_cliente`
  MODIFY `cli_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de tabela `tb_funcionario`
--
ALTER TABLE `tb_funcionario`
  MODIFY `func_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de tabela `tb_pedido`
--
ALTER TABLE `tb_pedido`
  MODIFY `ped_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de tabela `tb_saida`
--
ALTER TABLE `tb_saida`
  MODIFY `saida_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT de tabela `tb_usuario`
--
ALTER TABLE `tb_usuario`
  MODIFY `u_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- Restrições para despejos de tabelas
--

--
-- Limitadores para a tabela `tb_pedido`
--
ALTER TABLE `tb_pedido`
  ADD CONSTRAINT `fk_pedido_caminhao` FOREIGN KEY (`cam_id`) REFERENCES `tb_caminhao` (`cam_id`),
  ADD CONSTRAINT `fk_pedido_cliente` FOREIGN KEY (`cli_id`) REFERENCES `tb_cliente` (`cli_id`),
  ADD CONSTRAINT `fk_pedido_motorista` FOREIGN KEY (`motorista_id`) REFERENCES `tb_funcionario` (`func_id`),
  ADD CONSTRAINT `fk_pedido_vendedor` FOREIGN KEY (`vendedor_id`) REFERENCES `tb_funcionario` (`func_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
