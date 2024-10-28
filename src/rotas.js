import pedidosController from './controller/pedidosController.js'
import clienteController from './controller/clienteController.js'
import produtoController from './controller/produtoController.js'
import enderecoController from './controller/enderecoController.js'
import loginController from './controller/loginController.js'

export default function adicionarRotas(servidor) {
    servidor.use(pedidosController);
    servidor.use(clienteController);
    servidor.use(produtoController);
    servidor.use(enderecoController);
    servidor.use(loginController)
}
