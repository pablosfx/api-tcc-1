import pedidosController from './controller/pedidosController.js';
import produtoController from './controller/produtoController.js';
import enderecoController from './controller/enderecoController.js';
import cadastroController from './controller/cadastroController.js'


export default function adicionarRotas(servidor) {
    servidor.use(cadastroController);
    servidor.use(pedidosController);
    servidor.use(produtoController);
    servidor.use(enderecoController);

}
