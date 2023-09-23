# TrelloVanilla
Repo del Trello, hecho solo con js, css, html y node.

## api
Contiene el docker para levantar Node y poder persistir los datos del sitio.
El contenedor hace uso de un volumen y Node en modo watch, para poder así ejercer cambios en el código y que se reflejen sin tener que volver a levantar el contenedor.
El contenedor corre en el puerto 8091.

## sie-content
Contiene css, js, etc. También los archivos docker para levantarlo.
El contenedor corre en el puerto 8080.
