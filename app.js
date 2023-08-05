document.addEventListener('DOMContentLoaded', () => {
    const listaEmpleados = [];
    const formulario = document.querySelector('#formulario');
    const nombreInput = document.querySelector('#nombre');
    const puestoInput = document.querySelector('#puesto');
    const btnAgregar = document.querySelector('#btnAgregar');
    const divEmpleados = document.querySelector('.div-empleados');

    formulario.addEventListener('submit', agregarEmpleado);

    function agregarEmpleado(e) {
        e.preventDefault();

        const nombre = nombreInput.value.trim();
        const puesto = puestoInput.value.trim();

        if (nombre === '' || puesto === '') {
            alert("Todos los campos son obligatorios.");
            return;
        }

        const empleado = {
            id: Date.now(),
            nombre,
            puesto
        };

        listaEmpleados.push(empleado);

        mostrarEmpleados();
        formulario.reset();
    }

    function mostrarEmpleados() {
        limpiarHTML();

        listaEmpleados.forEach(empleado => {
            const { id, nombre, puesto } = empleado;

            const parrafo = document.createElement('p');
            parrafo.textContent = `${id} - ${nombre} - ${puesto}`;

            const editarBoton = document.createElement('button');
            editarBoton.textContent = 'Editar';
            editarBoton.classList.add('btn', 'btn-editar');
            editarBoton.addEventListener('click', () => cargarEmpleado(empleado));
            parrafo.appendChild(editarBoton);

            const eliminarBoton = document.createElement('button');
            eliminarBoton.textContent = 'Eliminar';
            eliminarBoton.classList.add('btn', 'btn-eliminar');
            eliminarBoton.addEventListener('click', () => eliminarEmpleado(id));
            parrafo.appendChild(eliminarBoton);

            const hr = document.createElement('hr');

            divEmpleados.appendChild(parrafo);
            divEmpleados.appendChild(hr);
        });
    }

    function limpiarHTML() {
        while (divEmpleados.firstChild) {
            divEmpleados.removeChild(divEmpleados.firstChild);
        }
    }

    function cargarEmpleado(empleado) {
        nombreInput.value = empleado.nombre;
        puestoInput.value = empleado.puesto;

        btnAgregar.textContent = 'Guardar Cambios';
        btnAgregar.removeEventListener('click', agregarEmpleado);
        btnAgregar.addEventListener('click', () => guardarCambios(empleado.id));
    }

    function guardarCambios(id) {
        const empleado = listaEmpleados.find(empleado => empleado.id === id);
        if (empleado) {
            empleado.nombre = nombreInput.value.trim();
            empleado.puesto = puestoInput.value.trim();
            mostrarEmpleados();
            formulario.reset();
            btnAgregar.textContent = 'Agregar';
            btnAgregar.removeEventListener('click', guardarCambios);
            btnAgregar.addEventListener('click', agregarEmpleado);
        }
    }

    function eliminarEmpleado(id) {
        if (confirm('¿Estás seguro de que deseas eliminar este empleado?')) {
            const index = listaEmpleados.findIndex(empleado => empleado.id === id);
            if (index !== -1) {
                listaEmpleados.splice(index, 1);
                mostrarEmpleados();
            }
        }
    }
});
