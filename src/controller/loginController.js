import * as db from '../repository/loginrepository.js';
import { Router } from "express";

import { autenticar } from '../utils/jwt.js';

const endpoints = Router();

endpoints.post('/login', autenticar, async (req, resp) => {
    try {
        let usuario = req.body;
        usuario.idLogin = req.user.id;
        let id = await db.validarLogin(usuario);

        resp.send ({
            novoId: id
        })
    }  
    catch (err) {
        resp.status(400).send({
            erro: err.message
    })
    }
});

endpoints.get ('/login', autenticar, async (req, resp) => {
    try {
        let idLogin = req.user.id;
        let login = await db.consultarLoginPorId(idLogin);
        resp.send(login);
    }
    catch (err) {
        resp.status(400).send ({
            erro: err.message
        })
    }
})

endpoints.get ('/login/:id', autenticar, async (req, resp) => {
    try {
        let id = req.params.id;
        let login = await db.consultarLogin(id);
        resp.send(login[0]);
    }
    catch (err) {
        resp.status(400).send ({
            erro: err.message
        })
    }
})

endpoints.delete('/login/:id', autenticar, async (req, resp) => {
    try {
        let id = req.params.id;

        let linha = await db.removerLogin(id);
        if(linha >= 1){
            resp.send();
        }
        else {
            resp.status(404).send({erro: 'Nenhum registro encontrado'})
        }
    }
    catch(err) {
        resp.status(400).send({
            erro: err.message
        })
    }
})

endpoints.put ('/login/:id', autenticar, async (req, resp) => {
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