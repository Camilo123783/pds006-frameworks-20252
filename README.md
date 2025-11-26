# 🏥 PDS006 - Device Management System

> **Solución completa de gestión de dispositivos médicos con arquitectura hexagonal, observabilidad en tiempo real y despliegue automático en Azure.**

![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-3178C6?style=flat-square&logo=typescript)
![Bun](https://img.shields.io/badge/Bun-1.3.3+-000000?style=flat-square&logo=bun)
![Elysia](https://img.shields.io/badge/Elysia-latest-FFD700?style=flat-square)
![Docker](https://img.shields.io/badge/Docker-✓-2496ED?style=flat-square&logo=docker)
![Azure](https://img.shields.io/badge/Azure-App%20Service-0078D4?style=flat-square&logo=microsoft-azure)
![Axiom](https://img.shields.io/badge/Axiom-Observability-663399?style=flat-square)

---

## 📋 Tabla de Contenidos

- [Características](#-características)
- [Instalación Rápida](#-instalación-rápida)
- [Comandos Disponibles](#-comandos-disponibles)
- [API Endpoints](#-api-endpoints)
- [Testing](#-testing)
- [Observabilidad](#-observabilidad)
- [CI/CD Pipeline](#-cicd-pipeline)
- [Despliegue en Azure](#-despliegue-en-azure)
- [Documentación](#-documentación)

---

## ✨ Características

### 🏗️ Arquitectura
- **Hexagonal Architecture** - Separación clara entre dominio, adaptadores e infraestructura
- **Domain-Driven Design** - Modelo de dominio robusto y bien definido
- **Ports & Adapters Pattern** - Desacoplamiento máximo entre capas

### 🔌 Adaptadores
- **API REST** - Elysia.js con OpenAPI documentation
- **Almacenamiento** - In-memory repository para dispositivos
- **Gestión de Fotos** - File system repository con servidor HTTP integrado

### 🚀 Tecnología
- **Runtime** - Bun 1.3.3+ (ultra-rápido, 50x más veloz que Node.js)
- **Framework** - Elysia.js (moderno, type-safe)
- **Base de Datos** - Drizzle ORM ready
- **Validación** - Zod schemas

### 📊 Observabilidad
- **Logging Centralizado** - Axiom + OpenTelemetry
- **Múltiples Niveles** - DEBUG, INFO, WARN, ERROR
- **Datos Estructurados** - NDJSON con metadata completa
- **Dashboards Automáticos** - Axiom cloud analytics

### 🐳 DevOps Completo
- **Docker** - Multi-stage builds, containerización
- **GitHub Actions** - CI/CD automatizado
- **Azure** - App Service & Container Registry
- **Testing** - hurl + Axiom integration tests

---

## 🚀 Instalación Rápida

### 1. Clonar
```bash
git clone https://github.com/Camilo123783/pds006-frameworks-20252.git
cd pds006-frameworks-20252
```

### 2. Instalar dependencias
```bash
bun install
```

### 3. Configurar variables de entorno
```bash
cp .env.example .env
# Editar .env con tus credenciales de Axiom
```

### 4. Iniciar servidor
```bash
bun run dev
```

✅ El servidor estará disponible en: **http://localhost:3000**

---

## 💻 Comandos Disponibles

### Desarrollo
```bash
bun run dev                 # Servidor con hot-reload
```

### Testing API
```bash
bun run test                # Tests básicos (6 endpoints)
bun run test:verbose        # Tests detallado
bun run test:host <url>     # Tests contra servidor específico
```

### Testing Observabilidad (Axiom)
```bash
bun run test:axiom          # Tests básicos (~30 eventos)
bun run test:axiom:stress   # Tests de stress (500 eventos)
bun run test:axiom:massive  # Tests masivos (5000 eventos)
```

### Docker
```bash
bun run docker:build        # Construir imagen Docker
bun run docker:run          # Ejecutar contenedor
bun run docker:logs         # Ver logs en tiempo real
bun run docker:stop         # Detener contenedor
bun run docker:remove       # Eliminar contenedor
```

---

## 📡 API Endpoints

### Computadoras
```http
GET    /api/computers              # Listar todas
POST   /api/computers              # Crear nueva
PUT    /api/computers/{id}         # Actualizar
DELETE /api/computers/{id}         # Eliminar
```

### Dispositivos Médicos
```http
GET    /api/medicaldevices
POST   /api/medicaldevices
PUT    /api/medicaldevices/{id}
DELETE /api/medicaldevices/{id}
```

### Dispositivos
```http
GET    /api/devices
POST   /api/devices
PUT    /api/devices/{id}
DELETE /api/devices/{id}
```

### Documentación Automática
```http
GET /swagger               # OpenAPI/Swagger documentation
```

---

## ✅ Testing

### Tests API HTTP (hurl)
```bash
bun run test
```
Valida 6 endpoints HTTP contra la API en vivo.

**Endpoints probados:**
1. GET /api/computers
2. POST /api/computers
3. GET /api/medicaldevices
4. POST /api/medicaldevices
5. GET /api/devices
6. POST /api/devices

### Tests Observabilidad (Axiom)

#### Test Básico
```bash
bun run test:axiom
```
- 6 categorías de pruebas
- ~30 eventos generados
- Validación de configuración
- Todos los niveles de log (INFO, DEBUG, WARN, ERROR)

#### Test de Stress
```bash
bun run test:axiom:stress
```
- 500 eventos generados
- ~2-3 segundos de ejecución
- Variabilidad de datos realista

#### Test Masivo
```bash
bun run test:axiom:massive
```
- 5000 eventos generados
- ~15-20 segundos de ejecución
- Datos realistas con status codes, usuarios, duraciones
- Genera suficientes datos para que Axiom cree dashboards automáticos

---

## 📊 Observabilidad con Axiom

### Configuración
Todos los logs se envían automáticamente a **Axiom** (organización: `devops`, dataset: `devops`)

### Usar en tu código

```typescript
import { axiomLogger } from './utils/axiom-logger.util';

// En tus endpoints
app.get('/api/devices', async () => {
  await axiomLogger.info('GET /api/devices called', { userId: 'user-123' });
  return { devices: [] };
});

// Manejo de errores
try {
  // operación
} catch (error) {
  await axiomLogger.error('Operation failed', error as Error);
}
```

### Niveles de Log
```typescript
axiomLogger.debug(message, data)   // Debugging detallado
axiomLogger.info(message, data)    // Información general
axiomLogger.warn(message, data)    // Advertencias
axiomLogger.error(message, error)  // Errores
```

### Dashboard Axiom
1. Ve a https://axiom.co/app
2. Selecciona organización: `devops`
3. Abre dataset: `devops`
4. Ver logs en tiempo real ✨

### Queries AQL de Ejemplo
```aql
# Todos los errores
level == "ERROR"

# Eventos por nivel
* | stats count() by level

# Logs de un endpoint específico
path == "/api/devices"

# Últimas 100 entradas
* | sort _time desc | limit 100
```

---

## 🔄 CI/CD Pipeline

### GitHub Actions Workflow
**Archivo:** `.github/workflows/deploy.yml`

**Flujo de ejecución:**
1. Build imagen Docker
2. Push a Azure Container Registry
3. Deploy a Azure App Service
4. Ejecutar tests contra el servidor desplegado

**Disparadores:**
- Manual (`workflow_dispatch`)
- Push automático a rama `main`

**Inputs personalizables:**
- `IMAGE_REPOSITORY` - Nombre del repositorio Docker
- `IMAGE_TAG` - Tag de la imagen
- `AZURE_WEBAPP_NAME` - Nombre de la App Service
- `PORT` - Puerto de la aplicación

---

## ☁️ Despliegue en Azure

### Despliegue Automático (Recomendado)
```bash
gh workflow run deploy.yml \
  -f IMAGE_REPOSITORY=pds006-device-management \
  -f IMAGE_TAG=v1.0.0 \
  -f AZURE_WEBAPP_NAME=devopswise0 \
  -f PORT=3000
```

### Despliegue Manual
```bash
# 1. Construir imagen Docker
bun run docker:build

# 2. Tag de imagen
docker tag pds006-app:latest {acr_name}.azurecr.io/pds006:latest

# 3. Login en Azure Container Registry
docker login -u {username} -p {password} {acr_name}.azurecr.io

# 4. Push a Azure
docker push {acr_name}.azurecr.io/pds006:latest

# 5. Deploy en Azure App Service
az webapp deployment container config --name devopswise0
```

### Verificar Despliegue
```bash
# Comprobar que la app está corriendo
curl https://devopswise0.azurewebsites.net/api/health

# Ver logs
az webapp log tail --name devopswise0 --resource-group {resource_group}
```

---

## 📚 Documentación

### Archivos de Documentación Disponibles

| Archivo | Descripción |
|---------|-------------|
| `README.md` | **← Estás aquí** - Guía rápida |
| `OBSERVABILITY-REQUIREMENTS.md` | Especificación técnica completa de observabilidad |
| `AXIOM-SETUP.md` | Guía de configuración de Axiom |
| `architecture.md` | Detalles de arquitectura hexagonal |

### Lectura Recomendada
1. **Primero:** Este `README.md` (inicio rápido)
2. **Luego:** `architecture.md` (entender la arquitectura)
3. **Después:** `OBSERVABILITY-REQUIREMENTS.md` (detalles técnicos)
4. **Finalmente:** `AXIOM-SETUP.md` (configuración específica)

---

## 🛠️ Stack Tecnológico

### Runtime & Framework
- **Bun** 1.3.3+ - Runtime JavaScript ultrarrápido
- **Elysia.js** - Framework HTTP moderno y type-safe
- **TypeScript** 5.0+ - Type safety

### Observabilidad
- **Axiom** - Plataforma de observabilidad cloud
- **OpenTelemetry** 0.208.0+ - Estándar abierto para observabilidad
- **NDJSON** - Formato de ingesta de logs

### Persistencia
- **Drizzle ORM** - Type-safe query builder
- **In-Memory Repository** - Almacenamiento en memoria
- **FileSystem Storage** - Almacenamiento de fotos

### Testing
- **hurl** 7.1.0+ - HTTP testing tool
- **Custom Tests** - Suites personalizadas para Axiom

### Cloud & DevOps
- **Docker** - Containerización
- **Azure App Service** - Hosting en nube
- **Azure Container Registry** - Registro de imágenes
- **GitHub Actions** - CI/CD automatizado

### Seguridad & Validación
- **Zod** - Schema validation
- **Better-Auth** - Authentication framework
- **HTTPS/TLS** - Transporte seguro

---

## 📊 Estructura del Proyecto

```
src/
├── adapter/                    # Adaptadores externos
│   ├── api/elysia/            # API REST (Elysia)
│   ├── photo/filesystem/       # Almacenamiento de fotos
│   └── repository/inmemory/    # Repositorio en memoria
├── config/
│   └── axiom.config.ts        # Configuración de Axiom
├── core/                       # Núcleo del dominio
│   ├── domain/                # Entidades de dominio
│   ├── dto/                   # Data Transfer Objects
│   ├── service/               # Servicios de dominio
│   ├── repository/            # Puertos de repositorio
│   └── utils/                 # Utilidades
├── utils/
│   └── axiom-logger.util.ts  # Logger centralizado
├── axiom-test.ts             # Tests básicos
├── axiom-stress-test.ts      # Tests de stress
├── axiom-massive-test.ts     # Tests masivos
└── index.ts                  # Punto de entrada

.github/workflows/
└── deploy.yml                 # GitHub Actions CI/CD

.devcontainer/
└── Dockerfile                 # Configuración Docker

Configuration Files:
├── .env                       # Variables de entorno
├── .env.example              # Template de variables
├── package.json              # Dependencies
├── tsconfig.json             # TypeScript config
└── architecture.md           # Documentación arquitectura
```

---

## 🚦 Estado del Proyecto

| Feature | Status | Versión |
|---------|--------|---------|
| API REST | ✅ Completado | v1.0.0 |
| Arquitectura Hexagonal | ✅ Completado | v1.0.0 |
| Docker Support | ✅ Completado | v1.0.0 |
| GitHub Actions CI/CD | ✅ Completado | v1.0.0 |
| Azure Deployment | ✅ Completado | v1.0.0 |
| Axiom Logging | ✅ Completado | v1.0.0 |
| OpenTelemetry Integration | ✅ Completado | v1.0.0 |
| Distributed Traces | ⏳ Planeado | v2.0.0 |
| Custom Metrics | ⏳ Planeado | v2.0.0 |
| Alerting | ⏳ Planeado | v2.0.0 |

---


## 👨‍💻 Autor

**Camilo Rodríguez**
- GitHub: [@Camilo123783](https://github.com/Camilo123783)
- Email: contacto@devopswise.com

---

## 🔗 Enlaces Útiles

- 📖 [Documentación Bun](https://bun.sh/)
- 📖 [Documentación Elysia](https://elysiajs.com/)
- 📖 [OpenTelemetry Docs](https://opentelemetry.io/)
- 📖 [Axiom Documentation](https://axiom.co/docs/)
- ☁️ [Azure App Service](https://azure.microsoft.com/en-us/services/app-service/)
- 🔄 [GitHub Actions](https://github.com/features/actions)
- 🐳 [Docker Documentation](https://docs.docker.com/)

---

