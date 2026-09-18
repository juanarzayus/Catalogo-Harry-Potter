
export async function ejecutarLogicaHarry() {
    const contenedorDatos = document.getElementById('datosprincipal');
    if (!contenedorDatos) return;

    contenedorDatos.innerHTML = '<p class="cargando">Cargando personajes de Harry Potter...</p>';

    try {
        const respuestaApi = await fetch('https://hp-api.onrender.com/api/characters');
        if (!respuestaApi.ok) throw new Error('Error en la respuesta de la API');

        const personajes = await respuestaApi.json();
        contenedorDatos.innerHTML = '';

        let contador = 0;
        personajes.forEach(personaje => {
            if (personaje.image && personaje.image.trim() !== "") {
                contador++;
                const card = document.createElement('div');
                card.className = 'card';
                card.innerHTML = `
                    <img src="${personaje.image}" alt="${personaje.name}">
                    <h3>${personaje.name}</h3>
                    <div class="info">
                        <p><b>Casa:</b> ${personaje.house || 'Desconocida'}</p>
                        <p><b>Actor:</b> ${personaje.actor || 'Desconocido'}</p>
                        <p><b>Especie:</b> ${personaje.species || 'Desconocida'}</p>
                        <p><b>Nacimiento:</b> ${personaje.dateOfBirth || 'Desconocido'}</p>
                        <p><b>Patronus:</b> ${personaje.patronus || 'Ninguno'}</p>
                    </div>
                `;
                contenedorDatos.appendChild(card);
            }
        });

        if (contador === 0) {
            contenedorDatos.innerHTML = '<p>No se encontraron personajes con imagen.</p>';
        }
    } catch (error) {
        console.error('Error cargando la API de Harry Potter:', error);
        contenedorDatos.innerHTML = `<p class="error">No se pudieron cargar los datos de la API (${error.message}). Revisa tu conexión a internet.</p>`;
    }
}