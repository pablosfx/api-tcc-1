import { gerarToken } from '../utils/jwt.js';
import * as db from '../repository/loginrepository.js';
import { Router } from "express";

const endpoints = Router();


endpoints.post('/login', async (req, resp) => {
    try {
        const { Usuario, Senha } = req.body;

        if (!Usuario || !Senha) {
            return resp.status(400).send({ 
                erro: "Usuário e senha são obrigatórios." 
            });
        }

        
        const usuario = await db.validarLogin({ Usuario, Senha });

        if (!usuario) {
            return resp.status(401).send({ 
                erro: "Usuário ou senha incorreto(s)" 
            });
        }

        const token = gerarToken(usuario);
        resp.send({ 
            token,
            usuario: {
                id: usuario.id, 
                nome: usuario.nome, 
            }
        });
    } catch (err) {
        console.error("Erro ao autenticar usuário:", err);
        resp.status(400).send({ 
            erro: err.message 
        });
    }
});


endpoints.post('/register', async (req, resp) => {
    try {
        const { Usuario, Senha } = req.body;

        if (!Usuario || !Senha) {
            return resp.status(400).send({ 
                erro: "Usuário e senha são obrigatórios." 
            });
        }

        
        const novoId = await db.inserirUsuario({ Usuario, Senha });
        resp.status(201).send({
            novoId 
        });
    } catch (err) {
        console.error("Erro ao inserir usuário:", err);
        resp.status(400).send({ 
            erro: err.message 
        });
    }
});

export default endpoints;