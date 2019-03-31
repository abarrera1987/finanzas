const mongoose = require("mongoose"); // acceso a la base de datos
const uniqueValidator = require('mongoose-unique-validator'); // para colocar mensajes en las validaciones

let Schema = mongoose.Schema;

let iconosConcpetoSchema = new Schema({


    concepto: {

        type: String,
        unique: true,
        required: [true, 'El concepto es requerido']

    },
    icono: {

        type: Schema.Types.ObjectId,
        ref: 'Iconos',

    },
    idCategoria: {

        type: Schema.Types.ObjectId,
        ref: 'Categorias',
        required: [true, "El id de catecoria es obligatorio"]

    },
    usuario: {

        type: Schema.Types.ObjectId,
        ref: 'Usuarios',

    }

});


iconosConcpetoSchema.plugin(uniqueValidator, {

    message: '{PATH} debe ser unico' // se pasa el plugin al schema junto con el path que es el campo que genera el error y el mensaje 

})

module.exports = mongoose.model('iconosIngresosConcepto', iconosConcpetoSchema); // exportamos el schema para poderlo usar donde lo llamemos