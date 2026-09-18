/**
 * Lógica del Módulo Perfil
 */
export async function ejecutarLogicaPerfil() {
    const contenedorPerfil = document.getElementById('datosperfil');
    if (!contenedorPerfil) return;

    try {
        const respuesta = await fetch('./perfil/datos.json');
        if (!respuesta.ok) throw new Error('No se pudo cargar datos.json del perfil');
        const datos = await respuesta.json();

        const badgesHtml = datos.tecnologias && datos.tecnologias.length > 0
            ? datos.tecnologias.map(tech => `<span class="badge">${tech}</span>`).join('')
            : '';

        contenedorPerfil.innerHTML = `
            <h3>${datos.nombre}</h3>
            <p class="perfil-rol">${datos.PerfilProfesional} | Estudiante de ${datos.carrera}</p>

            <div class="perfil-detalles-grid">
                <div class="detalle-item">
                    <span class="label">Edad:</span>
                    <span class="valor">${datos.edad} años</span>
                </div>
                <div class="detalle-item">
                    <span class="label">Carrera:</span>
                    <span class="valor">${datos.carrera}</span>
                </div>
                <div class="detalle-item">
                    <span class="label">Universidad:</span>
                    <span class="valor">${datos.universidad}</span>
                </div>
                <div class="detalle-item">
                    <span class="label">Perfil Profesional:</span>
                    <span class="valor">${datos.PerfilProfesional}</span>
                </div>
            </div>

            <div class="tecnologias-seccion">
                <h4>Tecnologías & Habilidades:</h4>
                <div class="badges-tecnologias">
                    ${badgesHtml}
                </div>
            </div>
        `;
    } catch (error) {
        console.error('Error cargando los datos del perfil:', error);
    }
}
