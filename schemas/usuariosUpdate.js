const mongoose = require("mongoose"); // acceso a la base de datos
const uniqueValidator = require('mongoose-unique-validator'); // para colocar mensajes en las validaciones
const mongooseHidden = require('mongoose-hidden')(); // para ocultra campos del schema

let Schema = mongoose.Schema;

let generosPermitidos = {
    values: ['F', 'M', '-'],
    message: '{VALUE} no es un genero válido'
}

let usuariosUpdateSchema = new Schema({

    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    segundoNombre: {
        type: String,
        default: '-'
    },
    apellido: {
        type: String,
        default: '-'
    },
    segundoApellido: {
        type: String,
        default: '-'
    },
    genero: {

        type: String,
        default: '-',
        enum: generosPermitidos

    },
    email: {
        type: String,
        unique: true,
        required: [true, 'El correo es obligatorio']
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria']
    },
    img: {
        type: String,
        default: '-'
    },
    estado: {
        type: Boolean,
        default: true
    },
    addsGogle: {

        type: Boolean,
        default: false,
        hide: true
    }

});
usuariosUpdateSchema.plugin(mongooseHidden); // se le pasa el plugin al schema para que funcione

usuariosUpdateSchema.plugin(uniqueValidator, {

    message: '{PATH} debe ser unico' // se pasa el plugin al schema junto con el path que es el campo que genera el error y el mensaje 

})

module.exports = mongoose.model('usuarios', usuariosUpdateSchema); // exportamos el schema para poderlo usar donde lo llamemos