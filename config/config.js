const ENV = require('dotenv').config();
/** 
 * ======================================
 * Puerto
 * ======================================
 */

process.env.PORT = process.env.PORT || 3000;

/** 
 * ======================================
 * Entorno
 * ======================================
 */



/** 
 * ======================================
 * Vencimiento del token
 * ======================================
 * 60 Segundos
 * 60 Minutos
 * 24 Horas
 * 30 Días
 */

process.env.CADUCIDAD_TOKEN = 60 * 60 * 24 * 30;



/** 
 * ======================================
 * SEED de autenticacíon
 * ======================================
 */

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

/** 
 * ======================================
 * Base de datos
 * ======================================
 */

let urlDB;

if (process.env.NODE_ENV === 'dev') {

    urlDB = process.env.LOCAL_DB_URI;

} else {

    urlDB = process.env.DB_URI;


}

process.env.URLDB = urlDB;