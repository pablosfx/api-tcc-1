import con from "./connection.js";

export async function inserirendereco(endereco) {
    const comando = `


    insert into endereco(id_cliente,pais,estado,cidade,cep)
    values (?,?,?,?,?);


    `;
    
    let resposta = await con.query(comando, [endereco.id_cliente,endereco.pais,endereco.estado,endereco.cidade,endereco.cep])
    let tcc = resposta[0];
    
    return tcc.insertId;
}


