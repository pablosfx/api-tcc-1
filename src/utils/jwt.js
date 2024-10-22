import jwt from 'jsonwebtoken';

const key = '-=!TCC!=--';

export function gerarToken(userTcc) {

    return jwt.sign(userTcc, key);

}


export function autenticacao(req, resp, next) {

    try {

        let token = req.headers['x-access-token'];

        if (token === undefined)
        token = req.query['x-access-token'];

        let signd = jwt.verify(token, key);

        req.user = signd;

        next();

    }

    catch (e) {

        resp.status(401).end();

    }

}


export function autenticar(req, resp, next) {

    return autenticacao(req, resp, next);

}