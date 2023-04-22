const cart="6442a68c18b76eef7315b694";

function agregarACarrito(productID,cartID){
    console.log("llegue onclick")
    // Options to be given as parameter 
    // in fetch for making requests
    // other then GET
    let options = {
        method: 'POST',
        headers: {
            'Content-Type': 
                'application/json;charset=utf-8'
        },
        //body: JSON.stringify(user)
    }
    let fetchRes = fetch(`http://localhost:8080/api/carts/${cart}/product/${productID}`, 
                                    options);
    fetchRes.then(res =>
        res.json()).then(d => {
            console.log(d)
        })
}