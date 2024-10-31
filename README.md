create database tcc;
use tcc;

create table produtos (
id_produto int primary key auto_increment,
nm_produto varchar (100),
marca varchar (100),
tamanho varchar (10),
valor decimal (10, 2)
);

insert into produtos (nm_produto, marca, tamanho, valor)
values (?,?,?,?);

select id_produto  produto,
        nm_produto     nome,
        marca          marca,
        tamanho        tamanho,
        valor          valor
    from produtos;
    
    delete from produtos
        where id_produto = ?;
        
		update produtos
            set nm_produto = ?,
            marca = ?,
            tamanho = ?,
            valor = ?
            where id_produto = ?;

create table clientes (
id_cliente int primary key auto_increment,
nm_cliente varchar(100),
telefone varchar(100)
);

insert into clientes (email, senha, nm_cliente, telefone)
values  (?,?,?,?);

select id_cliente id,
       email  email,
       senha  senha,
       nm_cliente nome,
       telefone  telefone
    from clientes;
    
    delete from clientes
        where id_cliente = ?;
        
        update clientes
            set email  = ?,
            senha = ?,
            nm_cliente = ?,
            telefone = ?
            where id_cliente = ?;
        
create table endereco (
id_endereco int primary key auto_increment,
id_cliente int,
pais varchar (100),
estado varchar(100),
cidade varchar(100),
cep varchar (10),
foreign key (id_cliente) references clientes(id_cliente)
);

insert into endereco (id_cliente, pais, estado, cidade, cep)
values (?,?,?,?,?);

select id_endereco  endereco,
        id_cliente      cliente,
        pais            pais,
        estado          estado,
        cidade          cidade,
        cep             cep 
    from endereco;
    
    delete from endereco
        where id_endereco = ?;
        
		update endereco
            set id_cliente  = ?,
            pais = ?,
            estado = ?,
            cidade = ?,
            cep = ?
            where id_endereco = ?;

create table pedidos (
id_pedido int primary key auto_increment,
id_cliente int,
id_produto int,
id_endereco int,
id_login int,
data_pedido date,
foreign key (id_cliente) references clientes(id_cliente),
foreign key (id_produto) references produtos(id_produto),
foreign key (id_endereco) references endereco(id_endereco),
foreign key (id_login) references login(id_login)
);

insert into pedidos (id_cliente, id_produto, id_endereco, data_pedido)
	values (?,?,?,?);

select id_pedido  pedido,
        id_cliente    cliente,
        id_produto    produto,
        id_endereco   endereco,
        data_pedido   data
    from pedidos;
    
    delete from pedidos
        where id_pedido = ?;
        
         update pedidos
            set id_cliente  = ?,
            id_produto = ?,
            id_endereco = ?,
            data_pedido = ?
            where id_pedido = ?;
            
            select * from pedidos;
            
            
            create table login (
            id_login int primary key auto_increment,
            email varchar (255),
            senha varchar (255)
            );
            
            insert into login (email, senha)
            values (?, ?);
            
            
            select email  email,
    senha  senha
    from login;
    
      delete from login
        where id_login = ?;
        
        update login
        set email = ?,
            senha = ?
            where id_login = ?;
            
insert into pesquisa (id_produto, id_pedido)
values (?, ?);

  select id_pesquisa  pesquisa,
	   id_produto   produto,
       id_pedido    pedido
       from pesquisa; 
       
delete from pesquisa
	        where id_pesquisa = ?;
            
update pesquisa
            set id_produto = ?,
		        id_pedido = ?
          where id_pesquisa = ?;
          
create table carrinho (
id int primary key auto_increment,
id_cliente int,
id_produto int,
id_status int,
data_criacao datetime,
quantidade int,
preco_unitario decimal (10, 2),
subtotal decimal (10, 2),
foreign key (id_cliente) references clientes (id_cliente),
foreign key (id_produto) references produtos (id_produto),
foreign key (id_status) references status (id_status)
);

insert into carrinho (id_cliente, id_produto, id_status, data_criacao, quantidade, preco_unitario, subtotal)
values (?, ?, ?, ?, ?, ?, ?);

select id  id,
		id_cliente  cliente,
        id_produto  produto,
        id_status  status,
        data_criacao  criacao,
        quantidade  quantidade,
        preco_unitario  preco,
        subtotal  subtotal
        from carrinho;
        
delete from carrinho
where id = ?;

update carrinho
set id_cliente = ?,
id_produto = ?,
id_status = ?,
data_criacao = ?,
quantidade = ?,
preco_unitario = ?,
subtotal = ?
where id = ?;

create table status (
id_status int primary key auto_increment,
status varchar (50) unique not null
);

insert into status (status) 
values (?);

select status  status
from status;

delete from status
where id_status = ?;

update status
set status = ?
where id_status = ?;
