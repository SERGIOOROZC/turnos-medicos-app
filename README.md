# turnos_medicos_app

Este es un proyecto para la gestión de turnos médicos, desarrollado con Node.js, Express y MySQL.

## Instalación

1.  Clona este repositorio:
    `git clone https://github.com/SERGIOOROZC/turnos-medicos-app.git`
2.  Navega al directorio `src`:
    `cd turnos-medicos-app/src`
3.  Instala las dependencias:
    `npm install`

## Configuración

Crea un archivo `.env` en el directorio `src` con las siguientes variables de entorno para la conexión a la base de datos:

```
DB_HOST=your_database_host
DB_USER=your_database_user
DB_PASSWORD=your_database_password
DB_NAME=your_database_name
```

## Uso

Para iniciar el servidor, ejecuta desde el directorio `src`:

`node app.js`

## Entidades Principales

*   **Pacientes**: Información de los pacientes.
*   **Médicos**: Información de los médicos y sus especialidades.
*   **Turnos**: Detalles de los turnos agendados (fecha, hora, paciente, médico).
