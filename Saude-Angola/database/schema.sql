CREATE DATABASE saude_angola;

USE saude_angola;

CREATE TABLE utilizadores (

    id INT AUTO_INCREMENT PRIMARY KEY,

    nome VARCHAR(150) NOT NULL,

    email VARCHAR(150) NOT NULL UNIQUE,

    senha_hash VARCHAR(255) NOT NULL,

    perfil ENUM(
        'cidadao',
        'profissional',
        'hospital',
        'farmacia',
        'admin'
    ) NOT NULL DEFAULT 'cidadao',

    criado_em TIMESTAMP
    DEFAULT CURRENT_TIMESTAMP

);

CREATE TABLE hospitais (

    id INT AUTO_INCREMENT PRIMARY KEY,

    nome VARCHAR(200) NOT NULL,

    provincia VARCHAR(100) NOT NULL,

    municipio VARCHAR(100),

    tipo VARCHAR(100),

    emergencia BOOLEAN DEFAULT FALSE,

    status VARCHAR(50)
    DEFAULT 'Ativo',

    criado_em TIMESTAMP
    DEFAULT CURRENT_TIMESTAMP

);

CREATE TABLE noticias (

    id INT AUTO_INCREMENT PRIMARY KEY,

    titulo VARCHAR(250) NOT NULL,

    resumo TEXT,

    conteudo TEXT,

    autor_id INT,

    publicado BOOLEAN DEFAULT FALSE,

    criado_em TIMESTAMP
    DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (autor_id)
    REFERENCES utilizadores(id)

);