import usuarioController from './controller/usuarioContoller.js'
import clienteRepository from './controller/clienteController.js'


export default function adicionarRotas(servidor) {
    servidor.use(usuarioController,clienteRepository);
}
