import con from "./connection.js";

export async function inseriradm(pessoa) {
    const comando = `
        INSERT INTO admin (usuario, senha)
        VALUES (?, ?);
    `;
    
    try {
        let resposta = await con.query(comando, [pessoa.usuario, pessoa.senha]);
        return resposta[0].insertId; // Verifique se `resposta[0]` é válido
    } catch (err) {
        console.error("Erro ao inserir administrador:", err);
        throw new Error("Não foi possível inserir o administrador.");
    }
}
