import con from "./connection.js"
import bcrypt from 'bcryptjs' // Altere para bcryptjs se necessário

// Função para inserir um usuário
export async function inserirUsuario(pessoa) {
    if (!pessoa.Senha) {
        throw new Error("A senha não pode ser vazia.");
    }

    const comando = `
        INSERT INTO login (Usuario, Senha) 
        VALUES (?, ?);
    `;

    // Gerar o hash da senha usando bcrypt
    const hash = await bcrypt.hash(pessoa.Senha, 10);
    console.log("Inserindo usuário:", pessoa.Usuario, hash);

    // Executar a consulta para inserir o usuário no banco de dados
    let resposta = await con.query(comando, [pessoa.Usuario, hash]);
    let info = resposta[0];

    return info.insertId; // Retornar o ID do novo usuário inserido
}

// Função para validar o login
export async function validarLogin(pessoa) {
    const comando = `
        SELECT Usuario, Senha
        FROM login
        WHERE Usuario = ?;
    `;

    try {
        // Consultar o banco de dados para verificar se o usuário existe
        let registros = await con.query(comando, [pessoa.Usuario]);

        // Verificar se o usuário foi encontrado
        if (registros[0].length === 0) {
            throw new Error("Usuário não encontrado");
        }

        let usuario = registros[0][0];
        // Verificar a senha usando bcrypt
        const match = await bcrypt.compare(pessoa.Senha, usuario.Senha);
        if (!match) {
            throw new Error("Usuário ou senha incorreto(s)");
        }

        return usuario; // Retornar o usuário validado 
    } catch (error) {
        console.error("Erro ao validar usuário:", error);
        throw new Error("Não foi possível validar o usuário.");
    }
}
