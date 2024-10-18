import con from "./connection.js";

export async function inserirclientes(clientes) {
    const comando = `
insert into clientes(email, senha, nm_cliente, telefone)
values  (?,?,?,?);
    `;
    
    let resposta = await con.query(comando, [clientes.email, clientes.senha, clientes.nm_cliente, clientes.telefone])
    let info = resposta[0];
    
    return info.insertId;
}


