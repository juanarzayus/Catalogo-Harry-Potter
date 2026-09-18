// Elementos principales del DOM
const contenedor = document.getElementById('contenedordepaginas');
const tabs = document.querySelectorAll('.tab');

// Escuchar eventos en los botones de navegación (Tabs)
tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        const modulo = tab.getAttribute('data-modulo');
        cargarModulo(modulo);
    });
});

// Cargar el módulo inicial (Harry) al iniciar
document.addEventListener('DOMContentLoaded', () => {
    cargarModulo('harry');
});

/**
 * Carga el módulo en el contenedor principal leyendo directamente el HTML local del módulo.
 */
async function cargarModulo(modulo) {
    contenedor.innerHTML = '<p class="cargando">Cargando contenido...</p>';

    // Determinar la carpeta correcta
    const carpetaModulo = (modulo === 'tl') ? 'rick' : modulo;

    try {
        const ruta = `./${carpetaModulo}/index.html`;
        const respuesta = await fetch(ruta);
        if (respuesta.ok) {
            const textHtml = await respuesta.text();
            const parser = new DOMParser();
            const doc = parser.parseFromString(textHtml, 'text/html');
            if (doc.body && doc.body.innerHTML.trim() !== '') {
                contenedor.innerHTML = doc.body.innerHTML;
            }
        } else {
            throw new Error(`No se pudo cargar la vista de ${carpetaModulo}`);
        }
    } catch (e) {
        console.error('Error cargando la vista del módulo:', e);
        contenedor.innerHTML = `<p class="error">Error al cargar la página (${e.message}).</p>`;
    }

    // Ejecutar lógica del módulo correspondiente
    switch (modulo) {
        case 'harry':
            await ejecutarLogicaHarry();
            break;
        case 'perfil':
            await ejecutarLogicaPerfil();
            break;
        case 'tl':
        case 'rick':
            await ejecutarLogicaTL();
            break;
    }
}

/* LÓGICA MÓDULO HARRY POTTER */
async function ejecutarLogicaHarry() {
    const contenedorDatos = document.getElementById('datosprincipal');
    if (!contenedorDatos) return;

    try {
        const respuestaApi = await fetch('https://hp-api.onrender.com/api/characters');
        if (!respuestaApi.ok) throw new Error('Error en la respuesta de la API');

        const personajes = await respuestaApi.json();
        contenedorDatos.innerHTML = ''; // Limpiar loader

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

/* LÓGICA MÓDULO PERFIL */
async function ejecutarLogicaPerfil() {
    console.log('Módulo Perfil activo.');
}

/* LÓGICA MÓDULO RICK AND MORTY (TEMA LIBRE) */
async function ejecutarLogicaTL() {
    const contenedorRick = document.getElementById('datosrick');
    if (!contenedorRick) return;

    contenedorRick.innerHTML = '<p class="cargando">Cargando personajes de Rick and Morty...</p>';

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