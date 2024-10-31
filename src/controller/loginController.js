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

endpoints.get ('/login', async (req, resp) => {
    try {
        let idUsuario = req.user.id;
        let login = await db.consultarLogin(idUsuario);
        resp.send(login);
    }
    catch (erro) {
        resp.status(400).send ({
            erro: erro.message
        })
    }
})

endpoints.delete('/login/:id', async (req, resp) => {
    try {
        let id = req.params.id;
        let linha = await db.removerLogin(id);
        if (linha >= 1){
            resp.send();
        }
        else {
            resp.status(404).send({erro: 'Nenhum registro encontrado'})
        }
    }
    catch(err){
        resp.status(400).send({
            erro: err.message
        })
    }
})

endpoints.put ('/login/:id', async (req, resp) => {
    try {
        let id = req.params.id;
        let login = req.body;

        let linhas = await db.alterarLogin (id, login);
        
        if (linhas >= 1) {
            resp.send();
        }
        else {
            resp.status(404).send({ erro: 'Nenhum registro encontrado'})
        }
    }
        catch (erro) {
            resp.status(400).send ({
                erro: erro.message
            })
        }
    })

export default endpoints;