import con from "./connection.js";

export async function inserirloja(loja) {
    const comando = `

    insert into loja(nm_produto,qtd_produto,valor,id_produto,id_cliente,id_pedido)
    values  (?,?,?,?,?,?);
    
    `;
    
    let resposta = await con.query(comando, [loja.nm_produto,loja.qtd_produto,loja.valor,loja.id_produto,loja.id_cliente,loja.id_pedido])
    let info = resposta[0];
    
    return info.insertId;
}


