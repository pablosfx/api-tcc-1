import con from "./connection.js";

export async function inserirPesquisa(pesquisa) {
    const comando = `
    insert into pesquisa (idProduto)
        values (?)
    `;
    
    let resposta = await con.query(comando, [pesquisa.id_produto])
    let tcc = resposta[0];
    
    return tcc.insertId;
}

export async function  consultarPesquisa () {
    const comando = `
   select idPesquisa  pesquisa,
	   idProduto   produto
       from pesquisa;  
       `
       let resposta = await con.query(comando);
       let registros = resposta[0];

        return registros;
}

export async function removerPesquisa (id) {
    const comando = `
        delete from pesquisa
	        where idPesquisa = ?;
        `

        let resposta = await con.query(comando, [id]);
        let registros = resposta[0];
 
         return registros.affectedRows;
}

export async function alterarPesquisa (id, pesquisa) {
    const comando =`
        update pesquisa
            set idProduto = ?
          where idPesquisa = ?;`

let resposta = await con.query(comando, [pesquisa.idProduto, id]);
let registros = resposta[0];

return registros.affectedRows;
}