// Elementos principales del DOM
const contenedor = document.getElementById('contenedordepaginas');
const tabs = document.querySelectorAll('.tab');

// Plantillas de respaldo si se abre con protocolo file:// (doble click)
const plantillasDefault = {
    harry: `
        <h1>Personajes de Harry Potter</h1>
        <p>Aquí algunos de ellos:</p>
        <div id="datosprincipal"></div>
    `,
    perfil: `
        <h2>Perfil / Lista de Integrantes</h2>
        <p>Datos de estudiantes:</p>
        <div id="datosperfil" class="grid-perfil"></div>
    `,
    tl: `
        <h2>Módulo Rick and Morty</h2>
        <div class="contenido-tl">
            <p>Espacio reservado para el módulo Rick and Morty.</p>
        </div>
    `
};

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
 * Carga el módulo en el contenedor principal.
 * Intenta hacer fetch del HTML local, y si falla (por protocolo file:// o CORS local),
 * usa la plantilla HTML por defecto.
 */
async function cargarModulo(modulo) {
    contenedor.innerHTML = '<p class="cargando">Cargando personajes...</p>';

    let htmlVista = plantillasDefault[modulo] || plantillasDefault.harry;

    // Intentar obtener el HTML del archivo del módulo (si se ejecuta en servidor)
    try {
        const ruta = `./${modulo}/index.html`;
        const respuesta = await fetch(ruta);
        if (respuesta.ok) {
            const textHtml = await respuesta.text();
            const parser = new DOMParser();
            const doc = parser.parseFromString(textHtml, 'text/html');
            if (doc.body && doc.body.innerHTML.trim() !== '') {
                htmlVista = doc.body.innerHTML;
            }
        }
    } catch (e) {
        console.warn('Ejecutando en entorno local file://. Usando plantilla directa para:', modulo);
    }

    // Inyectar el HTML en el contenedor
    contenedor.innerHTML = htmlVista;

    // Ejecutar lógica del módulo correspondiente
    switch (modulo) {
        case 'harry':
            await ejecutarLogicaHarry();
            break;
        case 'perfil':
            await ejecutarLogicaPerfil();
            break;
        case 'tl':
            ejecutarLogicaTL();
            break;
    }
}

/*LÓGICA PRINCIPAL */


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

/**
  Lógica del módulo Perfil
 */
async function ejecutarLogicaPerfil() {
    const contenedorPerfil = document.getElementById('datosperfil');
    if (!contenedorPerfil) return;

    let {
        nombre,
        edad,
        carrera,
        foto,
        universidad,
        tecnologias,

    } = {
        nombre: "Juan David Arzayus Cadavid",
        edad: 24,
        carrera: "Ingenieria de sistemas",
        foto: "./perfil/juan-arzayus.png",
        PerfilProfesional: "Ingeniero de software",
        universidad: "Universidad Santiago de Cali",
        tecnologias: ["HTML", "CSS", "JavaScript", "Python", "Java", "C#", "Node.js", "React"],
    }

    const datosPerfil = {
        "nombre": "Juan David Arzayus Cadavid",
        "edad": 24,
        "carrera": "Ingenieria de sistemas",
        "foto": "./perfil/juan-arzayus.png",
        "PerfilProfesional": "Ingeniero de software",
        "universidad": "Universidad Santiago de Cali",
        "tecnologias": ["HTML", "CSS", "JavaScript", "Python", "Java", "C#", "Node.js", "React"],
    }

    contenedorPerfil.innerHTML = `
    <img src="${foto}" alt="${nombre}">
    <h3>${nombre}</h3>
    <div class="info">
        <p><b>Edad:</b> ${edad}</p>
        <p><b>Carrera:</b> ${carrera}</p>
        <p><b>Perfil Profesional:</b> ${PerfilProfesional}</p>
    </div>
`;
    /**
      Lógica de Rick and Morty
     */

    function ejecutarLogicaTL() {
        console.log('Módulo Tema Libre activo.');
    }

};