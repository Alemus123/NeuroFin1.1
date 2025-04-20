# NeuroFin Backend

## Descripción
Backend de la aplicación NeuroFin, desarrollado con Node.js y Ts.ED. Proporciona una API RESTful para la gestión de datos financieros y análisis.

## Tecnologías
- Node.js
- TypeScript
- Ts.ED Framework


## Requisitos Previos
- Node.js (versión 18 o superior)
- npm o yarn
- MongoDB (versión 4.4 o superior)

## Instalación

1. Clonar el repositorio:
```bash
git clone [URL_DEL_REPOSITORIO]
cd backend
```

2. Instalar dependencias:
```bash
npm install
# o
yarn install
```

3. Configurar variables de entorno:
```bash
cp .env.example .env
```
Editar el archivo `.env` con las configuraciones necesarias:
```
NODE_ENV=development
PORT=3000
MONGODB_URI=mongodb://localhost:27017/neurofin
JWT_SECRET=tu_secreto_jwt
```

## Desarrollo

Para iniciar el servidor en modo desarrollo:
```bash
npm run start:dev
# o
yarn start:dev
```

## Construcción

Para crear una versión de producción:
```bash
npm run build
# o
yarn build
```

Para ejecutar la versión de producción:
```bash
npm run start:prod
# o
yarn start:prod
```

## Estructura del Proyecto
```
backend/
├── src/
│   ├── controllers/    # Controladores de la API
│   ├── services/       # Lógica de negocio
│   ├── models/         # Modelos de datos
│   ├── middlewares/    # Middlewares personalizados
│   ├── decorators/     # Decoradores personalizados
│   ├── interfaces/     # Interfaces TypeScript
│   └── config/         # Configuraciones
├── test/              # Pruebas
└── package.json       # Dependencias y scripts
```

## API Documentation
La documentación de la API está disponible en `/api-docs` cuando el servidor está en ejecución.

## Pruebas
Para ejecutar las pruebas:
```bash
npm test
# o
yarn test
```

## Contribución
1. Crear una rama para la nueva funcionalidad
2. Hacer commit de los cambios
3. Crear un Pull Request

## Licencia
[MIT](LICENSE) 