# Sistema de inventario

Aplicación básica orientada a pequeños negocios que necesitan llevar un control de su inventario de forma sencilla y efectiva.

## Funcionalidades principales
.Gestión de productos: alta, baja y edición.

.Control de stock: se registra cantidad y movimientos.

.Categorización de productos: cada producto pertenece a una categoría.

.Movimientos de inventario: se registran ingresos y egresos.

.Listado de productos, categorias y movimientos: Facil visualización de los elemento mencionados


## Tecnologías utilizadas
Frontend: React

Backend: Node.js + Express

Base de datos: PostgreSQL

ORM: Sequelize

Contenedores: Docker & Docker Compose

.Requisitos previos
Tener Docker y Docker Compose instalados.

## Instalación y ejecución
Clonar el repositorio

```
git clone https://github.com/FrancoJulianRossi/TP-Final-Prog3

cd TP-Final-Prog3
```
Levantar la aplicación
```
docker-compose up --build
```
La app estará disponible en: http://localhost:3000

### Contenido del .env
```
# ===========================================
# BASE DE DATOS POSTGRESQL 
# ===========================================
POSTGRES_DB=app_database
POSTGRES_USER=app_user
POSTGRES_PASSWORD=app_password

# ===========================================
# BACKEND (EXPRESS)
# ===========================================
NODE_ENV=development
PORT=3001

# Configuración de base de datos para Sequelize
DB_HOST=database
DB_PORT=5432
DB_NAME=app_database
DB_USER=app_user
DB_PASSWORD=app_password

# JWT para autenticación
JWT_SECRET=mi_jwt_secret_super_seguro_para_desarrollo_2025

# CORS - Permitir requests desde el frontend
CORS_ORIGIN=http://localhost:3000

# ===========================================
# FRONTEND (REACT)
# ===========================================
REACT_APP_API_URL=http://localhost:3001/api
REACT_APP_ENV=development

# Hot reload optimizado para Docker
CHOKIDAR_USEPOLLING=true
WATCHPACK_POLLING=true
FAST_REFRESH=true

# WebSocket para hot reload
WDS_SOCKET_HOST=localhost
WDS_SOCKET_PORT=3000
WDS_SOCKET_PATH=/ws

# ESLint en desarrollo
ESLINT_NO_DEV_ERRORS=true
GENERATE_SOURCEMAP=true

# ===========================================
# REDIS
# ===========================================
REDIS_HOST=redis
REDIS_PORT=6379
REDIS_URL=redis://redis:6379

# ===========================================
# PGADMIN 4
# ===========================================
PGADMIN_DEFAULT_EMAIL=admin@example.com
PGADMIN_DEFAULT_PASSWORD=admin123
PGADMIN_CONFIG_SERVER_MODE=False
PGADMIN_CONFIG_MASTER_PASSWORD_REQUIRED=False

# ===========================================
# CONFIGURACIÓN DE DESARROLLO
# ===========================================
DEBUG=true
LOG_LEVEL=debug
UPLOAD_PATH=./uploads
MAX_FILE_SIZE=10MB

# Email para desarrollo (Mailtrap)
EMAIL_HOST=smtp.mailtrap.io
EMAIL_PORT=2525
EMAIL_USER=tu_usuario_mailtrap
EMAIL_PASS=tu_password_mailtrap
EMAIL_FROM=noreply@tuapp.com

# ===========================================
# SEGURIDAD (DESARROLLO)
# ===========================================
RATE_LIMIT_REQUESTS=100
RATE_LIMIT_WINDOW_MS=900000
SESSION_SECRET=mi_session_secret_para_desarrollo
COOKIE_SECURE=false
COOKIE_HTTP_ONLY=true
COOKIE_SAME_SITE=lax
```
## Migraciones y datos de ejemplo
El sistema incluye:

Migraciones automáticas ejecutadas por Sequelize al levantar el contenedor.

Carga inicial de datos (categorías, productos, movimientos).

⚠️ Si necesitás resetear los datos, podés eliminar los volúmenes de Docker y volver a correr docker-compose up --build.

## Estructura del proyecto
```
proyecto/
├── docker-compose.yml          # Orquestación de servicios
├── .env                        # Variables de entorno
├── .env.example               # Plantilla de variables
├── .gitignore                 # Archivos a ignorar en Git
├── docker.sh                
├── API_test.md
├── README.md                  # Documentación del proyecto
│
├── frontend/
│   ├── Dockerfile.dev         # Imagen Docker para desarrollo
│   ├── package.json           # Dependencies de React
│   ├── .env.development
│   ├── craco.config.js
│   ├── Dockerfile
│   ├── public/
│   │   ├── index.html         # Página HTML principal
│   └── src/
│       ├── App.js             # Componente principal
│       ├── App.css            
│       ├── index.js           # Punto de entrada
│       ├── index.css
│       ├── components/        # Componentes reutilizables
│       │   ├── layout/
│       |   │   ├── Navbar.css
│       |   │   ├── Navbar.jsx
│       │   ├── ui/
│       |   │   ├── CategoriaCard.jsx
│       |   │   ├── Footer.jsx
│       |   │   ├── MovimientoCard.jsx
│       |   │   ├── ProductoCard.jsx
│       ├── pages/             # Páginas de la aplicación
│       |   ├── CategoriasPage.jsx
│       |   ├── MovimientosPage.jsx
│       |   ├── ProductosPage.jsx
│       ├── services/          # Servicios API
│       |   ├── categoriaService.js
│       |   ├── movimientoService.js
│       |   ├── productoService.js
│
├── backend/
│   ├── Dockerfile.dev         # Imagen Docker para desarrollo
│   ├── Dockerfile
│   ├── package.json           # Dependencies de Express
│   ├── server.js              # Servidor principal
│   ├── config/
│   │   └── database.js        # Configuración de Sequelize
│   │   └── config.js
│   ├── models/
│   │   └── index.js           # Modelos de Sequelize
│   │   └── categoria.js
│   │   └── movimiento.js
│   │   └── producto.js
│   ├── controllers/           # Lógica de negocio
│   │   └── categorias.controller.js
│   │   └── movimientos.controller.js
│   │   └── productos.controller.js
│   ├── routes/                # Rutas del API
│   │   └── index.js           # Rutas principales
│   │   └── categoria.routes.js
│   │   └── movimiento.routes.js
│   │   └── producto.routes.js
│   ├── migrations/            # Migraciones de BD
│   │   └── 20250620204241-create-categoria.js
│   │   └── 20250620205045-create-producto.js
│   │   └── 20250620205124-create-movimiento.js
│   └── seeders/               # Datos de prueba
│   │   └── 20250620210501-demo-categorias.js
│   │   └── 20250620210700-demo-productos.js
│   │   └── 20250620210710-demo-movimientos.js
│
├── database/
│   └── init.sql               # Script de inicialización
│
├── nginx/
│   └── nginx.conf             # Configuración del proxy
│
├── pgadmin/
│   ├── servers.json           # Configuración de servidores
│   └── pgpass                 # Credenciales de BD
│   └── Dockerfile
│   └── servers-with-password.json

```

## Grupo
Franco Julian Rossi

Manuel Galdames

Santiago Recari

