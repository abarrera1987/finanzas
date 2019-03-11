require('../config/config');

// llamamos expres para usar todas sus libreria
const express = require('express');

const mongoose = require('mongoose');
const bodyParser = require('body-parser');
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use(require('../routes/index'));

mongoose.connect(process.env.URLDB, { useNewUrlParser: true, useCreateIndex: true })
    .then(console.log('Base de datos ONLINE'))
    .catch(err => err);

app.listen(process.env.PORT, () => {

    console.log("escuchando el puerto: ", process.env.PORT);

})