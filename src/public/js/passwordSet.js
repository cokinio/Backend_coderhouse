const form = document.getElementById('passwordSetForm');

form.addEventListener('submit',e=>{
    e.preventDefault();
    const data = new FormData(form);
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const token = urlParams.get('token');
    const obj = {};
    data.forEach((value,key)=>obj[key]=value);
    obj.token=token;

    fetch('/api/sessions/seteoClave',{
        method:'POST',
        body:JSON.stringify(obj),
        headers:{
            'Content-Type':'application/json'
        }
    }).then(result=>result.json())
      .then(json=>{
 
      if(!json.error){
        Swal.fire({
            icon: "info",
            title: "Se ha actualizado la clave de usuario exitosamente",
            text: "",
            toast: true,
            color: "#716add",
        });
       
    }else{
        Swal.fire({
            icon: "info",
            title: "Error - No se ha podido actualizar clave de usuario",
            text: "",
            toast: true,
            color: "#716add",
        });
    }
})})