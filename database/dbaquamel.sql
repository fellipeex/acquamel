-- phpMyAdmin SQL Dump
-- version 5.1.1           
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 07-Out-2021 às 17:43
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
-- Banco de dados: `dbaquamel`        aqua_user Zezinho10@@
--

-- --------------------------------------------------------

--
-- Estrutura da tabela `tb_caminhao`
--

CREATE TABLE `tb_caminhao` (
  `cam_id` int(11) NOT NULL,
  `cam_placa` int(11) NOT NULL,
  `tamanho` float NOT NULL,
  `ano` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

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
  `cli_cep` int(10) NOT NULL,
  `cli_telefone` int(10) NOT NULL,
  `cli_celular` int(15) NOT NULL,
  `cli_apelido` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estrutura da tabela `tb_pedido`
--

CREATE TABLE `tb_pedido` (
  `ped_id` int(11) NOT NULL,
  `cam_id` int(11) NOT NULL,
  `cli_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estrutura da tabela `tb_usuario`
--

CREATE TABLE `tb_usuario` (
  `u_id` int(11) NOT NULL,
  `u_nome` varchar(100) NOT NULL,
  `u_email` varchar(100) NOT NULL,
  `u_senha` varchar(20) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `u_last_login` date NOT NULL,
  `u_foto` varchar(4000) NOT NULL,
  `u_class` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

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
-- Índices para tabela `tb_pedido`
--
ALTER TABLE `tb_pedido`
  ADD PRIMARY KEY (`ped_id`),
  ADD KEY `fk_pedido_cliente` (`cli_id`),
  ADD KEY `fk_pedido_caminhao` (`cam_id`);

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
  MODIFY `cam_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `tb_cliente`
--
ALTER TABLE `tb_cliente`
  MODIFY `cli_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `tb_usuario`
--
ALTER TABLE `tb_usuario`
  MODIFY `u_id` int(11) NOT NULL AUTO_INCREMENT;

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
