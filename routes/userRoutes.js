const express = require('express'); // lamamos express
const bcrypt = require('bcrypt'); // bcrypt para encriptar la contraseña
const _ = require('underscore'); // se utiliza para llamar los campos permitidos
const Usuario = require('../schemas/usuarios'); // llamamos el schema

const app = express();

app.post('/crearUsuario', function(req, res) {

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

app.put('/actualizarUsuario/:id', function(req, res) {

    let id = req.params.id;
    let body = _.pick(req.body, ['nombre', 'segundoNombre', 'apellido', 'segundoApellido', 'password', 'img', 'genero']);

    //para regresar el usuario actualizado
    let options = {

        new: true,
        runValidators: true

    }
    Usuario.findByIdAndUpdate(id, body, options, (err, usuarioDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            usuario: usuarioDB
        });

    })


});

app.post('/login', (req, res) => {

    res.json({
        ok: true
    });

})

module.exports = app;