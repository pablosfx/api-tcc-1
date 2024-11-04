import con from "./connection.js";
import jwt from "jsonwebtoken";

const SECRET_KEY = 'sua_chave_secreta';

export async function inserircadastro(cadastro) {
    const comando = `
        INSERT INTO usuarios (nome, email, senha) 
        VALUES (?, ?, ?);
    `;
    
    let resposta = await con.query(comando, [cadastro.nome, cadastro.email, cadastro.senha]);
    const userId = resposta[0].insertId;

    // Gera o token para o usuário recém-cadastrado
    const token = jwt.sign({ id: userId }, SECRET_KEY, { expiresIn: '1h' });

    return { id: userId, token };
}

export async function consultarcadastro(id) {
    const comando = `
        SELECT * FROM usuarios WHERE id_cliente = ?;
    `;
    
    let resposta = await con.query(comando, [id]); // Passa o ID como parâmetro
    return resposta[0]; // Retorna o registro encontrado
}

export async function removercadastro(id) {
    const comando = `
        DELETE FROM usuarios
        WHERE id_cliente = ?; // Corrigido para 'usuarios'
    `;

    let resposta = await con.query(comando, [id]);
    return resposta[0].affectedRows; // Retorna o número de linhas afetadas
}


export async function alterarcadastro(id, cadastro) {
    const comando = `
        UPDATE usuarios 
        SET nome = ?, email = ?, senha = ? 
        WHERE id_cliente = ?;
    `;

    let resposta = await con.query(comando, [cadastro.nome, cadastro.email, cadastro.senha, id]);
    return resposta[0].affectedRows; // Retorna o número de linhas afetadas
}
