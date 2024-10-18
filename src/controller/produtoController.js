import * as db from '../repository/produtoRepository.js';
import { Router } from "express";


const endpoints = Router();

endpoints.post('/produto', async (req, resp) => {
    try {
        let produto = req.body;

        let id = await db.inserirproduto(produto);

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
