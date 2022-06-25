const express = require('express');

//Instanciamos una variable con la función express()
const app = express();

//Creamos la ruta raíz
app.get('/', (req, res) => res.send('Hola mundo'))

//Agregamos la esucha del server localmente en el puerto 3000
app.listen(3000, () => console.log('Estoy listo para recibir peticiones'))