import * as db from '../repository/enderecoRepository.js';
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

endpoints.get ('/endereco', async (req, resp) => {
    try {
        let endereco = await db.consultarEndereco();
        resp.send(endereco)
    }
    catch (erro) {
        resp.status(400).send ({
            erro: erro.message
        })
    }
})

endpoints.delete('/endereco/:id', async (req, resp) => {
    try {
        let id = req.params.id;
        let linha = await db.removerEndereco(id);
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

endpoints.put ('/endereco/:id', async (req, resp) => {
    try {
        let id = req.params.id;
        let endereco = req.body;

        let linhas = await db.alterarEndereco (id, endereco);
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
