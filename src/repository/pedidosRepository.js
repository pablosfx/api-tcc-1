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


