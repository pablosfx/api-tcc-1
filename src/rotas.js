import usuarioController from './controller/usuarioContoller.js'

export default function adicionarRotas(servidor) {
    servidor.use(usuarioController);
}
