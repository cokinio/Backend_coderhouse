const cart = "6442a68c18b76eef7315b694";
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
let limit = urlParams.get("limit");
limit==null ? limit=10 : limit;
window.onload=()=>{document.getElementById("limit").value=parseInt(limit)} 

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
	const queryString = window.location.search;
	const urlParams = new URLSearchParams(queryString);
	let sort = urlParams.get("sort");
	sort == undefined ? (sort = 1) : sort;
	//cambio el orden
	sort = sort * -1;
	let url = armarUrl(null,sort,null);
	window.open(url,"_self");
    
}

    function categoria(category){
       	let url = armarUrl(category);
		console.log(url)
        window.open(url,"_self");
    }

	function setLimit(){
		let limit = document.getElementById("limit").value;
		let url = armarUrl(null,null,limit);
		console.log(url)
        window.open(url,"_self");
	}

	function armarUrl(category1,sort1, limit1){
		let params=[];
		const queryString = window.location.search;
		const urlParams = new URLSearchParams(queryString);
		params[0] = urlParams.get("category");
		params[1] = urlParams.get("sort");
		params[2] = urlParams.get("limit");

		//me fijo si pase algun dato para actualizar en la funcion
		category1 ? params[0]= category1 : params[0]="";
		sort1 ? params[1]=sort1 : params[1]=-1;
		limit1 ? params[2]=limit1 : params[2]="";

		let url=`http://localhost:8080?category=${params[0]}&sort=${params[1]}&limit=${params[2]}`;
		return url;

	}

