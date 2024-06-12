
// const socket = io();
// let esNuevoUsuario = false;
// let usuario = '';

// socket.on('nuevo_usuario', function (datos) {
//     if (esNuevoUsuario) {
//         alert("Nuevo usuario conectado: " + datos.user);
//         esNuevoUsuario = false;
//     }
//     actualizarListaUsuarios(datos.usuarios);
// });

// socket.on('nuevo_mensaje', function (datos) {
//     $('#cont_mensajes').append('<p><strong>' + datos.user + ':</strong> ' + datos.mensaje + '</p>');
// });

// socket.on('nuevo_mensaje_privado', function (datos) {
//     $('#cont_mensajes_privado').append('<p><strong>' + datos.user + ':</strong> ' + datos.mensaje + '</p>');
// });

// socket.on('error_usuario', function (mensaje) {
//     alert(mensaje);
// });


// function loguear() {
//     const correo = $('#login_form #correo').val();
//     usuario = $('#login_form #usuario').val(); // Asignamos el usuario globalmente

//     if (correo && usuario) {
//         esNuevoUsuario = true;
//         socket.emit('datos_usuario', { correo: correo, usuario: usuario });

//         document.getElementById('login-container').style.display = 'none';
//         document.getElementById('chat-container').style.display = 'block';
//         document.getElementById('welcome-text').textContent = 'Bienvenido, ' + usuario;
//     } else {
//         alert('Por favor, ingresa tu correo y usuario.');
//     }
// }

// function enviar_msj(event) {
//     event.preventDefault(); // Evitamos la recarga de la página

//     const mensaje = $('#mensaje').val();
//     if (mensaje) {
//         socket.emit('send_mensaje', { mensaje: mensaje, usuario: usuario });
//         $('#mensaje').val(''); // Limpiamos el campo de entrada
//     } else {
//         alert('Por favor, escribe un mensaje.');
//     }
// }

// document.getElementById('chat-form').addEventListener('submit', enviar_msj);

// let selectedUser = '';

// function selectUser(user) {
//     selectedUser = user;
// }

// function enviar_msj_privado(event) {
//     event.preventDefault(); // Evitamos la recarga de la página

//     const mensaje_privado = $('#mensaje_privado').val();
//     if (mensaje_privado && selectedUser) {
//         socket.emit('send_mensaje_privado', { mensaje: mensaje_privado, usuario: usuario, destinatario: selectedUser });
//         $('#cont_mensajes_privado').append('<p><strong>Tú:</strong> ' + mensaje_privado + '</p>'); // Muestra el mensaje enviado en el chat privado
//         $('#mensaje_privado').val(''); // Limpiamos el campo de entrada
//     } else {
//         alert('Por favor, selecciona un usuario y escribe un mensaje.');
//     }
// }

// document.getElementById('private-chat-form').addEventListener('submit', enviar_msj_privado);

// function actualizarListaUsuarios(usuarios) {
//     $('#private-users').empty();
//     $('#private-users').append('<option value="" disabled selected>Selecciona un usuario</option>');
//     usuarios.forEach(user => {
//         $('#private-users').append('<option value="' + user + '">' + user + '</option>');
//     });
// }

// $('#private-users').change(function() {
//     selectedUser = $(this).val();
// });

const socket = io();
let esNuevoUsuario = false;
let usuario = '';

socket.on('nuevo_usuario', function (datos) {
    if (esNuevoUsuario) {
        alert("Nuevo usuario conectado: " + datos.user);
        esNuevoUsuario = false;
    }
    actualizarListaUsuarios(datos.usuarios);
});

socket.on('nuevo_mensaje', function (datos) {
    $('#cont_mensajes').append('<p><strong>' + datos.user + ':</strong> ' + datos.mensaje + '</p>');
});

socket.on('nuevo_mensaje_privado', function (datos) {
    $('#cont_mensajes_privado').append('<p><strong>' + datos.user + ':</strong> ' + datos.mensaje + '</p>');
});

socket.on('error_usuario', function (mensaje) {
    alert(mensaje);
    esNuevoUsuario = false; // Resetea el estado del nuevo usuario si hay un error
});

socket.on('usuario_valido', function () {
    document.getElementById('login-container').style.display = 'none';
    document.getElementById('chat-container').style.display = 'block';
    document.getElementById('welcome-text').textContent = 'Bienvenido, ' + usuario;
});

function loguear() {
    const correo = $('#login_form #correo').val();
    usuario = $('#login_form #usuario').val(); // Asignamos el usuario globalmente

    if (correo && usuario) {
        esNuevoUsuario = true;
        socket.emit('datos_usuario', { correo: correo, usuario: usuario });
    } else {
        alert('Por favor, ingresa tu correo y usuario.');
    }
}

function enviar_msj(event) {
    event.preventDefault(); // Evitamos la recarga de la página

    const mensaje = $('#mensaje').val();
    if (mensaje) {
        socket.emit('send_mensaje', { mensaje: mensaje, usuario: usuario });
        $('#mensaje').val(''); // Limpiamos el campo de entrada
    } else {
        alert('Por favor, escribe un mensaje.');
    }
}

document.getElementById('chat-form').addEventListener('submit', enviar_msj);

let selectedUser = '';

function selectUser(user) {
    selectedUser = user;
}

function enviar_msj_privado(event) {
    event.preventDefault(); // Evitamos la recarga de la página

    const mensaje_privado = $('#mensaje_privado').val();
    if (mensaje_privado && selectedUser) {
        socket.emit('send_mensaje_privado', { mensaje: mensaje_privado, usuario: usuario, destinatario: selectedUser });
        $('#cont_mensajes_privado').append('<p><strong>Tú:</strong> ' + mensaje_privado + '</p>'); // Muestra el mensaje enviado en el chat privado
        $('#mensaje_privado').val(''); // Limpiamos el campo de entrada
    } else {
        alert('Por favor, selecciona un usuario y escribe un mensaje.');
    }
}

document.getElementById('private-chat-form').addEventListener('submit', enviar_msj_privado);

function actualizarListaUsuarios(usuarios) {
    $('#private-users').empty();
    $('#private-users').append('<option value="" disabled selected>Selecciona un usuario</option>');
    usuarios.forEach(user => {
        $('#private-users').append('<option value="' + user + '">' + user + '</option>');
    });
}

$('#private-users').change(function() {
    selectedUser = $(this).val();
});


