import usuarioController from './controller/usuarioContoller.js'
import clienteController from './controller/clienteController.js'
import lojaController from './controller/lojaController.js'
import produtoController from './controller/produtoController.js'
import enderecosRepository from './controller/enderecoController.js'



export default function adicionarRotas(servidor) {
    servidor.use(usuarioController);
    servidor.use(clienteController);
    servidor.use(lojaController);
    servidor.use(produtoController);
    servidor.use(enderecosRepository);
}
