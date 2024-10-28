import con from "./connection.js";


export async function alterarproduto(id, produto) {
    const comando =`
    update produtos
    set nm_produto = ?,
    marca = ?,
    tamanho = ?,
    valor = ?
    where id_produto = ?;`

let resposta = await con.query(comando, [produto.nm_produto, produto.marca, produto.tamanho, produto.valor, id]);
let registros = resposta[0];

return registros.affectedRows;
}

export async function inserirproduto(produto) {
const comando = `
    insert into produtos (nm_produto,marca,tamanho,valor)
    values(?,?,?,?);
    
    `;
    
    let resposta = await con.query(comando,[produto.nm_produto, produto.marca, produto.tamanho, produto.valor])
    let tcc = resposta[0];
    
    return tcc.insertId;
}

export async function  consultarProduto() {
    const comando = `
    select id_produto  produto,
        nm_produto     nome,
        marca          marca,
        tamanho        tamanho,
        valor          valor
    from produtos;
       `
       let resposta = await con.query(comando);
       let registros = resposta[0];

        return registros;
}

export async function removerProduto(id) {
    const comando = `
        delete from produtos
        where id_produto = ?;
        `

        let resposta = await con.query(comando, [id]);
        let registros = resposta[0];
 
         return registros.affectedRows;
    
}

export async function alterarProduto(id, produto) {
    const comando =`
         update produtos
            set nm_produto = ?,
            marca = ?,
            tamanho = ?,
            valor = ?
            where id_produto = ?;`

let resposta = await con.query(comando, [produto.nm_produto, produto.marca, produto.tamanho, produto.valor, id]);
let registros = resposta[0];

 return registros.affectedRows;
}









