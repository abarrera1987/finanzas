const mongoose = require("mongoose"); // acceso a la base de datos
const uniqueValidator = require('mongoose-unique-validator'); // para colocar mensajes en las validaciones

let Schema = mongoose.Schema;

let categoriasSchema = new Schema({

    nombreCategoria: {

        type: String,
        required: [true, 'El nombre de la categoria es obligatorio']

    },
    color: {

        type: String,
        required: [true, "El color es obligatorio"]

    }

});


categoriasSchema.plugin(uniqueValidator, {

    message: '{PATH} debe ser unico' // se pasa el plugin al schema junto con el path que es el campo que genera el error y el mensaje 

})

module.exports = mongoose.model('Categorias', categoriasSchema); // exportamos el schema para poderlo usar donde lo llamemos