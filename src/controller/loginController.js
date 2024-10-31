import express from 'express';
import { gerarToken } from '../utils/jwt.js';
import * as db from '../repository/loginrepository.js';
import { Router } from 'express';

const endpoints = Router();

endpoints.use(express.json());

endpoints.post('/entrar/', async (req, resp) => {
    try {
        let pessoa = req.body;

        let usuario = await db.validarLogin(pessoa);

        if (!usuario) { 
            return resp.status(401).send({ erro: "Usuário ou senha incorreto(s)" });
        }

        let token = gerarToken(usuario);
        resp.send({ 
            token 
        });
    } catch (err) {
        resp.status(400).send({ erro: err.message });
    }
});

endpoints.post('/login/', async (req, resp) => {
    try {
        let pessoa = req.body;

        let id = await db.inserirLogin(pessoa);

        resp.send({ 
            novoId: id 
        });
    } catch (err) {
        console.error("Erro ao inserir usuário:", err);
        resp.status(400).send({ erro: err.message });
    }
});