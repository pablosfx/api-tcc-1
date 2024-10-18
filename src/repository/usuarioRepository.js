import con from "./connection.js";

export async function inseriradm(pessoa) {
    const comando = `
    insert into tb_admin (usuario,senha)
    values    (?,?);
    `;
    
    let resposta = await con.query(comando, [pessoa.usuario, pessoa.senha])
    let tcc = resposta[0];
    
    return tcc.insertId;
}


