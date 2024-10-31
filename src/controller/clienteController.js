import * as db from '../repository/clienteRepository.js';
import { Router } from "express";

import { autenticar } from '../utils/jwt.js';


const endpoints = Router();


endpoints.post('/clientes', autenticar, async (req, resp) => {
    try {
        let clientes = req.body;
        clientes.idUsuario = req.user.id;

        let id = await db.inserirclientes(clientes);

        resp.status(201).send({
            novoId: id
        });
    } catch (err) {
        resp.status(400).send({
            erro: err.message
        });
    }
});

endpoints.get ('/clientes', autenticar, async (req, resp) => {
    try {
        let idUsuario = req.user.id;
        let clientes = await db.consultarClientes(idUsuario);
        resp.send(clientes)
    }
    catch (erro) {
        resp.status(400).send ({
            erro: erro.message
        })
    }
})

endpoints.delete('/clientes/:id', autenticar, async (req, resp) => {
    try {
        let id = req.params.id;
        let linha = await db.removerCliente(id);
        if(linha >= 1){
            resp.send();
        }
        else{
            resp.status(404).send({erro: 'Nenhum registro encontrado'})
        }
    }
    catch(err){
        resp.status(400).send({
            erro: err.message
        })
    }
})

endpoints.put ('/clientes/:id', autenticar, async (req, resp) => {
    try {
        let id = req.params.id;
        let clientes = req.body;

        let linhas = await db.alterarCliente (id, clientes);
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