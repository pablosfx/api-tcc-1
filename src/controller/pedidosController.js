import * as db from '../repository/pedidosRepository.js';
import { Router } from "express";


const endpoints = Router();

endpoints.post('/pedidos', async (req, resp) => {
    try {
        let pedidos = req.body;

        let id = await db.inserirpedidos(pedidos);

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
