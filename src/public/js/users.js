
function cambiarRol(userID) {
     console.log(userID)
	let options = {
		method: "GET",
		headers: {
			"Content-Type": "application/json;charset=utf-8",
		},
	};
   
	let fetchRes = fetch(
		`http://localhost:8080/api/users/premium/${userID}`,
		options
	);
	fetchRes
		.then((res) => console.log(res))
		.then((d) => {
			Swal.fire({
				icon: "info",
				title: "Usuario cambiado de rol exitosamente",
				text: "",
				toast: true,
				color: "#716add",
			});
		});
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
		`http://localhost:8080/api/users/${userID}`,
		options
	);
	fetchRes
		.then((res) => console.log(res))
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
}
