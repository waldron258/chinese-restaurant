# Chinese Restaurant

Este documento contiene la información necesaria para correr y navegar en el proyecto

**Note: Es importante que la api esté corriendo. Sin esto no es posible realizar ninguna operación.**

## Comandos

### `npm install`

Se instalarán todas las dependencias con este comando.

### `npm start`

Corre el proyecto en el puerto http://localhost:3000.

## Funcionalidades

### Creación de platillos

Dirigirse a "Create Food" y llenar los datos solicitados. Una vez llenados, presionar el botón de "Add Food" para crear el platillo.

### Listado Para Todos los Platillos

Dirigirse a la ruta "/". Los platillos existentes se listan por defecto.

### Búsqueda de Platillo en específico

Dirigirse a "Find Food" y llenar el campo con el que desea realizar la búsqueda. Presionar el botón "Find Food" para realizar la búsqueda. Los campos permitidos son el nombre exacto del platillo o su id. Si ambos campos son llenados, se prioriza la búsqueda por id.

### Edición de Información de Platillos

Ya sea en la ruta "/" o en los resultados de la búsqueda de platillo, seleccionar el botón de edición y éste enrutará a un formulario de edición del platillo. Presionar el botón "Update Food" para actualizar la información del platillo.

### Eliminación de Platillos

Ya sea en la ruta "/" o en los resultados de la búsqueda de platillo, seleccionar el botón de eliminación y éste mostrará una alerta de confirmación de eliminación. Al presionar el botón "yes" el platillo será eliminado permanentemente.
