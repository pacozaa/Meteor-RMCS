# Robot Mission Control System(RMCS)
## Introduction
**This repository use Nodejs+Meteor+Arduino.**

RMCS is aim to use with my drone competition and it has many feature such as real-time polyline draw on google map, real-time communication from web browser.
So let's understand my hardware environment first.

**This hardware environment is just for proof concept for this Robot Mission Control System. So Please do not stick with it**
## DRONE HARDWARE

1. Multiwii which base on **Arduino MEGA**
2. Mini PC **(run nodejs using `node client-on-drone.js` as client instance)**
3. GPS **in this case I use arduino to stream dummy text from serial port**
Those Multiwii and GPS is use Serial Communication to communicate with Mini PC.

## GROUND STATION
1. Laptop which run Meteor app **use command `meteor` in the directory and don't forget to install [Meteor](https://www.meteor.com/install).**
For further information I modified this meteor app base on this **[angular-meteor tutorial](http://www.angular-meteor.com/).**

Both Laptop and Mini PC communicate with each other over Wifi. You can notice in the code that I use **[net-socket](https://github.com/vdemedes/net-socket)** package which automatically reconnect
