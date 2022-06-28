let createError = require('http-errors');
let express = require('express');
let path = require('path');
let logger = require('morgan'); //Registra en un log todas las peticiones que ingresan desde el cliente
const db = require('./config/database');
const Place = require('./models/Place');

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

app.get('/', (req, res) => res.json({ "message": "Hola tavo" }));

app.post('/places', (req, res) => {
  Place.create({
    title: req.body.title,
    description: req.body.description,
    acceptCreditCard: req.body.acceptCreditCard,
    openHour: req.body.openHour,
    closeHour: req.body.closeHour
  }).then(doc => res.json(doc))
    .catch(err => {
      console.log(err)
      res.json(err)
    })
});

app.get('/places', (req, res) =>
  //Si al find method no se le pasa argumentos asume que trae la colección completa sin filtros
  Place.find({})
    .then(docs => res.json(docs))
    .catch(err => {
      console.log(err)
      res.json(err)
    })
);

app.get('/places/:id', (req, res) => {
  //res.json(req.params.id)
  //REaliza búsqueda por id
  Place.findById(req.params.id)
    .then(doc => res.json(doc))
    .catch(err => {
      console.log(err);
      res.json(err);
    })
})

app.put('/places/:id', (req, res) => {
/*   Place.findById(req.params.id)
    .then(doc => {
      doc.title = req.body.title,
      doc.description = req.body.description,
      doc.acceptCreditCard = req.body.acceptCreditCard,
      doc.openHour = req.body.openHour,
      doc.closeHour = req.body.closeHour

      doc.save();
      res.json(doc);
    }) */

    Place.updateOne({_id: req.params.id},{
      title: req.body.title,
      description: req.body.description,
      acceptCreditCard: req.body.acceptCreditCard,
      openHour: req.body.openHour,
      closeHour: req.body.closeHour
    })
      .then(doc => res.json(doc))
      .catch(err => {
        console.log(err);
        res.json(err);
      })

})

app.delete('/places/:id', (req, res) => {
  Place.findByIdAndRemove(req.params.id)
    .then(doc => {
      res.json({})
    })
    .catch(err => {
      console.log(err);
      res.json(err);
    })
})

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
