import con from "./connection.js";

export async function validarLogin (login) {
    const comando = `
        insert into login (email, senha)
        values (?, ?);
    `;
    
        let resposta = await con.query(comando, [login.email, login.senha]);
        return resposta[0].insertId; 
}

export async function  consultarLogin() {
    const comando = `
    select email  email,
    senha  senha
    from login;
       `;

       let resposta = await con.query(comando);
       let registros = resposta[0];

        return registros;
}

export async function  consultarLoginPorId() {
    const comando = `
    select id_login  id
    from login;
       `;

       let resposta = await con.query(comando);
       let registros = resposta[0];

        return registros;
}

export async function removerLogin(id) {
    const comando = `
    delete from login
        where id_login = ?;
        `;

    let resposta = await con.query(comando, [id]);
    let registros = resposta[0];
 
    return registros.affectedRows;
    
}

export async function alterarLogin(id, login) {
    const comando =`
    update login
        set email = ?,
            senha = ?
            where id_login = ?;`;

    let resposta = await con.query(comando, [login.email, login.senha, id]);
    let registros = resposta[0];

    return registros.affectedRows;
}