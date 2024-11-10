import * as db from '../repository/cadastroRepository.js'
import { Router } from "express"
import jwt from "jsonwebtoken"

const endpoints = Router();
const SECRET_KEY = 'sua_chave_secreta';

endpoints.post('/cadastro', async (req, resp) => {
    try {
        let cadastro = req.body;

        let resultado = await db.inserircadastro(cadastro);

        resp.status(201).send({
            novoId: resultado.id
        });
    } catch (err) {
        resp.status(400).send({
            erro: err.message
        });
    }
});

endpoints.post('/login', async (req, resp) => {
    try {
        const { email, senha } = req.body;
        
        const resultado = await db.login(email, senha);

        resp.status(200).send({
            id: resultado.id,
            token: resultado.token
        });
    } catch (err) {
        resp.status(401).send({
            erro: err.message
        });
    }
});

endpoints.get('/cadastro/:id', async (req, resp) => {
    try {
        let id = req.params.id; 
        let cadastro = await db.consultarcadastro(id); 
        if (cadastro) {
            resp.send(cadastro);
        } else {
            resp.status(404).send({ 
                erro: 'Cadastro não encontrado' 
            });
        }
    } catch (erro) {
        resp.status(400).send({ 
            erro: erro.message 
        });
    }
});

endpoints.delete('/cadastro/:id', async (req, resp) => {
    try {
        let id = req.params.id;
        let linha = await db.removercadastro(id); 
        if (linha >= 1) {
            resp.send();
        } else {
            resp.status(404).send({ erro: 
                'Nenhum registro encontrado' 
            });
        }
    } catch (err) {
        resp.status(400).send({
            erro: err.message
        });
    }
});

endpoints.put('/cadastro/:id', async (req, resp) => {
    try {
        let id = req.params.id;
        let cadastro = req.body;

        let linhas = await db.alterarcadastro(id, cadastro); 
        if (linhas >= 1) {
            resp.send();
        } else {
            resp.status(404).send({ 
                erro: 'Nenhum registro encontrado' 
            });
        }
    } catch (erro) {
        resp.status(400).send({
            erro: erro.message
        });
    }
});

export default endpoints;
