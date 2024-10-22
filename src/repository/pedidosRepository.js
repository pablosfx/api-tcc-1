import con from "./connection.js";

export async function inserirpedidos(pedidos) {
    const comando = `
        insert into pedidos(id_cliente,id_produto,id_endereco,data_pedido)
            values (?,?,?,?)
`;
    
    let resposta = await con.query(comando, [pedidos.id_cliente,pedidos.id_produto,pedidos.id_endereco,pedidos.data_pedido])
    let tcc = resposta[0];
    
    return tcc.insertId;
}

export async function  consultarPedidos() {
    const comando = `
    select id_pedido  pedido,
        id_cliente    cliente,
        id_produto    produto,
        id_endereco   endereco,
        data_pedido   data
    from pedidos;
       `
       let resposta = await con.query(comando);
       let registros = resposta[0];

        return registros;
}

export async function removerPedido(id) {
    const comando = `
    delete from pedidos
        where id_produto = ?;
        `

    let resposta = await con.query(comando, [id]);
    let registros = resposta[0];
 
    return registros.affectedRows;
    
}

export async function alterarPedido(id, pedido) {
    const comando =`
    update pedidos
        set id_cliente  = ?,
            id_produto = ?,
            id_endereco = ?,
            data_pedido = ?
            where id_pedido = ?;`

    let resposta = await con.query(comando, [pedido.id_cliente, pedido.id_produto, pedido.id_endereco, pedido.data_pedido, id]);
    let registros = resposta[0];

    return registros.affectedRows;
}