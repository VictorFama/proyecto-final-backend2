# Proyecto Final - Sistema de Autenticación Híbrido

Sistema de autenticación híbrido con Node.js (Express + Mongoose). Maneja registro y login local con Passport y JWT, login con GitHub (OAuth), sesiones con MongoDB, rutas protegidas por token y por rol, y logout.

## Requisitos

- Node.js
- Una cuenta de MongoDB Atlas (o un MongoDB local)
- Una GitHub OAuth App (para el login con GitHub)

## Instalación

```bash
npm install
```

Copiar `.env.example` a `.env` y completar las variables.

## Variables de entorno

| Variable | Para qué sirve |
|----------|----------------|
| `PORT` | Puerto donde levanta el server (3000 por defecto) |
| `NODE_ENV` | `development` o `production` |
| `MONGODB_URI` | Cadena de conexión de MongoDB Atlas |
| `JWT_SECRET` | Clave para firmar los JWT |
| `JWT_EXPIRES_IN` | Cuánto dura el token (ej: 1h) |
| `SESSION_SECRET` | Clave para firmar las sesiones |
| `GITHUB_CLIENT_ID` | Client ID de la GitHub OAuth App |
| `GITHUB_CLIENT_SECRET` | Client Secret de la GitHub OAuth App |
| `GITHUB_CALLBACK_URL` | URL de callback del login con GitHub |

## Ejecutar

```bash
npm run dev
```

El servidor levanta en `http://localhost:3000`. Para probar que está vivo:

```
GET /api/v1/health  ->  { "status": "ok" }
```

## Rutas

Todas cuelgan de `/api/v1`.

| Método | Ruta | Descripción |
|--------|------|-------------|
| POST | `/auth/register` | Registro de usuario |
| POST | `/auth/login` | Login local (deja el JWT en una cookie) |
| GET | `/auth/github` | Inicia el login con GitHub |
| GET | `/auth/github/callback` | Callback de GitHub |
| POST | `/auth/logout` | Cierra la sesión y limpia la cookie |
| GET | `/profile` | Datos del usuario logueado (requiere token) |
| GET | `/admin` | Solo para admins (requiere rol admin) |
| GET | `/session` | Estado de la sesión actual |
