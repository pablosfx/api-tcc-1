import * as db from '../repository/pedidosRepository.js';
import { Router } from "express";
const endpoints = Router();

endpoints.post('/pedidos/', async (req, resp) => {
    try {
        let pedidos = req.body;

        let id = await db.inserirPedidos(pedidos);

        resp.send({
            novoId: id
        })
    } 
    catch (err) {
        resp.status(400).send({
            erro: err.message   
        })
    }
});

endpoints.get ('/pedidos/', async (req, resp) => {
    try {
        let pedidos = await db.consultarPedidos();
        resp.send(pedidos);
    }
    catch (erro) {
        resp.status(400).send ({
            erro: erro.message
        })
    }
})

endpoints.delete('/pedidos/:id', async (req, resp) => {
    try {
        let id = req.params.id;
        let linha = await db.removerPedido(id);
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

endpoints.put ('/pedidos/:id', async (req, resp) => {
    try {
        let id = req.params.id;
        let pedidos = req.body;

        let linhas = await db.alterarPedido (id, pedidos);
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