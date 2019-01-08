# UP2-Squared-and-arduino
Use UP2 squared together with arduino to control and visualize sensor data: gas particles, dust particles, atmospheric pressure, etc.


The project is designed to work with nodejs on the side of the UP2 squared with ubuntu 16.04 LTS. There are some limitations regarding the version of nodejs to optimize the operation of the libraries used, specifically the version v6.16.0 is used. This version allows the implementation of the mraa library.
The data is obtained by the sensors installed in arduino and sent in JSON format to UP2 squared to visualize them and perform controls.
