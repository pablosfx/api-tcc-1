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

export async function  consultarLogin() {
    const comando = `
    select idLogin     login,
        Usuario      usuario,
        Senha        senha,
    from login;
       `
       let resposta = await con.query(comando);
       let registros = resposta[0];

        return registros;
}

export async function removerLogin(id) {
    const comando = `
        delete from login
        where idLogin = ?;
        `;

        let resposta = await con.query(comando, [id]);
        let registros = resposta[0];
 
        return registros.affectedRows; 
}

export async function alterarLogin(id, login) {
    const comando =`
         update login
            set idLogin  = ?,
            Usuario = ?,
            Senha = ?,
            where idLogin = ?;`

        let resposta = await con.query(comando, [login.idLogin, login.Usuario, login.Senha, id]);
        let registros = resposta[0];

        return registros.affectedRows;
}