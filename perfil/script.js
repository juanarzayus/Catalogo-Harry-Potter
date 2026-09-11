const contenedorPrincipal = document.getElementById('datosprincipal'); {


    async function getDatos() {



        const respuestaDeDatos = await fetch('datosperfil.json');
        console.log(respuestaDeDatos);

        const datos = await respuestaDeDatos.json();
        console.log(datos);
    }





}


