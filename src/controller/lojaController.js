import * as db from '../repository/lojaRepository.js';
import { Router } from "express";


const endpoints = Router();

endpoints.post('/loja', async (req, resp) => {
    try {
        let loja = req.body;

        let id = await db.inserirloja(loja);

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
