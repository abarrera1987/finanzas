const express = require('express'); // lamamos express

const jwt = require('jsonwebtoken');

const _ = require('underscore'); // se utiliza para llamar los campos permitidos

const IconosIngresos = require('../schemas/iconosIngresosConcepto'); // llamamos el schema
const IconosEgresos = require('../schemas/iconosEgresosConcepto'); // llamamos el schema

const { verificaToken } = require('../middlewares/autentication'); // middleware para validar el token

const app = express();

app.get('/iconos', (req, res) => {

    IconosIngresos.find({}).exec((err, iconosDB) => {

        if (err) {

            return res.status(500).json({

                ok: false,
                message: 'Algo paso intentelo más tarde'

            })

        } else if (iconosDB == null || iconosDB == "") {

            return res.status(200).json({

                ok: false,
                message: 'No se encontraron resultados'

            })

        }

        res.status(200).json({

            ok: true,
            iconosDB

        })
    })
})

app.post('/crearIcono', verificaToken, (req, res) => {

    let body = _.pick(req.body, ['concepto', 'icono', 'idCategoria']);

    let newIcon = IconosIngresos({

        concepto: body.concepto,
        icono: body.icono,
        idCategoria: body.idCategoria,
        usuario: req.usuario._id

    });

    newIcon.save((err, iconDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                message: 'Verifique que todos los datos esten correctos'

            });
        }

        return res.status(201).json({

            ok: true,
            message: 'Icono creado correctamente',
            iconDB

        });

    })

})

app.put('/actualizaIcono', verificaToken, (req, res) => {


    let body = _.pick(req.body, ['concepto', 'id', 'tipoCategoria']);
    let id = body.id;
    let tipoCategoria = body.tipoCategoria;

    var Ejecucion = IconosIngresos;

    if (tipoCategoria == "egresos") {

        Ejecucion = IconosEgresos;

    }
    let conceptIcono = {

        concepto: body.concepto

    }

    let options = {

        new: true,
        runValidators: true

    }

    Ejecucion.findByIdAndUpdate(id, conceptIcono, options, (err, conceptoDB) => {

        if (err) {

            return res.status(400).json({

                ok: false,
                message: 'Verifique que todos los datos esten correctos'

            });

        }
        if (usuarioDB == null) {

            return res.status(400).json({

                ok: false,
                message: 'El icono no existe'

            });


        }
        res.status(200).json({
            ok: true,
            message: 'Icono actualizado correctamente',
            icono: conceptoDB
        });
    })

})

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