import con from "./connection.js";
import crypto from "crypto";

export async function inserirLogin(pessoa) {
    const comando = `
        insert into login (Usuario, Senha) 
        values (?, ?);
    `;

    let hash = crypto.createHash('sha256').update(pessoa.Senha).digest('hex');
    
    console.log("Inserindo usuário:", pessoa.Usuario, hash); 

    let resposta = await con.query(comando, [pessoa.Usuario, hash]);
    let info = resposta[0];
    
    return info.insertId;
}

export async function validarLogin(pessoa) {
    const comando = `
      
    select Usuario  usuario,
           Senha  senha
        from login;
    `;

    try {
        let registros = await con.query(comando, [pessoa.usuario]);

        if (registros[0].length === 0) {
            throw new Error("Usuário não encontrado");
        }

        let usuario = registros[0][0];
        let hash = crypto.createHash('sha256').update(pessoa.senha).digest('hex');

        if (usuario.ds_senha !== hash) {
            throw new Error("Usuário ou senha incorreto(s)");
        }

        return usuario; 
    } catch (error) {
        console.error("Erro ao validar usuário:", error);
        throw new Error("Não foi possível validar o usuário.");
    }
}