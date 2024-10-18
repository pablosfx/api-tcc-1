import * as db from '../repository/clienteRepository.js';
import { Router } from "express";


const endpoints = Router();

endpoints.post('/endereco', async (req, resp) => {
    try {
        let endereco = req.body;

        let id = await db.inserirendereco(endereco);

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
