import con from "./connection.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const SECRET_KEY = 'sua_chave_secreta';

export async function inserircadastro(cadastro) {
    const comando = `
        INSERT INTO usuarios (nome, email, senha) 
        VALUES (?, ?, ?);
    `;
    
    const hashedPassword = await bcrypt.hash(cadastro.senha, 10);

    let resposta;
    try {
        resposta = await con.query(comando, [cadastro.nome, cadastro.email, hashedPassword]);
        const userId = resposta[0].insertId;

        return { id: userId };
    } catch (error) {
        console.error("Erro ao inserir cadastro:", error);
        throw error;
    }
}

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

        const senhaCorreta = await bcrypt.compare(senha, user.senha);
        
        if (!senhaCorreta) {
            throw new Error("Senha incorreta");
        }

        const token = jwt.sign({ id: user.id_cliente }, SECRET_KEY, { expiresIn: '1h' });

        return { id: user.id_cliente, token };
    } catch (error) {
        console.error("Erro no login:", error);
        throw error;
    }
}

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

    const hashedPassword = await bcrypt.hash(cadastro.senha, 10);

    try {
        let resposta = await con.query(comando, [cadastro.nome, cadastro.email, hashedPassword, id]);
        return resposta[0].affectedRows;
    } catch (error) {
        console.error("Erro ao alterar cadastro:", error);
        throw error;
    }
}
