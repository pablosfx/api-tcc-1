import con from "./connection.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const SECRET_KEY = 'sua_chave_secreta';

// Função de Cadastro (armazena a senha hash)
export async function inserircadastro(cadastro) {
    const comando = `
        INSERT INTO usuarios (nome, email, senha) 
        VALUES (?, ?, ?);
    `;
    
    // Hash da senha para segurança
    const hashedPassword = await bcrypt.hash(cadastro.senha, 10);

    let resposta;
    try {
        resposta = await con.query(comando, [cadastro.nome, cadastro.email, hashedPassword]);
        const userId = resposta[0].insertId;

        // Retorna apenas o ID do usuário
        return { id: userId };
    } catch (error) {
        console.error("Erro ao inserir cadastro:", error);
        throw error;
    }
}

// Função de Login (gera o token JWT após autenticação)
export async function login(email, senha) {
    const comando = `
        SELECT id_cliente, senha FROM usuarios WHERE email = ?;
    `;

    try {
        const [resultado] = await con.query(comando, [email]);

        if (resultado.length === 0) {
            throw new Error("Usuário não encontrado");
        }

        const user = resultado[0];

        // Verifica a senha usando bcrypt
        const senhaCorreta = await bcrypt.compare(senha, user.senha);
        
        if (!senhaCorreta) {
            throw new Error("Senha incorreta");
        }

        // Geração do token JWT
        const token = jwt.sign({ id: user.id_cliente }, SECRET_KEY, { expiresIn: '1h' });

        // Retorna o token e o ID do usuário
        return { id: user.id_cliente, token };
    } catch (error) {
        console.error("Erro no login:", error);
        throw error;
    }
}

// Outras funções (consultar, remover, alterar) permanecem as mesmas
export async function consultarcadastro(id) {
    const comando = `
        SELECT * FROM usuarios WHERE id_cliente = ?;
    `;

    try {
        let resposta = await con.query(comando, [id]);
        return resposta[0];
    } catch (error) {
        console.error("Erro ao consultar cadastro:", error);
        throw error;
    }
}

export async function removercadastro(id) {
    const comando = `
        DELETE FROM usuarios
        WHERE id_cliente = ?;
    `;

    try {
        let resposta = await con.query(comando, [id]);
        return resposta[0].affectedRows; 
    } catch (error) {
        console.error("Erro ao remover cadastro:", error);
        throw error;
    }
}

export async function alterarcadastro(id, cadastro) {
    const comando = `
        UPDATE usuarios 
        SET nome = ?, email = ?, senha = ? 
        WHERE id_cliente = ?;
    `;

    // Hash da nova senha
    const hashedPassword = await bcrypt.hash(cadastro.senha, 10);

    try {
        let resposta = await con.query(comando, [cadastro.nome, cadastro.email, hashedPassword, id]);
        return resposta[0].affectedRows;
    } catch (error) {
        console.error("Erro ao alterar cadastro:", error);
        throw error;
    }
}
