create database tcc;
use tcc;

create table produtos (
idProduto int primary key auto_increment,
nmProduto varchar (100),
marca varchar (100),
tamanho varchar (10),
valor decimal (10, 2)
);

insert into produtos (nmProduto, marca, tamanho, valor)
values (?, ?, ?, ?);

select idProduto  produto,
        nmProduto     nome,
        marca          marca,
        tamanho        tamanho,
        valor          valor
    from produtos;
    
    delete from produtos
        where id_produto = ?;
        
		update produtos
            set nmProduto = ?,
            marca = ?,
            tamanho = ?,
            valor = ?
            where idProduto = ?;
        
create table endereco (
idEndereco int primary key auto_increment,
idLogin int,
pais varchar (100),
estado varchar(100),
cidade varchar(100),
cep varchar (10),
foreign key (idLogin) references login (idLogin)
);

insert into endereco (idLogin, pais, estado, cidade, cep)
values (?, ?, ?, ?, ?);

select  id_endereco  	endereco,
		idLogin  		login,
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
idPedido int primary key auto_increment,
idProduto int,
idEndereco int,
idLogin int,
dataPedido date,
foreign key (idProduto) references produtos(idProduto),
foreign key (idEndereco) references endereco(idEndereco),
foreign key (idLogin) references login(idLogin)
);

insert into pedidos (idProduto, idEndereco, idLogin, dataPedido)
	values (?, ?, ?, ?);

select idPedido  pedido,
        idProduto    produto,
        idEndereco   endereco,
        idLogin  login,
        dataPedido   data
    from pedidos;
    
    delete from pedidos
        where id_pedido = ?;
        
         update pedidos
            set idProduto = ?,
            idEndereco = ?,
            idLogin = ?,
            dataPedido = ?
            where idPedido = ?;
            
            select * from pedidos;
            
create table login (
idLogin int primary key auto_increment,
Usuario varchar (255),
Senha varchar (255)
);
        
insert into login (Usuario, Senha)
values (?, ?);
            
select Usuario  usuario,
	   Senha  senha
	   from login;
    
    select idLogin  id,
    Usuario  usuario,
    Senha  senha
    from login;
    
      delete from login
        where idLogin = ?;
        
        update login
        set Usuario = ?,
            Senha = ?
		where idLogin = ?;

create table pesquisa (
idPesquisa int primary key auto_increment,
idProduto int,
foreign key (idProduto) references produtos (idProduto)
);
            
insert into pesquisa (idProduto)
values (?);

  select idPesquisa  pesquisa,
	   idProduto   	 produto
       from pesquisa; 
       
delete from pesquisa
	        where idPesquisa = ?;
            
update pesquisa
            set idProduto = ?
          where idPesquisa = ?;
          
create table carrinho (
id int primary key auto_increment,
idProduto int,
idStatus int,
dataCriacao datetime,
quantidade int,
precoUnitario decimal (10, 2),
subtotal decimal (10, 2),
foreign key (idProduto) references produtos (idProduto),
foreign key (idStatus) references statusProduto (idStatus)
);

insert into carrinho (idCliente, idProduto, idStatus, dataCriacao, quantidade, precoUnitario, subtotal)
values (?, ?, ?, ?, ?, ?, ?);

select id  id,
        idProduto  produto,
        idStatus  status,
        dataCriacao  criacao,
        quantidade  quantidade,
        precoUnitario  preco,
        subtotal  subtotal
        from carrinho;
        
delete from carrinho
where id = ?;

update carrinho
set idProduto = ?,
idStatus = ?,
dataCriacao = ?,
quantidade = ?,
precoUnitario = ?,
subtotal = ?
where id = ?;

create table statusProduto (
idStatus int primary key auto_increment,
status varchar (50) unique not null
);

insert into statusProduto (status) 
values (?);

select status  status
from statusProduto;

delete from statusProduto
where idStatus = ?;

update statusProduto
set status = ?
where idStatus = ?;
