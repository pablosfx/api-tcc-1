import con from "./connection.js";

export async function inserirproduto(produto) {
const comando = `
    insert into produto (nm_produto,marca,tamanho,valor)
    values(?,?,?,?);
    
    `;
    
    let resposta = await con.query(comando,[produto.nm_produto, produto.marca, produto.tamanho, produto.valor])
    let tcc = resposta[0];
    
    return tcc.insertId;
}












