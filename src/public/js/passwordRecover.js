const form = document.getElementById('recoverForm');

form.addEventListener('submit',e=>{
    e.preventDefault();
    const data = new FormData(form);
    console.log(data);
    const obj = {};
    data.forEach((value,key)=>obj[key]=value);
    console.log("Objeto formado:");
    console.log(obj);
    fetch('/api/sessions/recuperoClave',{
        method:'POST',
        body:JSON.stringify(obj),
        headers:{
            'Content-Type':'application/json'
        }
    }).then(result=>result.json())
      .then(json=>{
        console.log(json);
        if(!json.error){
          Swal.fire({
              icon: "info",
              title: "Se ha enviado email con link de recupero de clave",
              text: "",
              toast: true,
              color: "#716add",
          });
         
      }else{
          Swal.fire({
              icon: "info",
              title: "Ha ocurrido un error",
              text: "",
              toast: true,
              color: "#716add",
          });
      }
      })})

