const cart = "6442a68c18b76eef7315b694";

function agregarACarrito(productID, cartID) {
	console.log("llegue onclick");
	// Options to be given as parameter
	// in fetch for making requests
	// other then GET
	let options = {
		method: "POST",
		headers: {
			"Content-Type": "application/json;charset=utf-8",
		},
		//body: JSON.stringify(user)
	};
	let fetchRes = fetch(
		`http://localhost:8080/api/carts/${cart}/product/${productID}`,
		options
	);
	fetchRes
		.then((res) => res.json())
		.then((d) => {
			console.log(d);
			Swal.fire({
				icon: "info",
				title: "Producto agregado al carrito exitosamente",
				text: "",
				toast: true,
				color: "#716add",
			});
		});
}

function ordenar() {
    console.log("entre ordenar")
	const queryString = window.location.search;
	const urlParams = new URLSearchParams(queryString);
	let sort = urlParams.get("sort");
    let category = urlParams.get("category");
	console.log(`sort es ${sort} y category ${category}`);
	sort == undefined ? (sort = 1) : sort;
	//cambio el orden
	sort = sort * -1;
	console.log(`sort es ${sort}`);
    if (!category){
        window.open(`http://localhost:8080?sort=${sort}`,"_self");
    }else{
        window.open(`http://localhost:8080?category=${category}&sort=${sort}`,"_self");
    }

    function categoria(category){
        const url=window.location.href;
        window.open(url+"&","_self");
    }
}
