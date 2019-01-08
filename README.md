# UP2-Squared-and-arduino
Use UP2 squared together with arduino to control and visualize sensor data: gas particles, dust particles, atmospheric pressure, etc.


The project is designed to work with nodejs on the side of the UP2 squared with ubuntu 16.04 LTS. There are some limitations regarding the version of nodejs to optimize the operation of the libraries used, specifically the version v6.16.0 is used. This version allows the implementation of the mraa library.
The data is obtained by the sensors installed in arduino and sent in JSON format by serialport to the UP2 squared to visualize them and perform controls and saved for its representation in graphics.

Characteristics of the program files.

-server.js  It is the main program. Make the connection with arduino through the serialport, save the data and manage the controls with Node Sockets.

-index.html  It is the web page that contains the elements of control and visualization of sensors along with the graphs.


