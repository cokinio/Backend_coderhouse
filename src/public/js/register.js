const form = document.getElementById('registerForm');

form.addEventListener('submit',e=>{
    e.preventDefault();
    const data = new FormData(form);
    console.log(data);
    const obj = {};
    data.forEach((value,key)=>obj[key]=value);
    console.log("Objeto formado:");
    console.log(obj);
    fetch('/api/sessions/register',{
        method:'POST',
        body:JSON.stringify(obj),
        headers:{
            'Content-Type':'application/json'
        }
    }).then(result=>result.json())
      .then(json=>{
        console.log(json);
        console.log(json.error);
        console.log(Object.keys(json));
        if(!json.error){
        Swal.fire({
            icon: "info",
            title: "Se ha creado el usuario exitosamente",
            text: "",
            toast: true,
            color: "#716add",
        });
        fetch('/api/email',{
            method:'POST',
            body:JSON.stringify(obj),
            headers:{
                'Content-Type':'application/json'
            }})
    }
    else{
        Swal.fire({
            icon: "info",
            title: "Error - No se ha podido registrar usuario",
            text: "",
            toast: true,
            color: "#716add",
        });
    }    
})   
 }
)

