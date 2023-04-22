function eliminarProducto(productID){
    console.log("llegue onclick")
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const cartID=urlParams.get('cid');
    console.log(cartID);
    // Options to be given as parameter 
    // in fetch for making requests
    // other then GET
    let options = {
        method: 'DELETE',
        headers: {
            'Content-Type': 
                'application/json;charset=utf-8'
        },
        //body: JSON.stringify(user)
    }
    let fetchRes = fetch(`http://localhost:8080/api/carts/${cartID}/product/${productID}`, 
                                    options);
    fetchRes.then(res =>
        res.json()).then(d => {
            console.log(d);
            window.location.reload();
        })
        

}