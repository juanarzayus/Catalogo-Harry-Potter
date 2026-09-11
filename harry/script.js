const contenedorPrincipal = document.getElementById('datosprincipal');


async function getDatos(){
    console.log('caso 1');
    try{
    const respuestaDeDatos = await fetch('./data.json');
    console.log(respuestaDeDatos);
    const datosHarry = await respuestaDeDatos.json();
    console.log(datosHarry);

    datosHarry.forEach((personaje)=>{
   
            crearPersonajes(personaje);
     
    });

    }catch(error){
        console.error("esta fallando en: ", error)
    }
}
function crearPersonajes(p){
    const contenedor = document.createElement('div');
    contenedor.className = 'card';

    contenedor.innerHTML=`
    <h2>${p.nombre}</h2>
    <b>${p.edad}</b>
    `;
    contenedorPrincipal.appendChild(contenedor);

}

getDatos()