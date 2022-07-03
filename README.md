# web-services

## Introducción

### Crea tu primer servicio web

npm install express

## Conceptos fundamentales

### Cómo funciona un servidor web 

Un servidor web, es un programa, instalado generalmente en una computadora especializada, que se encarga de responder las peticiones que recibe vía el protocolo HTTP; generalmente (pero no siempre) de parte de un navegador web.

Generalmente, el principal trabajo de un servidor web es construir y enviar páginas web en formato HTML, aunque además, también envía archivos de utilidad como imágenes, hojas de estilo, archivos javaScript, PDF’s, entre otros.

De manera simple, el flujo de funcionamiento de un servidor web es el siguiente:

El usuario solicita un archivo a través de un cliente, que puede ser un navegador web.
El navegador web construye una solicitud para dicho archivo, y la envía a través del protocolo HTTP a la computadora
La petición llega a la computadora que contiene el programa, a esta computadora también se le conoce como el servidor.
La computadora, a través del programa (servidor web) genera un archivo de respuesta para la petición correspondiente, este archivo se envía, de nuevo a través del protocolo http, de vuelta al cliente que hizo la solicitud.
El cliente recibe el archivo respuesta, y se lo muestra al usuario.
Cabe mencionar que el cliente genera una nueva petición por cada archivo que desea solicitar, si una página contiene 2 imágenes, 1 archivo CSS y uno de JavaScript, hará 4 solicitudes al programa servidor.

El programa servidor contiene lógica que le permite definir qué archivo enviará, si ese archivo requiere de información de una base de datos, si dicha información debe ser procesada o transformada, etc.

En un servidor web, este programa se encarga de enviar y recibir datos, estos datos, además, deben ser enviados en un formato previamente definido.

### Servidor de archivos estáticos

EL servidor de archivos estáticos contiene recursos qué no son dinámicos y que siempre serán enviados en la respuesta de la misma forma, como por ejemplo archivos javascript, hojas de estilo, imágenes o archivos base de html.

### Enviar JSON

A través del método json() de la respuesta, podemos enviar json al cliente.

### Nodemon para recargar el servidor

npm i -g nodemon
nodemon app.js

### Rutas POST y postman

npm i body-parser

Body parser nos permite leer el cuerpo de las request, es una librería de node

## Bases de datos y CRUD

### Generar app con Express

npm install -g express-generator 

express nombre-app

### Recorriendo una app generada por express generator

Para generar un servicio web no necesitaremos algunas librerias que vienen dispuestas en el proyecto base, tales como cookie-parser y el motor de vistas jade. Nuestro objetivo es generar un servicio por lo tanto no vamos a necesitar renderizar vistas ni cookies.

### Configurar la base de datos

https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-ubuntu/
https://askubuntu.com/questions/823288/mongodb-loads-but-breaks-returning-status-14

Instalar ODM: npm i mongoose
Iniciar mongodb: sudo systemctl start mongod
Detener mongodb: sudo systemctl stop mongod
Ver estado de conexión: sudo systemctl status mongod

### Modelos en Mogoose

### REST y Verbos HTTP

REST es un tipo de arquitectura para el desarrollo de proyectos web. Principalmente, los principios que componen esta arquitectura son los siguientes:

#### RECURSOS IDENTIFICABLES
Los recursos en una aplicación web REST, tienen un identificador persistente, es decir, que no cambia con el tiempo. Usualmente este identificador es una URI, como por ejemplo: http://codigofacilito.com/cursos/javascript-profesional identifica el curso de JavaScript.

#### RECURSOS MANIPULABLES CON VERBOS HTTP.
REST propone que los recursos sean manipulados usando los verbos estándar que forman parte del protocolo HTTP, los usados son los siguientes: GET, POST, PUT, PATCH y DELETE.

GET, por su parte, debe ser usado para leer recursos, y debe ser idempotente, lo que significa que si realizas la misma acción muchas veces, el resultado es el mismo.

Lo importante del párrafo anterior, es entender que GET no modifica, crea o altera los recursos que se almacenan en el servidor web, ya que rompería la propiedad de idempotencia.

Los verbos HTTP se usan de la siguiente manera:

POST: Sirve para crear nuevos recursos, por ejemplo POST /cursos crea un nuevo curso en la colección de cursos.

GET: Sirve para lectura de recursos, por ejemplo GET /cursos lee la colección de cursos.

PUT: Sirve para actualizar recursos, por ejemplo PUT /cursos/javascript-profesional actualizaría el curso de JavaScript Profesional con los datos indicados.

DELETE: Sirve para eliminar recursos, por ejemplo DELETE /cursos/javascript-profesional eliminaría el recurso indicado.

La ventaja de usar verbos HTTP es que son un estándar, lo que permite desarrollar servicios que recibirán comunicación de otros programas, sin que de ante mano estos sepan cómo deben comunicarse.

#### LOS RECURSOS SE REPRESENTAN DE DISTINTAS MANERAS.
Un recurso puede ser representado por un archivo HTML, por una estructura JSON, una estructura XML, un PDF, etc.

La representación depende de la petición, por ejemplo GET /cursos/javascript-profesional.json nos entrega la representación en JSON, mientras que GET /cursos/javascript-profesional entrega la versión en HTML.

#### LOS RECURSOS CONSERVAN SU PROPIO ESTADO
Una de las principales características de un programa REST, es que no tiene un estado. En desarrollo web, el estado puede ser guardado usando sesiones, las sesiones en un servicio web REST no existen.

Usualmente es el cliente el que conserva el estado y lo envía en cada petición.

Este es el trasfondo del funcionamiento de la autenticación con tokens, misma que cubriremos más adelante en el curso.

Para saber más. Existen algunas otras características de una arquitectura REST, sin embargo, no las cubriremos para el propósito de este curso, si quieres saber más, te dejo algunos links interesantes:

http://web.archive.org/web/20130116005443/http://tomayko.com/writings/rest-to-my-wife

https://stackoverflow.com/questions/671118/what-exactly-is-restful-programming

### Crear Lugares

Se gestiona a través del método create del modelo

### Mostrar lugares

Se gestiona a través del método find del modelo

### Mostrar un lugar

Mongoose nos entrega distintos métodos para realizar la manipulación de recursos, en este caso usé finById.

https://mongoosejs.com/docs/queries.html

### Actualizar lugares

https://mongoosejs.com/docs/api.html#model_Model.findOneAndUpdate

https://mongoosejs.com/docs/api.html#model_Model.updateMany

https://mongoosejs.com/docs/api.html#model_Model.updateOne

### Eliminar lugares

https://mongoosejs.com/docs/api.html#model_Model.findOneAndRemove

## Más allá de lo básico

### Crear rutas

Separar la lógica de rutas para modularizar el código. El objeto router nos provee de el método route para agrupar todos lo verbos http en un mismo uri.

### Controladores

Relación directa con las rutas, almacenan el controlador o lógica del modelo

### Paginación

npm install mongoose-paginate

### Qué es un Middleware en Express

El concepto de middlewares es popular en muchos frameworks, de Desarrollo Web. Están por ejemplo los que dependen fuertemente del concepto como por ejemplo Express, los que lo usan detrás de cámaras o como una configuración avanzada, como lo hace Ruby on Rails, etc.

Un Middleware tiene como propósito tomar dos piezas de la aplicación y conectarlas, como un puente en el que fluye la información. Normalmente decimos que una rutina de código tiene como propósito recibir información y retornarla transformada, la única característica especial de un Middleware es que la información la obtiene de otra función de código para luego enviársela a una función distinta más.

Los middlewares en Express se montan por múltiples razones, una de ellas por ejemplo es validar la información antes de que llegue a la rutina que enviará respuesta hacia el cliente, también pueden usarse para hacer una consulta y guardar información antes de que pase a las funciones que responderán.

Un middleware en Express es una función, cuyo único distintivo es que recibe 3 argumentos:

function(req,res,next){}
Los primeros dos argumentos, como cualquier función que responde respuestas del cliente contiene la información de la solicitud en el primer argumento Request, y el objeto Response como segundo argumento, que nos sirve para modificar la respuesta que se enviará a el usuario.

El tercer argumento es muy importante, este es el que distingue un middleware de una función de respuesta. Este tercer argumento es una función que contiene el siguiente middleware o función a ejecutar luego de que el actual termine su ejecución.

Esta función next termina la ejecución de nuestro middleware y puede hacerlo de dos formas.

Con éxito, la función next en este caso no recibe argumentos al ejecutarse, indicándole al siguiente punto de la ejecución que todo salió bien.
Con un error, el error se envía como argumento de la función, indicando al siguiente punto de la ejecución que algo salió mal y no puede continuar con la respuesta de la petición del cliente.
Todo salió bien:

function miMiddleware(req,res,next){
   next();
}
Enviamos un error en el middleware

function miMiddleware(req,res,next){
  if(user.permisos != "admin"){
       next(new Error('No tienes permisos para estar aquí'));
   }
}
Estas funciones se montan en el proceso de respuesta a una petición usando el método use del objeto app

const express = require('express');
const app = express();

function miMiddleware(req,res,next){
   next();
}

app.use(next) //Esto indica que antes de cualquier función de respuesta se debe ejecutar este middleware
O bien como parte de la respuesta de una ruta:



const express = require('express');
const app = express();

function miMiddleware(req,res,next){
   next();
}

app.get('/',miMiddleware,function(req,res){
   /* Se ejecutará esta función luego del middleware */
});

En ambos casos, es posible que podamos colocar cuantos middlewares queramos definir, lo importante es que cada uno llame la función next, sin argumentos, para que el siguiente middleware se ejecute hasta llegar a la función de respuesta.

Ahora, pasemos al siguiente tema donde veremos cómo integrar este conocimiento en nuestro proyecto.

### Middleware para búsqueda individual

Generamos un middleware que se ejecute antes de los endpoints que requieren buscar un lugar en especifico (show, update y delete)

### Configurar Cloudinary

https://cloudinary.com/

### Subir imágenes a cloudinary

npm install cloudinary

### Subir imágenes a cloudinary pt 2

middleware para la subida:
npm install multer

Esta configuración lo gestiona de manera local

### Mover imágenes a la nube

