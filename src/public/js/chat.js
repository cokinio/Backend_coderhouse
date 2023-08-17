const socket = io();
let user= document.getElementById('email').innerText; 

const catBox = document.getElementById('chatBox')

//Guardar mensajes por usuario y mostrarlo en nuesto log de mensajes.
catBox.addEventListener('keyup', evt=>{
    if(evt.key === 'Enter'){
        if(catBox.value.trim().length > 0){
            socket.emit('chatmessage', {user: user, message: catBox.value})
            catBox.value = "";
        }
        else{
            alert("Por favor escribir una palabra/mensaje, los espacios no son validos")
        }
    }
})


// Escuchamos de todos los usuarios que estan conectados
socket.on('messageLogs', async data=>{
    const messageLogs = document.getElementById('messageLogs');
    let logs='';
    let datos=await data;
    datos.forEach(log=>{
        logs += `${log.user} dice: ${log.message}<br/>`
    })
    messageLogs.innerHTML=logs;
})


// Aqui escuchamos los nuevos usuarios que se conectan al chat
socket.on('userConnected', data =>{
    let message = `Nuevo usuario conectado: ${data}`
    Swal.fire({
        icon:  'info', 
        title: 'Nuevo usuario entra al chat!!',
        text: message,
        toast: true,
        color: '#716add'
    })
})
