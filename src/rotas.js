import usuarioController from './controller/usuarioContoller.js'
import clienteRepository from './controller/clienteController.js'
import lojaRepository from './controller/lojaController.js'
import produtoRepository from './controller/produtoController.js'



export default function adicionarRotas(servidor) {
    servidor.use(usuarioController);
    servidor.use(clienteRepository);
    servidor.use(lojaRepository);
    servidor.use(produtoRepository);
}
