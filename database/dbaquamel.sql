-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 29-Out-2021 às 21:48
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
-- Banco de dados: `dbaquamel`
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
(1, 'paz-1010', 25, 2016, 'Caminhão azul2', 'CODE-REN4V4N');

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
(1, 'Padaria Karina', 123456, 2147483647, 'Rua manoel ferreira pires, 22', 'Colorado', 3383, 1168868612, 119898898, 'PK');

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
(1, 'Luiz Harry Potter', '123456123456', '395478547', '12121278910', 'Rua endereço de tal não sei das quantas, 22 Casa 2', 'Vila Tal e Etc', 3276010, 'Ativo', 1500.00, 'Desenvolvedor WEB', '2021-10-13 12:00:00', '2021-10-14 21:34:04'),
(2, 'LUIZ FELIPE SANTOS DO CARMO', '3453453', '3453453', '345345', 'Rua Lago das Rosas, 22', 'Vila Tal', 3383, 'Desligado', 1212.44, 'Caminhoneiro', '2021-10-14 00:00:00', '0000-00-00 00:00:00');

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
  `ped_total` float NOT NULL,
  `ped_data` date NOT NULL,
  `ped_obs` varchar(1000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Extraindo dados da tabela `tb_pedido`
--

INSERT INTO `tb_pedido` (`ped_id`, `ped_nome`, `cam_id`, `cli_id`, `vendedor_id`, `motorista_id`, `ped_valor`, `ped_qtd`, `ped_total`, `ped_data`, `ped_obs`) VALUES
(0, 'Vende de agua para Karina', 1, 1, 1, 2, 17.00, 3000, 51000, '2021-10-15', 'Sem');

-- --------------------------------------------------------

--
-- Estrutura da tabela `tb_saida`
--

CREATE TABLE `tb_saida` (
  `saida_id` int(11) NOT NULL,
  `saida_nome` varchar(100) NOT NULL,
  `saida_valor` float(11,2) NOT NULL,
  `saida_data` date NOT NULL,
  `saida_obs` varchar(1000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `tb_saida`
--

INSERT INTO `tb_saida` (`saida_id`, `saida_nome`, `saida_valor`, `saida_data`, `saida_obs`) VALUES
(1, 'Nova saida', 1500.00, '2021-10-15', 'sem obs');

-- --------------------------------------------------------

--
-- Estrutura da tabela `tb_usuario`
--

CREATE TABLE `tb_usuario` (
  `u_id` int(11) NOT NULL,
  `u_nome` varchar(100) NOT NULL,
  `u_email` varchar(100) NOT NULL,
  `u_senha` varchar(20) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `u_last_login` date DEFAULT NULL,
  `u_foto` varchar(4000) NOT NULL,
  `u_class` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Extraindo dados da tabela `tb_usuario`
--

INSERT INTO `tb_usuario` (`u_id`, `u_nome`, `u_email`, `u_senha`, `u_last_login`, `u_foto`, `u_class`) VALUES
(1, 'Luiz', 'fellipe@fellipe', '123456', '0000-00-00', '', 'admin'),
(3, 'fel', 'fe@fe', 'fe', '0000-00-00', '', 'comum'),
(6, 'Luiz', 'fellipeex@hotmail.com', '123456', '0000-00-00', '', 'admin');

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
  MODIFY `cam_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de tabela `tb_cliente`
--
ALTER TABLE `tb_cliente`
  MODIFY `cli_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de tabela `tb_funcionario`
--
ALTER TABLE `tb_funcionario`
  MODIFY `func_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de tabela `tb_saida`
--
ALTER TABLE `tb_saida`
  MODIFY `saida_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de tabela `tb_usuario`
--
ALTER TABLE `tb_usuario`
  MODIFY `u_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

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
