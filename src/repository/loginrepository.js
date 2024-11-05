import con from "./connection.js"
import bcrypt from 'bcryptjs' 


export async function inserirUsuario(pessoa) {
    if (!pessoa.Senha) {
        throw new Error("A senha não pode ser vazia.");
    }

    const comando = `
        INSERT INTO login (Usuario, Senha) 
        VALUES (?, ?);
    `;

    
    const hash = await bcrypt.hash(pessoa.Senha, 10);
    console.log("Inserindo usuário:", pessoa.Usuario, hash);

    
    let resposta = await con.query(comando, [pessoa.Usuario, hash]);
    let info = resposta[0];

    return info.insertId; 
}


export async function validarLogin(pessoa) {
    const comando = `
        SELECT Usuario, Senha
        FROM login
        WHERE Usuario = ?;
    `;

    try {
        
        let registros = await con.query(comando, [pessoa.Usuario]);

        
        if (registros[0].length === 0) {
            throw new Error("Usuário não encontrado");
        }

        let usuario = registros[0][0];
        
        const match = await bcrypt.compare(pessoa.Senha, usuario.Senha);
        if (!match) {
            throw new Error("Usuário ou senha incorreto(s)");
        }

        return usuario; 
    } catch (error) {
        console.error("Erro ao validar usuário:", error);
        throw new Error("Não foi possível validar o usuário.");
    }
}
