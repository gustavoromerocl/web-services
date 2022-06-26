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