/* Express dependencies */
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const logger = require('morgan'); //Registra en un log todas las peticiones que ingresan desde el cliente
const { expressjwt: jwt } = require('express-jwt'); //middleware para validar el jwt (en caso de éxito almacena el usuario en req.user )

//Custom dependencies
const db = require('./config/database');
const secrets = require('./config/secrets')
//Routes
const places = require('./routes/places');
const users = require('./routes/users');
const sessions = require('./routes/sessions');
const favorites = require('./routes/favorites');
const visits = require('./routes/visits');
const visitsPlaces = require('./routes/visitsPlaces');
const applications = require('./routes/applications');

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

//Recibe la firma para validar el token en cada petición
app.use(jwt({secret: secrets.jwt_secret, algorithms: ["HS256"]})
  .unless({ //express jwt nos provee del método unless para excluir la protección de rutas especificada
    path: ['/sessions', '/users'], //Excluye las uri indicadas
    method: 'GET' //Excluye el verbo GET de la protección de todas las uris
  }) 
);

//Routes
app.get('/', (req, res) => res.json({ "message": "Hola tavo" }));
app.use('/places', places);
app.use('/places', visitsPlaces);
app.use('/users', users);
app.use('/sessions', sessions);
app.use('/favorites', favorites);
app.use('/visits', visits);
app.use('/applications', applications);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  console.log(err);
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json(err);
});

module.exports = app;
