const cart = "6442a68c18b76eef7315b694";
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
let limit = urlParams.get("limit");
let stock = urlParams.get("stockMin");
limit==null ? limit=10 : limit;
stock==null ? stock=0 : stock;
window.onload=()=>{document.getElementById("limit").value=parseInt(limit);
					document.getElementById("stockMin").value=parseInt(stock);
} 

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

function logout(){
	let fetchRes = fetch(
		`http://localhost:8080/api/sessions/logout`
	);
	fetchRes.then((res)=>{
		console.log(res);
		window.open("http://localhost:8080/products","_self");})
}


function ordenar() {
	const queryString = window.location.search;
	const urlParams = new URLSearchParams(queryString);
	let sort = urlParams.get("sort");
	sort == undefined ? (sort = 1) : sort;
	//cambio el orden
	sort = sort * -1;
	let url = armarUrl(null,sort,null,null);
	window.open(url,"_self");
    
}

    function categoria(category){
       	let url = armarUrl(category,null,null,null);
		console.log(url)
        window.open(url,"_self");
    }

	function setStock(){
		let stock = document.getElementById("stockMin").value;
		let url = armarUrl(null,null,null,stock);
		console.log(url)
        window.open(url,"_self");
	}	

	function setLimit(){
		let limit = document.getElementById("limit").value;
		let url = armarUrl(null,null,limit,null);
		console.log(url)
        window.open(url,"_self");
	}

	function armarUrl(category1,sort1, limit1,stock1){
		let params=[];
		const queryString = window.location.search;
		const urlParams = new URLSearchParams(queryString);
		params[0] = urlParams.get("category");
		params[1] = urlParams.get("sort");
		params[2] = urlParams.get("limit");
		params[3] = urlParams.get("stockMin");
		console.log(params)
		//me fijo si pase algun dato para actualizar en la funcion
		if (category1!=null){
			params[0]= category1;
		}else{
			if (params[0]==null){
				params[0]="";
			}
		}
		
		if (sort1!=null){
			params[1]= sort1;
		}else{
			if (params[1]==null){
				params[1]=-1;
			}
		}
		if (limit1!=null){
			params[2]= limit1;
		}else{
			if (params[2]==null){
				params[2]=10;
			}
		}

		if (stock1!=null){
			params[3]= stock1;
		}else{
			if (params[3]==null){
				params[3]=0;
			}
		}

		let url=`http://localhost:8080/products/?category=${params[0]}&sort=${params[1]}&limit=${params[2]}&stockMin=${params[3]}`;
		return url;

	}

