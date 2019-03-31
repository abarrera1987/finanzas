const mongoose = require("mongoose"); // acceso a la base de datos
const uniqueValidator = require('mongoose-unique-validator'); // para colocar mensajes en las validaciones

let Schema = mongoose.Schema;

let iconosSchema = new Schema({

    icono: {

        type: String,
        required: [true, 'El icono es obligatorio']

    },
    tipoCategoria: {

        type: Schema.Types.ObjectId,
        required: [true, 'Debe ingresar una categoria']

    }

});


iconosSchema.plugin(uniqueValidator, {

    message: '{PATH} debe ser unico' // se pasa el plugin al schema junto con el path que es el campo que genera el error y el mensaje 

})

module.exports = mongoose.model('Iconos', iconosSchema); // exportamos el schema para poderlo usar donde lo llamemos