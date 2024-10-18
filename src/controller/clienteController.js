import * as db from '../repository/clienteRepository.js';
import { Router } from "express";


const endpoints = Router();

endpoints.post('/clientes', async (req, resp) => {
    try {
        let clientes = req.body;

        let id = await db.inserirclientes(clientes);

        resp.status(201).send({
            novoId: id
        });
    } catch (err) {
        resp.status(400).send({
            erro: err.message,
            stack: err.stack 
        });
    }
});

export default endpoints;
