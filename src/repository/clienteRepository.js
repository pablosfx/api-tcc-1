import con from "./connection.js";



export async function inserirclientes(clientes) {
    const comando = `
insert into clientes(email, senha, nm_cliente, telefone)
values  (?,?,?,?);
    `;
    
    let resposta = await con.query(comando, [clientes.email, clientes.senha, clientes.nm_cliente, clientes.telefone])
    let tcc = resposta[0];
    
    return tcc.insertId;
}

export async function  consultarClientes () {
    const comando = `
    select id_cliente id,
       email  email,
       senha  senha,
       nm_cliente nome,
       telefone  telefone
    from clientes   
       `
       let resposta = await con.query(comando);
       let registros = resposta[0];

        return registros;
}

export async function removerCliente (id) {
    const comando = `
        delete from clientes
        where telefone = ?
        `

        let resposta = await con.query(comando, [id]);
        let registros = resposta[0];
 
         return registros.affectedRows;
    
}

export async function alterarCliente (id, cliente) {
    const comando =`
         update clientes
            set email  = ?,
            senha = ?,
            nm_cliente = ?,
            telefone = ?
            where id_cliente = ?;`

let resposta = await con.query(comando, [cliente.email, cliente.senha, cliente.nm_cliente, cliente.telefone, id]);
let registros = resposta[0];

return registros.affectedRows;
}
