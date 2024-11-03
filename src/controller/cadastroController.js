import * as db from '../repository/cadastroRepository.js';
import { Router } from "express";

const endpoints = Router();

// Endpoint para criar um novo cadastro
endpoints.post('/cadastro', async (req, resp) => {
    try {
        let cadastro = req.body;
        let id = await db.inserircadastro(cadastro);

        resp.status(201).send({
            novoId: id
        });
    } catch (err) {
        resp.status(400).send({
            erro: err.message
        });
    }
});

// Endpoint para consultar um cadastro específico pelo ID
endpoints.get('/cadastro/:id', async (req, resp) => {
    try {
        let id = req.params.id; // Obtém o ID da URL
        let cadastro = await db.consultarcadastro(id); // Consulta pelo ID
        if (cadastro) {
            resp.send(cadastro);
        } else {
            resp.status(404).send({ erro: 'Cadastro não encontrado' });
        }
    } catch (erro) {
        resp.status(400).send({ erro: erro.message });
    }
});

// Endpoint para remover um cadastro
endpoints.delete('/cadastro/:id', async (req, resp) => {
    try {
        let id = req.params.id;
        let linha = await db.removercadastro(id); // Correção aqui
        if (linha >= 1) {
            resp.send();
        } else {
            resp.status(404).send({ erro: 'Nenhum registro encontrado' });
        }
    } catch (err) {
        resp.status(400).send({
            erro: err.message
        });
    }
});

// Endpoint para alterar um cadastro
endpoints.put('/cadastro/:id', async (req, resp) => {
    try {
        let id = req.params.id;
        let cadastro = req.body;

        let linhas = await db.alterarcadastro(id, cadastro); // Correção aqui
        if (linhas >= 1) {
            resp.send();
        } else {
            resp.status(404).send({ erro: 'Nenhum registro encontrado' });
        }
    } catch (erro) {
        resp.status(400).send({
            erro: erro.message
        });
    }
});

export default endpoints;
