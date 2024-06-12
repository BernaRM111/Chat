
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
//     io.emit('nuevo_usuario', {user: datos.usuario, usuarios: Object.values(usuariosConectados)});
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
//     io.emit('nuevo_usuario', { usuarios: Object.values(usuariosConectados)});
//   });
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
//     const correoExistente = Object.values(usuariosConectados).some(user => user.correo === datos.correo);

//     if (correoExistente) {
//       socket.emit('error_usuario', 'Este correo ya está en uso. Por favor, usa otro correo.');
//     } else {
//       console.log('Correo: ' + datos.correo + ' Usuario: ' + datos.usuario);
//       usuariosConectados[socket.id] = { usuario: datos.usuario, correo: datos.correo };
//       io.emit('nuevo_usuario', {user: datos.usuario, usuarios: Object.values(usuariosConectados).map(user => user.usuario)});
//     }
//   });

//   socket.on('send_mensaje', function(datos){
//     console.log(datos.usuario + ' está enviando un mensaje');
//     io.emit('nuevo_mensaje', {user: datos.usuario, mensaje: datos.mensaje});
//   });

//   socket.on('send_mensaje_privado', function(datos){
//     console.log(datos.usuario + ' está enviando un mensaje privado a ' + datos.destinatario);
//     const destinatarioId = Object.keys(usuariosConectados).find(key => usuariosConectados[key].usuario === datos.destinatario);
//     if (destinatarioId) {
//         io.to(destinatarioId).emit('nuevo_mensaje_privado', {user: datos.usuario, mensaje: datos.mensaje});
//     }
//   });

//   socket.on('disconnect', function() {
//     delete usuariosConectados[socket.id];
//     io.emit('nuevo_usuario', { usuarios: Object.values(usuariosConectados).map(user => user.usuario)});
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
    const correoExistente = Object.values(usuariosConectados).some(user => user.correo === datos.correo);

    if (correoExistente) {
      socket.emit('error_usuario', 'Este correo ya está en uso. Por favor, usa otro correo.');
    } else {
      console.log('Correo: ' + datos.correo + ' Usuario: ' + datos.usuario);
      usuariosConectados[socket.id] = { usuario: datos.usuario, correo: datos.correo };
      io.emit('nuevo_usuario', {user: datos.usuario, usuarios: Object.values(usuariosConectados).map(user => user.usuario)});
      socket.emit('usuario_valido');
    }
  });

  socket.on('send_mensaje', function(datos){
    console.log(datos.usuario + ' está enviando un mensaje');
    io.emit('nuevo_mensaje', {user: datos.usuario, mensaje: datos.mensaje});
  });

  socket.on('send_mensaje_privado', function(datos){
    console.log(datos.usuario + ' está enviando un mensaje privado a ' + datos.destinatario);
    const destinatarioId = Object.keys(usuariosConectados).find(key => usuariosConectados[key].usuario === datos.destinatario);
    if (destinatarioId) {
        io.to(destinatarioId).emit('nuevo_mensaje_privado', {user: datos.usuario, mensaje: datos.mensaje});
    }
  });

  socket.on('disconnect', function() {
    if (usuariosConectados[socket.id]) {
      console.log('Usuario desconectado: ' + usuariosConectados[socket.id].usuario);
      delete usuariosConectados[socket.id];
      io.emit('nuevo_usuario', { usuarios: Object.values(usuariosConectados).map(user => user.usuario)});
    }
  });
});











