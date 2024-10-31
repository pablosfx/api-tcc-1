import con from './connection.js';

export async function inserirStatus (state) {
    const comando = `
    insert into status_produto (status) 
        values (?);
    `;
    
    let resposta = await con.query(comando, [state.status])
    let tcc = resposta[0];
    
    return tcc.insertId;
}

export async function  consultarStatus () {
    const comando = `
    select status  status
            from status_produto; 
       `
       let resposta = await con.query(comando);
       let registros = resposta[0];

    return registros;
}

export async function removerStatus (id) {
    const comando = `
        delete from status_produto
        where id_status = ?;
        `

        let resposta = await con.query(comando, [id]);
        let registros = resposta[0];
 
         return registros.affectedRows;
}

export async function alterarStatus (id, status) {
    const comando =`
       update status_produto
        set status = ?
        where id_status = ?;`

let resposta = await con.query(comando, [status.status, id]);
let registros = resposta[0];

return registros.affectedRows;
}