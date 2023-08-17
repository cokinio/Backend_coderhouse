const socket = io();
document.getElementById("formulario").addEventListener("submit", function(event){
    event.preventDefault()
  });

  const submit1 = document.getElementById('submit');
  submit1.onclick=emitirMensaje;

  function emitirMensaje (evt){
    let form={
      titulo:formulario.titulo.value,
      descripcion: formulario.descripcion.value,
      categoria: formulario.categoria.value,
      precio: formulario.precio.value,
      stock: formulario.stock.value,
      thumbnail: formulario.thumbnail.files[0].name || "/"};
       socket.emit('message',form);
  }

  socket.on('producto',data=>{
    let htmlProduct= document.getElementById("producto");
    let html=`
      <div class='card d-flex flex-wrap' style='width: 20rem;'>
				<img src=${data.thumbnail} class='card-img-top' alt='...' />
				<div class='card-body'>
					<h5 class='card-title'>${data.titulo}</h5>
					<p class='card-text'>${data.descripcion}.</p>
				</div>
				<ul class='list-group list-group-flush'>
					<li class='list-group-item'>Precio: ${data.precio}</li>
					<li class='list-group-item'>Stock disponible:${data.stock}</li>
					<li class='list-group-item'>Codigo de producto: ${data.code}</li>
				</ul>
			</div>
    `;
    htmlProduct.innerHTML=html;
  });