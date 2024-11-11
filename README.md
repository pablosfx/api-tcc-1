create database tcc;
use tcc;

create table produtos (
    idproduto int primary key auto_increment,
    nmproduto varchar(100),
    marca varchar(100),
    tamanho varchar(10),
    valor decimal(10, 2)
);

insert into produtos (nmproduto, marca, tamanho, valor) values (?, ?, ?, ?);

select idproduto as produto, nmproduto as nome, marca as marca, tamanho as tamanho, valor as valor from produtos;

delete from produtos where idproduto = ?;

update produtos
set nmproduto = ?,
    marca = ?,
    tamanho = ?,
    valor = ?
where idproduto = ?;

create table endereco (
    idendereco int primary key auto_increment,
    idlogin int,
    pais varchar(100),
    estado varchar(100),
    cidade varchar(100),
    cep varchar(10),
    foreign key (idlogin) references login(idlogin)
);

insert into endereco (idlogin, pais, estado, cidade, cep) values (?, ?, ?, ?, ?);

select idendereco as endereco, idlogin as login, pais as pais, estado as estado, cidade as cidade, cep as cep from endereco;

delete from endereco where idendereco = ?;

update endereco
set idlogin = ?,
    pais = ?,
    estado = ?,
    cidade = ?,
    cep = ?
where idendereco = ?;

create table pedidos (
    idpedido int primary key auto_increment,
    idproduto int,
    idendereco int,
    idlogin int,
    datapedido date,
    foreign key (idproduto) references produtos(idproduto),
    foreign key (idendereco) references endereco(idendereco),
    foreign key (idlogin) references login(idlogin)
);

insert into pedidos (idproduto, idendereco, idlogin, datapedido) values (?, ?, ?, ?);

select idpedido as pedido, idproduto as produto, idendereco as endereco, idlogin as login, datapedido as data from pedidos;

delete from pedidos where idpedido = ?;

update pedidos
set idproduto = ?,
    idendereco = ?,
    idlogin = ?,
    datapedido = ?
where idpedido = ?;

create table usuarios (
    id_cliente int primary key auto_increment,
    nome varchar(100) not null,
    email varchar(100) not null unique,
    senha varchar(255) not null
);

insert into usuarios (nome, email, senha) 
values (?, ?, ?);

select * from usuarios;

select * from usuarios;
select usuario, senha
from login
where usuario = ?;

update usuarios 
set nome = ?, email = ? 
where id_cliente = ?;

delete from usuarios where id_cliente = ?;

select id_cliente as id, nome, email, senha from usuarios where email = ?;

create table login (
    id_login int primary key auto_increment,
    usuario varchar(255),
    senha varchar(255)
);

select * from login;

insert into login (usuario, senha) values (?, ?);

select usuario as usuario, senha as senha from login;

select id_login as id, usuario as usuario, senha as senha from login;

select usuario, senha
from login
where usuario = ?;

create table carrinho (
    id int primary key auto_increment,
    idproduto int,
    datacriacao datetime,
    quantidade int,
    precounitario decimal(10, 2),
    subtotal decimal(10, 2),
    foreign key (idproduto) references produtos(idproduto)
);

insert into carrinho (idproduto, datacriacao, quantidade, precounitario, subtotal) values (?, ?, ?, ?, ?);

select id as id, idproduto as produto, datacriacao as criacao, quantidade as quantidade, precounitario as preco, subtotal as subtotal from carrinho;

delete from carrinho where id = ?;

update carrinho
set idproduto = ?,
    datacriacao = ?,
    quantidade = ?,
    precounitario = ?,
    subtotal = ?
where id = ?;
