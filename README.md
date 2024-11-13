create database tcc;
use tcc;

create table produtos (
    idproduto int primary key auto_increment,
    nmproduto varchar(100) not null,
    marca varchar(100),
    tamanho varchar(10),
    valor decimal(10, 2)
);

insert into produtos (nmproduto, marca, tamanho, valor) values (?, ?, ?, ?);

select idproduto as produto, nmproduto as nome, marca, tamanho, valor from produtos;

delete from produtos where idproduto = ?;

update produtos
set nmproduto = ?, marca = ?, tamanho = ?, valor = ?
where idproduto = ?;

create table usuarios (
    idcliente int primary key auto_increment,
    nome varchar(100) not null,
    email varchar(100) not null unique,
    senha varchar(255) not null
);

insert into usuarios (nome, email, senha) values (?, ?, ?);

select * from usuarios;

update usuarios 
set nome = ?, email = ? 
where idcliente = ?;

delete from usuarios where idcliente = ?;

create table endereco (
    idendereco int primary key auto_increment,
    idcliente int,
    pais varchar(100),
    estado varchar(100),
    cidade varchar(100),
    cep varchar(10),
    foreign key (idcliente) references usuarios(idcliente)
);

insert into endereco (idcliente, pais, estado, cidade, cep) values (?, ?, ?, ?, ?);

select idendereco as endereco, idcliente as usuario, pais, estado, cidade, cep from endereco;

delete from endereco where idendereco = ?;

update endereco
set idcliente = ?, pais = ?, estado = ?, cidade = ?, cep = ?
where idendereco = ?;

create table pedidos (
    idpedido int primary key auto_increment,
    idproduto int,
    idendereco int,
    idcliente int,
    datapedido date,
    foreign key (idproduto) references produtos(idproduto),
    foreign key (idendereco) references endereco(idendereco),
    foreign key (idcliente) references usuarios(idcliente)
);

insert into pedidos (idproduto, idendereco, idcliente, datapedido) values (?, ?, ?, ?);

select idpedido as pedido, idproduto as produto, idendereco as endereco, idcliente as cliente, datapedido as data from pedidos;

delete from pedidos where idpedido = ?;

update pedidos
set idproduto = ?, idendereco = ?, idcliente = ?, datapedido = ?
where idpedido = ?;
