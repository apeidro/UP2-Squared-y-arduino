Utilización del UP2squared junto con arduino para controlar y visualizar los datos de sensores: partículas de gas, partículas de polvo, presión atmosférica, etc.


El proyecto está diseñado para trabajar con nodejs en el lado de UP2squared con ubuntu 16.04 LTS. Se utiliza la versión v6.16.0.del nodejs. Esta versión permite la implementación de la librería mraa sin problemas.
Los datos son obtenidos por los sensores instalados en arduino y enviados en formato JSON por el serialport al Up2squared, des de el que por medio de página web, visualizamos los datos, realizamos controles, almacenamos los datos y los representamos en tiempo real con gráficas.

DESCRIPCIÓN DE LOS ARCHIVOS PRINCIPALES DEL PROGRAMA.

-server.js 
Es el programa principal. Realiza la conexión con arduino a través deL serialport, almacena los datos y administra los controles con Node sockets.

-index.html 
Es la página web que contiene los elementos de control y visualización de sensores junto con los gráficos.

-screen_web.pdf 
Es una muestra gráfica de lo que se ve cuando se ejecuta el archivo index.html.

-esquema.pdf 
es el esquema del circuito.

-arduino.pdf 
es el archivo que contiene el programa del arduino.


