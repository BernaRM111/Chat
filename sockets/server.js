// const { on } = require('events');
// const express = require('express');
// const app = express();

// const http = require('http');
// const server = http.createServer(app);

// server.listen(3000, () => {
//   console.log('Servidor está ejecutándose en el puerto 3000');
// });

// app.use(express.static('public'));

// const socketIo = require('socket.io');
// const io = socketIo(server);

// io.on('connect', function(socket) {
//   console.log('Nueva conexión id: ' + socket.id);

//   socket.on('datos_usuario', function(datos){
//     console.log('Correo: ' + datos.correo + 'Usuario: ' + datos.usuario)
//     io.emit('nuevo_usuario', {user: datos.usuario});  
// });


// socket.on('send_mensaje', function(datos){
//     console.log(datos.usuario + ' esta enviando un mensaje');
//     io.emit('nuevo_mensaje', {user: datos.usuario, mensaje: datos.mensaje});  
// });

// });

// const express = require('express');
// const app = express();

// const http = require('http');
// const server = http.createServer(app);

// server.listen(3000, () => {
//   console.log('Servidor está ejecutándose en el puerto 3000');
// });

// app.use(express.static('public'));

// const socketIo = require('socket.io');
// const io = socketIo(server);

// let usuariosConectados = {};

// io.on('connect', function(socket) {
//   console.log('Nueva conexión id: ' + socket.id);

//   socket.on('datos_usuario', function(datos){
//     console.log('Correo: ' + datos.correo + 'Usuario: ' + datos.usuario);
//     usuariosConectados[socket.id] = datos.usuario;
//     io.emit('nuevo_usuario', {user: datos.usuario});  
//   });

//   socket.on('send_mensaje', function(datos){
//     console.log(datos.usuario + ' está enviando un mensaje');
//     io.emit('nuevo_mensaje', {user: datos.usuario, mensaje: datos.mensaje});  
//   });

//   socket.on('send_mensaje_privado', function(datos){
//     console.log(datos.usuario + ' está enviando un mensaje privado a ' + datos.destinatario);
//     const destinatarioId = Object.keys(usuariosConectados).find(key => usuariosConectados[key] === datos.destinatario);
//     if (destinatarioId) {
//         io.to(destinatarioId).emit('nuevo_mensaje_privado', {user: datos.usuario, mensaje: datos.mensaje});
//     }
//   });

//   socket.on('disconnect', function() {
//     delete usuariosConectados[socket.id];
//   });
// });









const express = require('express');
const app = express();

const http = require('http');
const server = http.createServer(app);

server.listen(3000, () => {
  console.log('Servidor está ejecutándose en el puerto 3000');
});

app.use(express.static('public'));

const socketIo = require('socket.io');
const io = socketIo(server);

let usuariosConectados = {};

io.on('connect', function(socket) {
  console.log('Nueva conexión id: ' + socket.id);

  socket.on('datos_usuario', function(datos){
    console.log('Correo: ' + datos.correo + 'Usuario: ' + datos.usuario);
    usuariosConectados[socket.id] = datos.usuario;
    io.emit('nuevo_usuario', {user: datos.usuario, usuarios: Object.values(usuariosConectados)});
  });

  socket.on('send_mensaje', function(datos){
    console.log(datos.usuario + ' está enviando un mensaje');
    io.emit('nuevo_mensaje', {user: datos.usuario, mensaje: datos.mensaje});
  });

  socket.on('send_mensaje_privado', function(datos){
    console.log(datos.usuario + ' está enviando un mensaje privado a ' + datos.destinatario);
    const destinatarioId = Object.keys(usuariosConectados).find(key => usuariosConectados[key] === datos.destinatario);
    if (destinatarioId) {
        io.to(destinatarioId).emit('nuevo_mensaje_privado', {user: datos.usuario, mensaje: datos.mensaje});
    }
  });

  socket.on('disconnect', function() {
    delete usuariosConectados[socket.id];
    io.emit('nuevo_usuario', { usuarios: Object.values(usuariosConectados)});
  });
});













