import con from "./connection.js";

export async function inserirPedidos(pedidos) {
    const comando = `
        insert into pedidos (idproduto, idendereco, idcliente, datapedido) values (?, ?, ?, ?);
`;
    
    let resposta = await con.query(comando, [pedidos.idProduto, pedidos.idEndereco, pedidos.idcliente, pedidos.dataPedido])
    let tcc = resposta[0];
    
    return tcc.insertId;
}

export async function  consultarPedidos() {
    const comando = `
select idpedido as pedido, idproduto as produto, idendereco as endereco, idcliente as cliente, datapedido as data from pedidos;

       `;
       let resposta = await con.query(comando);
       let registros = resposta[0];

        return registros;
}

export async function removerPedido(id) {
    const comando = `
  delete from pedidos where idpedido = ?;

        `

    let resposta = await con.query(comando, [id]);
    let registros = resposta[0];
 
    return registros.affectedRows;
    
}

export async function alterarPedido(id, pedido) {
    const comando =`
   
update pedidos
set idproduto = ?, idendereco = ?, idcliente = ?, datapedido = ?
where idpedido = ?;`

    let resposta = await con.query(comando, [pedido.idProduto, pedido.idEndereco, pedido.idcliente, pedido.dataPedido, id]);
    let registros = resposta[0];

    return registros.affectedRows;
}