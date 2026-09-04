const contenedorPrincipal = document.getElementById('datosprincipal');


async function getDatos() {
    console.log('caso 1');
    try {
        const respuestaDeDatos = await fetch('https://hp-api.onrender.com/api/characters');
        console.log(respuestaDeDatos);
        const datosHarry = await respuestaDeDatos.json();
        console.log(datosHarry);

        datosHarry.forEach((personaje) => {
            if (personaje.image != "") {
                crearPersonajes(personaje);
            }
        });

    } catch (error) {
        console.error("esta fallando en: ", error)
    }
}
function crearPersonajes(p) {
    const contenedor = document.createElement('div');
    contenedor.className = 'card';

    contenedor.innerHTML = `
    <img src="${p.image}" alt="${p.name}">
    <h3>${p.name}</h3>
    <div class="info">
        <p><b>Casa:</b> ${p.house || 'Desconocida'}</p>
        <p><b>Actor:</b> ${p.actor || 'Desconocido'}</p>
        <p><b>Especie:</b> ${p.species || 'Desconocida'}</p>
        <p><b>Nacimiento:</b> ${p.dateOfBirth || 'Desconocido'}</p>
        <p><b>Patronus:</b> ${p.patronus || 'Ninguno'}</p>
    </div>
    `;
    contenedorPrincipal.appendChild(contenedor);

}


getDatos()