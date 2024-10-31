import con from "./connection.js";

export async function inserirPedidos(pedidos) {
    const comando = `
        insert into pedidos (idProduto, idEndereco, idLogin, dataPedido)
        values (?, ?, ?, ?)`;
    
    let resposta = await con.query(comando, [pedidos.idProduto, pedidos.idEndereco, pedidos.idLogin, pedidos.dataPedido])
    let tcc = resposta[0];
    
    return tcc.insertId;
}

export async function  consultarPedidos() {
    const comando = `
    select idPedido  pedido,
        idProduto    produto,
        idEndereco   endereco,
        idLogin      login,
        dataPedido   data
    from pedidos
       `;
       let resposta = await con.query(comando);
       let registros = resposta[0];

        return registros;
}

export async function removerPedido(id) {
    const comando = `
    delete from pedidos
        where idProduto = ?;
        `

    let resposta = await con.query(comando, [id]);
    let registros = resposta[0];
 
    return registros.affectedRows;
    
}

export async function alterarPedido(id, pedido) {
    const comando =`
    update pedidos
        set idProduto = ?,
            idEndereco = ?,
            idLogin = ?,
            dataPedido = ?
            where idPedido = ?;`

    let resposta = await con.query(comando, [pedido.idProduto, pedido.idEndereco, pedido.idLogin, pedido.dataPedido, id]);
    let registros = resposta[0];

    return registros.affectedRows;
}