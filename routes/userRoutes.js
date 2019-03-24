const express = require('express'); // lamamos express

const bcrypt = require('bcrypt'); // bcrypt para encriptar la contraseña

const jwt = require('jsonwebtoken');

const _ = require('underscore'); // se utiliza para llamar los campos permitidos

const Usuario = require('../schemas/usuarios'); // llamamos el schema

const { verificaToken } = require('../middlewares/autentication');

const app = express();

app.post('/login', (req, res) => {

    let body = req.body;

    Usuario.findOne({ email: body.email }, (err, usuarioDB) => {

        if (err) {

            return res.status(500).json({

                ok: false,
                err

            })

        }

        if (!usuarioDB) {

            return res.status(400).json({
                ok: false,
                err: {

                    message: "Usuario o contraseña incorrectos"

                }

            })

        }

        if (!bcrypt.compareSync(body.password, usuarioDB.password)) {

            return res.status(400).json({

                ok: false,
                err: {

                    message: "Usuario o contraseña incorrectos"
                }
            })
        }

        let token = jwt.sign({

            usuario: usuarioDB.email

        }, process.env.SEED, { expiresIn: process.env.CADUCIDAD_TOKEN });

        res.json({
            ok: true,
            usuario: usuarioDB,
            token
        });

    })

})

app.post('/crearUsuario', verificaToken, (req, res) => {

    let body = _.pick(req.body, ['nombre', 'segundoNombre', 'apellido', 'segundoApellido', 'email', 'password', 'img', 'genero']);

    let usuario = Usuario({

        nombre: body.nombre,
        segundoNombre: body.segundoNombre,
        apellido: body.apellido,
        segundoApellido: body.segundoApellido,
        email: body.email,
        genero: body.genero,
        password: bcrypt.hashSync(body.password, 10)

    });

    usuario.save((err, usuarioDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        return res.json({
            ok: true,
            usuario: usuarioDB
        })

    });


});

app.put('/actualizarUsuario/', verificaToken, (req, res) => {


    let body = _.pick(req.body, ['nombre', 'segundoNombre', 'apellido', 'segundoApellido', 'password', 'img', 'genero']);

    let usuarioUpdateBody = Usuario({

        nombre: body.nombre,
        segundoNombre: body.segundoNombre,
        apellido: body.apellido,
        segundoApellido: body.segundoApellido,
        password: bcrypt.hashSync(body.password, 10)

    });
    let userObjec = usuarioUpdateBody.toObject();
    delete userObjec._id;

    //para regresar el usuario actualizado
    let options = {

        new: true,
        runValidators: true

    }
    Usuario.findOneAndUpdate({ email: req.body.email }, userObjec, options, (err, usuarioDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        if (usuarioDB == null) {

            return res.json({
                ok: false,
                err: {

                    message: 'Verifique el usuario'

                }

            });


        }
        res.json({
            ok: true,
            usuario: usuarioDB
        });

    })


});



module.exports = app;