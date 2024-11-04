import { gerarToken } from '../utils/jwt.js';
import * as db from '../repository/loginrepository.js';
import { Router } from "express";

const endpoints = Router();

// Endpoint para autenticar o usuário e gerar token
endpoints.post('/login', async (req, resp) => {
    try {
        const { Usuario, Senha } = req.body;

        if (!Usuario || !Senha) {
            return resp.status(400).send({ erro: "Usuário e senha são obrigatórios." });
        }

        // Valida o usuário no banco de dados
        const usuario = await db.validarLogin({ Usuario, Senha });

        if (!usuario) {
            return resp.status(401).send({ erro: "Usuário ou senha incorreto(s)" });
        }

        // Gera o token com as informações do usuário autenticado
        const token = gerarToken(usuario);
        resp.send({ 
            token,
            usuario: {
                id: usuario.id, // Use o campo real do ID do usuário no banco
                nome: usuario.nome, // Outros dados relevantes
            }
        });
    } catch (err) {
        console.error("Erro ao autenticar usuário:", err);
        resp.status(400).send({ erro: err.message });
    }
});

// Endpoint para registrar um novo usuário
endpoints.post('/register', async (req, resp) => {
    try {
        const { Usuario, Senha } = req.body;

        if (!Usuario || !Senha) {
            return resp.status(400).send({ erro: "Usuário e senha são obrigatórios." });
        }

        // Insere o novo usuário no banco de dados
        const novoId = await db.inserirUsuario({ Usuario, Senha });
        resp.status(201).send({ novoId });
    } catch (err) {
        console.error("Erro ao inserir usuário:", err);
        resp.status(400).send({ erro: err.message });
    }
});

export default endpoints;
