import * as db from '../repository/cadastroRepository.js';
import { Router } from "express";
import jwt from "jsonwebtoken";

const endpoints = Router();
const SECRET_KEY = 'sua_chave_secreta';

// Middleware para autenticação com JWT
function authenticateToken(req, resp, next) {
    const token = req.headers['authorization'];
    if (!token) return resp.status(401).send({ erro: 'Token não fornecido' });

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) return resp.status(403).send({ erro: 'Token inválido' });
        req.user = user;
        next();
    });
}

// Endpoint para cadastro de usuário
endpoints.post('/cadastro', async (req, resp) => {
    try {
        let cadastro = req.body;
        let resultado = await db.inserircadastro(cadastro);
        resp.status(201).send({ novoId: resultado.id });
    } catch (err) {
        resp.status(400).send({ erro: err.message });
    }
});

// Endpoint para login
endpoints.post('/login', async (req, resp) => {
    try {
        const { email, senha } = req.body;
        const resultado = await db.login(email, senha);
        const token = jwt.sign({ id: resultado.id }, SECRET_KEY, { expiresIn: '1h' });

        resp.status(200).send({
            id: resultado.id,
            token: token
        });
    } catch (err) {
        resp.status(401).send({ erro: err.message });
    }
});

// Endpoint para consultar cadastro, protegido com JWT
endpoints.get('/cadastro/:id', authenticateToken, async (req, resp) => {
    try {
        let id = req.params.id;
        let cadastro = await db.consultarcadastro(id);
        if (cadastro) {
            resp.send(cadastro);
        } else {
            resp.status(404).send({ erro: 'Cadastro não encontrado' });
        }
    } catch (err) {
        resp.status(400).send({ erro: err.message });
    }
});

// Endpoint para deletar cadastro
endpoints.delete('/cadastro/:id', authenticateToken, async (req, resp) => {
    try {
        let id = req.params.id;
        let linha = await db.removercadastro(id);
        if (linha >= 1) {
            resp.send({ mensagem: 'Registro removido com sucesso' });
        } else {
            resp.status(404).send({ erro: 'Nenhum registro encontrado' });
        }
    } catch (err) {
        resp.status(400).send({ erro: err.message });
    }
});

// Endpoint para atualizar cadastro
endpoints.put('/cadastro/:id', authenticateToken, async (req, resp) => {
    try {
        let id = req.params.id;
        let cadastro = req.body;
        let linhas = await db.alterarcadastro(id, cadastro);
        if (linhas >= 1) {
            resp.send({ mensagem: 'Registro atualizado com sucesso' });
        } else {
            resp.status(404).send({ erro: 'Nenhum registro encontrado' });
        }
    } catch (err) {
        resp.status(400).send({ erro: err.message });
    }
});

export default endpoints;
