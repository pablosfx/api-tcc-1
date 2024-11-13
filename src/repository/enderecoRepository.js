import con from "./connection.js";

export async function inserirendereco(endereco) {
    const comando = `
   insert into endereco (idcliente, pais, estado, cidade, cep) values (?, ?, ?, ?, ?);

    `;
    
    let resposta = await con.query(comando, [endereco.idcliente, endereco.pais, endereco.estado, endereco.cidade, endereco.cep])
    let tcc = resposta[0];
    
    return tcc.insertId;
}

export async function  consultarEndereco() {
    const comando = `
   select idendereco as endereco, idcliente as usuario, pais, estado, cidade, cep from endereco;

       `
       let resposta = await con.query(comando);
       let registros = resposta[0];

        return registros;
}

export async function removerEndereco(id) {
    const comando = `
      delete from endereco where idendereco = ?;

        `

        let resposta = await con.query(comando, [id]);
        let registros = resposta[0];
 
        return registros.affectedRows; 
}

export async function alterarEndereco(id, endereco) {
    const comando =`
        update endereco
set idcliente = ?, pais = ?, estado = ?, cidade = ?, cep = ?
where idendereco = ?;`

let resposta = await con.query(comando, [endereco.idcliente, endereco.pais, endereco.estado, endereco.cidade, endereco.cep, id]);
let registros = resposta[0];

 return registros.affectedRows;
}