import con from "./connection.js";

export async function inserirendereco(endereco) {
    const comando = `
    insert into endereco(idLogin, pais, estado, cidade, cep)
    values (?, ?, ?, ?, ?);
    `;
    
    let resposta = await con.query(comando, [endereco.idLogin, endereco.pais, endereco.estado, endereco.cidade, endereco.cep])
    let tcc = resposta[0];
    
    return tcc.insertId;
}

export async function  consultarEndereco() {
    const comando = `
    select idEndereco  endereco,
        idLogin        login,
        pais            pais,
        estado          estado,
        cidade          cidade,
        cep             cep 
    from endereco;
       `
       let resposta = await con.query(comando);
       let registros = resposta[0];

        return registros;
}

export async function removerEndereco(id) {
    const comando = `
        delete from endereco
        where idEndereco = ?;
        `

        let resposta = await con.query(comando, [id]);
        let registros = resposta[0];
 
        return registros.affectedRows; 
}

export async function alterarEndereco(id, endereco) {
    const comando =`
         update endereco
            set idLogin  = ?,
            pais = ?,
            estado = ?,
            cidade = ?,
            cep = ?
            where idEndereco = ?;`

let resposta = await con.query(comando, [endereco.idLogin, endereco.pais, endereco.estado, endereco.cidade, endereco.cep, id]);
let registros = resposta[0];

 return registros.affectedRows;
}