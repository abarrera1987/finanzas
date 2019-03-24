const jwt = require('jsonwebtoken');

// =============================
// Verificar token
// =============================

let verificaToken = (req, res, netx) => {

    let token = req.get('Autho-Token-Finanza');

    jwt.verify(token, process.env.SEED, (err, decode) => {

        if (err) {

            return res.status(401).json({
                ok: false,
                err: {

                    message: 'El token no es valido'

                }

            });

        }

        req.usuario = decode.usuario;

        netx();

    })



};

module.exports = {

    verificaToken

}