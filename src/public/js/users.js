const host = "http://"+window.location.host;

function cambiarRol(userID) {
     console.log(userID)
	let options = {
		method: "GET",
		headers: {
			"Content-Type": "application/json;charset=utf-8",
		},
	};
   
	let fetchRes = fetch(
		`${host}/api/users/premium/${userID}`,
		options
	);
	fetchRes
		.then((res) => res.json())
		.then((d) => {
		 	if (d[0]===false){
			Swal.fire({
				icon: "info",
				title: "aun no se han verificado los documentos para ser premium",
				text: "",
				toast: true,
				color: "#716add",
			});
		 }else{
			Swal.fire({
				icon: "info",
				title: "usuario cambiado de rol con exito",
				text: "",
				toast: true,
				color: "#716add",
		 })
		}
	});
	setTimeout(function(){
		window.location.reload();
	}, 2000);
		
}


function eliminarUsuario(userID) {
    console.log(userID)
	let options = {
		method: "DELETE",
		headers: {
			"Content-Type": "application/json;charset=utf-8",
		},
	};
	let fetchRes = fetch(
		`${host}/api/users/${userID}`,
		options
	);
	fetchRes
		.then((res) => res.json())
		.then((d) => {
			console.log(d);
			Swal.fire({
				icon: "info",
				title: "Usuario eliminado correctamente",
				text: "",
				toast: true,
				color: "#716add",
			});
		});
		window.location.reload();
}
