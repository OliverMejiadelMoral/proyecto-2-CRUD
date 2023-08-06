1.-Agregar un detector de eventos para DOMContentLoaded:
Comenzamos agregando un detector de eventos que espera a que el DOM esté completamente cargado antes de ejecutar cualquier código JavaScript. 
Esto asegura que el código JavaScript no se ejecutará hasta que los elementos HTML estén listos:

" document.addEventListener('DOMContentLoaded', () "


2.-Definir Variables y Seleccionar Elementos:
Dentro del detector de eventos, definir las variables necesarias y seleccione los elementos del DOM con los que necesitaras trabajar:

"
 const listaEmpleados = [];
 const formulario = document.querySelector('#formulario');
 const nombreInput = document.querySelector('#nombre');
 const puestoInput = document.querySelector('#puesto');
 const btnAgregar = document.querySelector('#btnAgregar');
 const divEmpleados = document.querySelector('.div-empleados'); "

3.-Agregar detector de eventos para envío de formularios (Agregar Empleado):
Agregamos un detector de eventos al formulario que escuche el evento de envío y llame a una función para agregar un empleado cuando se envíe el formulario.

"formulario.addEventListener('submit', agregarEmpleado);"

4.-Crear la Función Agregar Empleado:
Definir la función agregarEmpleado que maneja el envío de formularios, valida la entrada, crea un objeto de empleado, lo agrega a la lista y actualiza la interfaz de usuario.

*trim es para quitar espacios iniciales finales y repetidos del texto"

" function agregarEmpleado(e) {
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
 } "

 5.-Crear la Función Mostrar Empleados:
Definir la función mostrarEmpleados que recorre la lista de empleados, crea elementos HTML para cada empleado y los muestra en la interfaz de usuario.


"function mostrarEmpleados() {
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
 });"


6.-Crear la Función Limpiar HTML:
Definir la función limpiarHTML que elimina los elementos de la interfaz de usuario de los empleados antes de actualizar la lista.
"
function limpiarHTML() {
 while (divEmpleados.firstChild) {
 divEmpleados.removeChild(divEmpleados.firstChild);
 }
 }

 "

7.-Añadir Botones Editar y Eliminar:
Dentro de la función mostrarEmpleados, crea los botones "Editar" y "Eliminar" para cada empleado. Agregue detectores de eventos a estos botones para editar y eliminar empleados.

" const eliminarBoton = document.createElement('button');
 eliminarBoton.textContent = 'Eliminar';
 eliminarBoton.classList.add('btn', 'btn-eliminar'); "

" const editarBoton = document.createElement('button');
 editarBoton.textContent = 'Editar';
 editarBoton.classList.add('btn', 'btn-editar'); "


8.-Implementar Lógica de Edición y Eliminación:
Definir las funciones cargarEmpleado, guardarCambios y eliminarEmpleado para manejar la edición y eliminación de empleados. 
Estas funciones modificarán la matriz de listaEmpleados y actualizarán la interfaz de usuario en consecuencia.


" function cargarEmpleado(empleado) {
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
 } "



9.- Agregar Event Listener para el botón Editar:
En la función cargarEmpleado, completar los campos del formulario con los datos del empleado seleccionado y cambie el comportamiento del botón "Agregar" a "Guardar Cambios". 
Adjuntar un detector de eventos al botón "Guardar Cambios" para llamar a la función guardarCambios.


10.-Implementar Editar y Borrar Lógica:
En la función guardarCambios, buscar el empleado a editar en la matriz listaEmpleados, actualizar sus datos y luego actualizar la UI.
En la función eliminarEmpleado, solicitar confirmación al usuario y luego eliminar al empleado seleccionado de la matriz de listaEmpleados y actualizar la interfaz de usuario.

11.-Incluir el Archivo JavaScript en HTML:
Finalmente, incluir el archivo JavaScript app.js en el HTML justo antes de la etiqueta de cierre 
</body> usando una etiqueta <script>.