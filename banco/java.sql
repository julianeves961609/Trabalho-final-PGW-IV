-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 04/11/2026 às 00:53
-- Versão do servidor: 10.4.32-MariaDB
-- Versão do PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `java`
--

-- --------------------------------------------------------

--
-- Estrutura para tabela `bairros`
--

CREATE TABLE `bairros` (
  `id` int(11) NOT NULL,
  `cep_final` varchar(255) DEFAULT NULL,
  `cep_inicial` varchar(255) DEFAULT NULL,
  `cidade` varchar(255) DEFAULT NULL,
  `estado` varchar(255) DEFAULT NULL,
  `nome` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `bairros`
--

INSERT INTO `bairros` (`id`, `cep_final`, `cep_inicial`, `cidade`, `estado`, `nome`) VALUES
(1, '98280-999', '98280-000', 'Panambi', 'RS', 'Centro');

-- --------------------------------------------------------

--
-- Estrutura para tabela `fotos_imoveis`
--

CREATE TABLE `fotos_imoveis` (
  `id` int(11) NOT NULL,
  `caminho` varchar(255) DEFAULT NULL,
  `capa` bit(1) DEFAULT NULL,
  `nome_arquivo` varchar(255) DEFAULT NULL,
  `ordem` int(11) DEFAULT NULL,
  `imovel_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `fotos_imoveis`
--

INSERT INTO `fotos_imoveis` (`id`, `caminho`, `capa`, `nome_arquivo`, `ordem`, `imovel_id`) VALUES
(2, '.\\uploads\\4\\0a2c5804-bbf9-4952-aa26-17fb2c09dc33_Captura de tela 2026-09-13 003829.png', b'0', '0a2c5804-bbf9-4952-aa26-17fb2c09dc33_Captura de tela 2026-09-13 003829.png', NULL, 4),
(3, '.\\uploads\\4\\e61e7672-a493-441b-9785-4084e7e1dcea_Captura de tela 2026-09-13 003114.png', b'1', 'e61e7672-a493-441b-9785-4084e7e1dcea_Captura de tela 2026-09-13 003114.png', NULL, 4);

-- --------------------------------------------------------

--
-- Estrutura para tabela `imoveis`
--

CREATE TABLE `imoveis` (
  `id` int(11) NOT NULL,
  `area_construida` decimal(15,2) DEFAULT NULL,
  `area_total` decimal(15,2) DEFAULT NULL,
  `banheiros` int(11) DEFAULT NULL,
  `caracteristicas` text DEFAULT NULL,
  `cep` varchar(255) DEFAULT NULL,
  `complemento` varchar(255) DEFAULT NULL,
  `descricao` text DEFAULT NULL,
  `destaque` bit(1) DEFAULT NULL,
  `dormitorios` int(11) DEFAULT NULL,
  `endereco` varchar(255) DEFAULT NULL,
  `finalidade` varchar(255) DEFAULT NULL,
  `garagem` int(11) DEFAULT NULL,
  `numero` varchar(255) DEFAULT NULL,
  `preco_aluguel` decimal(15,2) DEFAULT NULL,
  `preco_venda` decimal(15,2) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `titulo` varchar(255) DEFAULT NULL,
  `bairro_id` int(11) DEFAULT NULL,
  `tipo_imovel_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `imoveis`
--

INSERT INTO `imoveis` (`id`, `area_construida`, `area_total`, `banheiros`, `caracteristicas`, `cep`, `complemento`, `descricao`, `destaque`, `dormitorios`, `endereco`, `finalidade`, `garagem`, `numero`, `preco_aluguel`, `preco_venda`, `status`, `titulo`, `bairro_id`, `tipo_imovel_id`) VALUES
(4, 180.75, 300.50, 2, 'Piscina, Churrasqueira, Jardim', '12345-678', 'Casa 02', 'Excelente casa em bairro tranquilo, próximo a escolas e comércios.', b'1', 3, 'Rua das Flores', 'Residencial', 2, '123', 3500.00, 850000.00, 'Disponível', 'Casa ampla com piscina', 1, 2),
(5, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Casa teste', NULL, NULL);

-- --------------------------------------------------------

--
-- Estrutura para tabela `tipos_imoveis`
--

CREATE TABLE `tipos_imoveis` (
  `id` int(11) NOT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `descricao` varchar(255) DEFAULT NULL,
  `nome` varchar(255) DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `tipos_imoveis`
--

INSERT INTO `tipos_imoveis` (`id`, `created_at`, `descricao`, `nome`, `updated_at`) VALUES
(2, NULL, 'Imóvel residencial térreo ou sobrado', 'Casa', NULL);

-- --------------------------------------------------------

--
-- Estrutura para tabela `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `nome` varchar(255) DEFAULT NULL,
  `senha` varchar(255) DEFAULT NULL,
  `tipo` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `usuarios`
--

INSERT INTO `usuarios` (`id`, `email`, `nome`, `senha`, `tipo`) VALUES
(3, 'admin@teste.com', 'Admin', '$2a$10$Y3vOO0XfIp03acyDGwBHJOn05rf.Mmx9j..HM19xJ5e0lCKjTovjm', 'ADMIN'),
(4, 'maria@teste.com', 'Maria', '$2a$10$CA1hPs8UMvQXcdH7KaYlxOj9czW2W5GI.3NPGR6mQApEULboa/5Ea', 'USER');

--
-- Índices para tabelas despejadas
--

--
-- Índices de tabela `bairros`
--
ALTER TABLE `bairros`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `fotos_imoveis`
--
ALTER TABLE `fotos_imoveis`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FKlxjlrrwj621jii9i201qr6x3d` (`imovel_id`);

--
-- Índices de tabela `imoveis`
--
ALTER TABLE `imoveis`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FKlbe75ud15gr1jhci27a5febtj` (`bairro_id`),
  ADD KEY `FK8l4n1619tyasatoa0a7051ins` (`tipo_imovel_id`);

--
-- Índices de tabela `tipos_imoveis`
--
ALTER TABLE `tipos_imoveis`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT para tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `bairros`
--
ALTER TABLE `bairros`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de tabela `fotos_imoveis`
--
ALTER TABLE `fotos_imoveis`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de tabela `imoveis`
--
ALTER TABLE `imoveis`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de tabela `tipos_imoveis`
--
ALTER TABLE `tipos_imoveis`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de tabela `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Restrições para tabelas despejadas
--

--
-- Restrições para tabelas `fotos_imoveis`
--
ALTER TABLE `fotos_imoveis`
  ADD CONSTRAINT `FKlxjlrrwj621jii9i201qr6x3d` FOREIGN KEY (`imovel_id`) REFERENCES `imoveis` (`id`);

--
-- Restrições para tabelas `imoveis`
--
ALTER TABLE `imoveis`
  ADD CONSTRAINT `FK8l4n1619tyasatoa0a7051ins` FOREIGN KEY (`tipo_imovel_id`) REFERENCES `tipos_imoveis` (`id`),
  ADD CONSTRAINT `FKlbe75ud15gr1jhci27a5febtj` FOREIGN KEY (`bairro_id`) REFERENCES `bairros` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
