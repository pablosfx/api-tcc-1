import con from './connection.js';

export async function inserirStatus (state) {
    const comando = `
    insert into statusProduto (status) 
        values (?);
    `;
    
    let resposta = await con.query(comando, [state.status])
    let tcc = resposta[0];
    
    return tcc.insertId;
}

export async function  consultarStatus () {
    const comando = `
    select status  status
            from statusProduto; 
       `
       let resposta = await con.query(comando);
       let registros = resposta[0];

    return registros;
}

export async function removerStatus (id) {
    const comando = `
        delete from statusProduto
        where idStatus = ?;
        `

        let resposta = await con.query(comando, [id]);
        let registros = resposta[0];
 
         return registros.affectedRows;
}

export async function alterarStatus (id, status) {
    const comando =`
       update statusProduto
        set status = ?
        where idStatus = ?;`

let resposta = await con.query(comando, [status.status, id]);
let registros = resposta[0];

return registros.affectedRows;
}