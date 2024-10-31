import * as db from '../repository/carrinhoRepository.js';
import { Router } from 'express';

const endpoints = Router();

let carrinho = [];

endpoints.post('/carrinho', async (req, resp) => {
    try {
    let { usuario_id, produto_id, quantidade, preco_unitario } = req.body;
    let subtotal = quantidade * preco_unitario;

    let id = await db.inserirCarrinho(usuario_id, produto_id, quantidade, preco_unitario, subtotal)

    resp.status(201).send({
        novoId: id
    });
    } catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }
});

endpoints.get('/carrinho', async (req, resp) => {
    try {
        let idCarrinho = req.user.id;
        let carrinho = await db.consultarCarrinho(idCarrinho)
        resp.send(carrinho);
    } catch (err) {
        resp.status(400).send ({
            erro: err.message
        })
    }
});

endpoints.put('/carrinho/:id', async (req, resp) => {
    try {
    let id = req.params.id;
    const { quantidade, preco_unitario } = req.body;

    resp.send(carrinho);
    let linhas = await db.alterarCarrinho (id, carrinho);
    carrinho[linhas].quantidade = quantidade;
    carrinho[linhas].preco_unitario = preco_unitario;
    carrinho[linhas].subtotal = quantidade * preco_unitario;

        if (linhas >= 1) {
            resp.send();
        }
        else {
            resp.status(404).send({ erro: 'Nenhum registro encontrado'})
        } 
    } catch (erro) {
            resp.status(400).send ({
                erro: erro.message
            })
        }
});

endpoints.delete('/carrinho/:id', async (req, resp) => {
    try {
        let id = req.params.id;
        let linha = await db.removerCarrinho(id);

        if(linha >= 1){
            resp.send();
        }
        else{
            resp.status(404).send({erro: 'Nenhum registro encontrado'})
        }
    }   catch(err){
            resp.status(400).send({
                erro: err.message
            })
        }
});

export default endpoints;