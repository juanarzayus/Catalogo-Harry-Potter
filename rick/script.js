/**
 * Lógica del Módulo Rick y Morty
 */
export async function ejecutarLogicaRick() {
    const contenedorRick = document.getElementById('datosrick');
    if (!contenedorRick) return;

    contenedorRick.innerHTML = '<p class="cargando">Cargando personajes de Rick y Morty...</p>';

    try {
        const respuesta = await fetch('./rick/datos.json');
        if (!respuesta.ok) throw new Error('No se pudo cargar datos.json');
        const personajes = await respuesta.json();

        contenedorRick.innerHTML = '';
        personajes.forEach(personaje => {
            const card = document.createElement('div');
            card.className = 'card-rick';
            card.innerHTML = `
                <img src="${personaje.imagen}" alt="${personaje.nombre}" referrerpolicy="no-referrer" onerror="this.onerror=null;this.src='https://rickandmortyapi.com/api/character/avatar/1.jpeg';">
                <h3>${personaje.nombre} ${personaje.apellido || ''}</h3>
                <div class="info">
                    <p><b>Edad:</b> ${personaje.edad}</p>
                    <p><b>Especie:</b> ${personaje.especie}</p>
                    <p><b>Género:</b> ${personaje.genero}</p>
                </div>
            `;
            contenedorRick.appendChild(card);
        });
    } catch (error) {
        console.error('Error al cargar los personajes de Rick y Morty:', error);
        contenedorRick.innerHTML = `<p class="error">Error cargando el catálogo: ${error.message}</p>`;
    }
}
