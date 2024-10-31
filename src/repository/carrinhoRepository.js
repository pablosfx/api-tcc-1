import con from './connection.js';

export async function inserirCarrinho(carrinho) {
    const comando = `
    insert into carrinho (idProduto, idStatus, dataCriacao, quantidade, precoUnitario, subtotal)
        values (?, ?, ?, ?, ?, ?, ?);
    `;
    
    let resposta = await con.query(comando, [carrinho.idProduto, carrinho.idStatus, carrinho.dataCriacao, carrinho.quantidade, carrinho.precoUnitario, carrinho.subtotal])
    let tcc = resposta[0];
    
    return tcc.insertId;
}

export async function  consultarCarrinho () {
    const comando = `
    select id  id,
        idProduto  produto,
        idStatus  status,
        dataCriacao  criacao,
        quantidade  quantidade,
        precoUnitario  preco,
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
        set idProduto = ?,
            idStatus = ?,
            dataCriacao = ?,
            quantidade = ?,
            precoUnitario = ?,
            subtotal = ?
            where id = ?;`

let resposta = await con.query(comando, [carrinho.id_produto, carrinho.id_status, carrinho.data_criacao, carrinho.quantidade, carrinho.subtotal, id]);
let registros = resposta[0];

return registros.affectedRows;
}