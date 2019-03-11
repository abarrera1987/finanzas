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