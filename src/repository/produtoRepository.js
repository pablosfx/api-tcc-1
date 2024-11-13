import con from "./connection.js";

export async function alterarproduto(id, produto) {
    const comando =`
 
update produtos
set nmproduto = ?, marca = ?, tamanho = ?, valor = ?
where idproduto = ?;`

let resposta = await con.query(comando, [produto.nmProduto, produto.marca, produto.tamanho, produto.valor, id]);
let registros = resposta[0];

return registros.affectedRows;
}

export async function inserirproduto(produto) {
const comando = `
 insert into produtos (nmproduto, marca, tamanho, valor) values (?, ?, ?, ?);

    
    `;
    
    let resposta = await con.query(comando,[produto.nmProduto, produto.marca, produto.tamanho, produto.valor, produto.imagem])
    let tcc = resposta[0];
    
    return tcc.insertId;
}

export async function  consultarProduto() {
    const comando = `
  select idproduto as produto, nmproduto as nome, marca, tamanho, valor from produtos;

       `
       let resposta = await con.query(comando);
       let registros = resposta[0];

        return registros;
}

export async function removerProduto(id) {
    const comando = `
      delete from produtos where idproduto = ?;

        `

        let resposta = await con.query(comando, [id]);
        let registros = resposta[0];
 
         return registros.affectedRows;
    
}

export async function alterarProduto(id, produto) {
    const comando =`
       update produtos
set nmproduto = ?, marca = ?, tamanho = ?, valor = ?
where idproduto = ?;`

    let resposta = await con.query(comando, [produto.nmProduto, produto.marca, produto.tamanho, produto.valor, produto.imagem, id]);
    let registros = resposta[0];

    return registros.affectedRows;
}