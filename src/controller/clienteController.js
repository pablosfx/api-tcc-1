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

endpoints.get ('/clientes', async (req, resp) => {
    try {
        let clientes = await db.consultarClientes();
        resp.send(clientes)
    }
    catch (erro) {
        resp.status(400).send ({
            erro: erro.message
        })
    }
})

endpoints.delete('/clientes/:id', async (req, resp) => {
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

endpoints.put ('/clientes/:id', async (req, resp) => {
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
