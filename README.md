Utilización de la "UP2squared" junto con "arduino" para controlar y visualizar los datos de sensores: partículas de gas, partículas de polvo, presión atmosférica, etc.


El proyecto está diseñado para trabajar con nodejs en la UP2squared con ubuntu 16.04 LTS. Se utiliza la versión v6.16.0.del nodejs, esta versión permite la implementación de la librería mraa sin problemas.
Los datos son obtenidos por los sensores instalados en arduino y enviados en formato JSON por el serialport a la Up2squared y por medio de página web, visualizamos los datos, realizamos controles, almacenamos los datos y los representamos en tiempo real con gráficas. Los datos se almacenan en el archivo "datos.csv", en formato "csv" son facilmente exportables a windows Excel o a cualquier base de datos.
Es necesario visualizar el "esquema.pdf" para poder hacer un correcto seguimiento de la programación.

DESCRIPCIÓN DE LOS ARCHIVOS PRINCIPALES DEL PROGRAMA.

-server.js 

Es el programa principal. Realiza la conexión con arduino a través deL serialport, almacena los datos y administra los controles con Node sockets.

-index.html 

Es la página web que contiene los elementos de control y visualización de sensores junto con los gráficos.

-screen_web.pdf 

Es una muestra gráfica de lo que se ve cuando se ejecuta el archivo index.html.

-esquema.pdf 

Es el esquema del circuito.

-arduino.pdf 

Contiene el programa del arduino.

-index.css

Contiene los estilos para la web.

Los otros archivos son librerias para generar las gráficas de representación de datos, los controles y visualización.


