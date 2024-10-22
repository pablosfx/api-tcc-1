import * as db from '../repository/produtoRepository.js';
import { Router } from "express";


const endpoints = Router();


endpoints.post('/produtos', async (req, resp) => {
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

endpoints.get ('/produtos', async (req, resp) => {
    try {
        let produto = await db.consultarProduto();
        resp.send(produto)
    }
    catch (erro) {
        resp.status(400).send ({
            erro: erro.message
        })
    }
})

endpoints.delete('/produtos/:id', async (req, resp) => {
    try {
        let id = req.params.id;
        let linha = await db.removerProduto(id);
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

endpoints.put ('/produtos/:id', async (req, resp) => {
    try {
        let id = req.params.id;
        let produto = req.body;

        let linhas = await db.alterarProduto (id, produto);
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
