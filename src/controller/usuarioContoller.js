import * as db from '../repository/usuarioRepository.js';
import { Router } from "express";


const endpoints = Router();

endpoints.post('/usuario', async (req, resp) => {
    try {
        let usuario = req.body;

        let id = await db.inseriradm(usuario);

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
