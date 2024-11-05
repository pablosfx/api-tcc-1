import * as db from '../repository/statusRepository.js';
import { Router } from 'express';

const endpoints = Router();

endpoints.post('/status', async (req, resp) => {
    try {
    let status = req.body;

    let id = await db.inserirStatus(status)

    resp.status(201).send({
        novoId: id
    });

    } catch (err) {

        resp.status(404).send({
            erro: err.message
        })

    }

});

endpoints.get('/status', async (req, resp) => {
    try {

        let idStatus = req.user.id;

        let status = await db.consultarStatus(idStatus)

        resp.send(status);
    } 
    
    catch (err) {

        resp.status(400).send ({
            erro: err.message
        })

    }

});

endpoints.put('/status/:id', async (req, resp) => {
    try {

    let id = req.params.id;
    let status = req.body;

        let linhas = await db.alterarStatus (id, status);
    
        if (linhas >= 1) {

            resp.send();

        }
        else {

            resp.status(404).send({ 
                erro: 'Nenhum registro encontrado'
            })

        } 
    } 
    
    catch (erro) {

            resp.status(400).send ({
                erro: erro.message
            })

        }
});

endpoints.delete('/status/:id', async (req, resp) => {
    try {

        let id = req.params.id;
        let linha = await db.removerStatus(id);

        if(linha >= 1){

            resp.send();

        }
        else{

            resp.status(404).send({
                erro: 'Nenhum registro encontrado'
            })

        }
    }   
    
    catch(err){

            resp.status(400).send({
                erro: err.message
            })
            
        }
});

export default endpoints;