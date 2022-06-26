const express = require('express');
const bodyParser = require('body-parser');

//Instanciamos una variable con la función express()
const app = express();

app.use(bodyParser.json({}));
app.use(bodyParser.urlencoded({extended: false}));

//Mocking de datos o datos de prueba
const places = [
  {
    "title": "test title",
    "description": "Lorem Ipsum",
    "address": "Lorem Ipsum"
  },
  {
    "title": "test title",
    "description": "Lorem Ipsum",
    "address": "Lorem Ipsum"
  },
  {
    "title": "test title",
    "description": "Lorem Ipsum",
    "address": "Lorem Ipsum"
  },
  {
    "title": "test title",
    "description": "Lorem Ipsum",
    "address": "Lorem Ipsum"
  }
]

//Creamos la ruta raíz
app.get('/', (req, res) => {
  //res.send('Hola mundo')
  res.json(places)
});

//Generamos la escucha a peticiones post en la ruta raíz
app.post('/', (req,res) => {
  res.json(req.body); //retornamos la request recibida en el body
})

//Configuración de archivos estáticos en la carpeta public
app.use(express.static('public'));

//Agregamos la esucha del server localmente en el puerto 3000
app.listen(3000, () => console.log('Estoy listo para recibir peticiones'));