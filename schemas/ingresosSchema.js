const mongoose = require('mongoose');

const uniqueValidator = require('mongoose-unique-validator');

let Schema = mongoose.Schema;

let ingresosSchema = new Schema({

    valor: {

        type: Number,
        required: [true, 'El valor es obligatorio']

    },
    facha: {

        type: String,
        required: [true, 'Debe ingresar una fecha'],
        value: new Date()

    },
    icon: {

        type: Schema.Types.ObjectId,
        ref: 'Iconos',

    }

})

ingresosSchema.plugin(uniqueValidator, {

    message: '{PATH} debe ser unico' // se pasa el plugin al schema junto con el path que es el campo que genera el error y el mensaje 

})

module.exports = mongoose.model('Ingresos', ingresosSchema); // exportamos el schema para poderlo usar donde lo llamemos