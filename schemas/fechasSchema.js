const mongoose = require('mongoose');

const uniqueValidator = require('mongoose-unique-validator');

let Schema = mongoose.Schema;

let fechasSchema = new Schema({

    fecha: {
        type: String,
        required: [true, 'Debe ingresar una fecha'],
        value: new Date()

    },
    usuario: {

        type: Schema.Types.ObjectId,
        ref: 'Usuarios',

    }

})

fechasSchema.plugin(uniqueValidator, {

    message: '{PATH} debe ser unico' // se pasa el plugin al schema junto con el path que es el campo que genera el error y el mensaje 

})

module.exports = mongoose.model('Fechas', fechasSchema); // exportamos el schema para poderlo usar donde lo llamemos