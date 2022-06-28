/* Express dependencies */
let createError = require('http-errors');
let express = require('express');
let path = require('path');
let logger = require('morgan'); //Registra en un log todas las peticiones que ingresan desde el cliente

//Custom dependencies
const db = require('./config/database');
const places = require('./routes/places');


db.connect();

let app = express();
app.use(logger('dev'));

/* Body parser se encuentra deprecado en la actual versión de express y ahora la 
lectura del cuerpo de las request viene integrada en express, las siguientes dos lineas de 
código es la nueva configuración
*/
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.use(express.static(path.join(__dirname, 'public')));

//Routes
app.get('/', (req, res) => res.json({ "message": "Hola tavo" }));
app.use('/places', places);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json(err);
});

module.exports = app;
