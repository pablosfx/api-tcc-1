import con from "./connection.js";


export async function inserirPesquisa(pesquisa) {
    const comando = `
insert into pesquisa (id_produto, id_pedido)
values (?, ?)
    `;
    
    let resposta = await con.query(comando, [pesquisa.id_produto, pesquisa.id_pedido])
    let tcc = resposta[0];
    
    return tcc.insertId;
}

export async function  consultarPesquisa () {
    const comando = `
   select id_pesquisa  pesquisa,
	   id_produto   produto,
       id_pedido    pedido
       from pesquisa;  
       `
       let resposta = await con.query(comando);
       let registros = resposta[0];

        return registros;
}

export async function removerPesquisa (id) {
    const comando = `
        delete from pesquisa
	        where id_pesquisa = ?;
        `

        let resposta = await con.query(comando, [id]);
        let registros = resposta[0];
 
         return registros.affectedRows;
}

export async function alterarPesquisa (id, pesquisa) {
    const comando =`
        update pesquisa
            set id_produto = ?,
		        id_pedido = ?
          where id_pesquisa = ?;`

let resposta = await con.query(comando, [pesquisa.id_produto, pesquisa.id_pedido, id]);
let registros = resposta[0];

return registros.affectedRows;
}