import * as db from '../repository/pesquisaRepository.js';
import { Router } from "express";

const endpoints = Router();

endpoints.post('/pesquisa/', async (req, resp) => {
    try {
        let pesquisa = req.body;
        let id = await db.inserirPesquisa(pesquisa);

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

endpoints.get ('/pesquisa', async (req, resp) => {
    try {
        let pesquisas = await db.consultarPesquisa();
        resp.send(pesquisas);
    }
    catch (erro) {
        resp.status(400).send ({
            erro: erro.message
        })
    }
})

endpoints.delete('/pesquisa/:id', async (req, resp) => {
    try {
        let id = req.params.id;
        let linha = await db.removerPesquisa(id);

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

endpoints.put ('/pesquisa/:id', async (req, resp) => {
    try {
        let id = req.params.id;
        let pesquisas = req.body;

        let linhas = await db.alterarPesquisa (id, pesquisas);
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