import con from './connection.js';

export async function inserirCarrinho(carrinho) {
    const comando = `
    insert into carrinho (id_cliente, id_produto, id_status, data_criacao, quantidade, preco_unitario, subtotal)
        values (?, ?, ?, ?, ?, ?, ?);
    `;
    
    let resposta = await con.query(comando, [carrinho.id_cliente, carrinho.id_produto, carrinho.id_status, carrinho.data_criacao, carrinho.quantidade, carrinho.preco_unitario, carrinho.subtotal])
    let tcc = resposta[0];
    
    return tcc.insertId;
}

export async function  consultarCarrinho () {
    const comando = `
    select id  id,
		id_cliente  cliente,
        id_produto  produto,
        id_status  status,
        data_criacao  criacao,
        quantidade  quantidade,
        preco_unitario  preco,
        subtotal  subtotal
        from carrinho;  
       `
       let resposta = await con.query(comando);
       let registros = resposta[0];

    return registros;
}

export async function removerCarrinho (id) {
    const comando = `
        delete from carrinho
        where id = ?;
        `

        let resposta = await con.query(comando, [id]);
        let registros = resposta[0];
 
         return registros.affectedRows;
}

export async function alterarCarrinho (id, carrinho) {
    const comando =`
       update carrinho
        set id_cliente = ?,
            id_produto = ?,
            id_status = ?,
            data_criacao = ?,
            quantidade = ?,
            preco_unitario = ?,
            subtotal = ?
            where id = ?;`

let resposta = await con.query(comando, [carrinho.id_cliente, carrinho.id_produto, carrinho.id_status, carrinho.data_criacao, carrinho.quantidade, carrinho.subtotal, id]);
let registros = resposta[0];

return registros.affectedRows;
}