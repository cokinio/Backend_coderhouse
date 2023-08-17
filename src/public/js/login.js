const form = document.getElementById('loginForm');

form.addEventListener('submit',e=>{
    e.preventDefault();
    const data = new FormData(form);
    const obj = {};
    data.forEach((value,key)=>obj[key]=value);
    //fetch('/api/sessions/login',{
    fetch('/api/jwt/login',{
        method:'POST',
        body:JSON.stringify(obj),
        headers:{
            'Content-Type':'application/json'
        }
    }).then(result=>{
        if(result.status===200){
            result.json()
            .then(json=>{

                Swal.fire({
                    icon: "info",
                    title: "Login realizado con exito",
                    text: "",
                    toast: true,
                    color: "#716add",
                });
                window.location.replace('/products');
            })}
            else{
            Swal.fire({
				icon: "info",
				title: "Usuario o contraseña incorrecta",
				text: "",
				toast: true,
				color: "#716add",
			});
        }
    })
})