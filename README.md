# Proyecto Final - Sistema de Autenticación Híbrido

Sistema de autenticación híbrido con Node.js (Express + Mongoose).

## Instalación

```bash
npm install
```

Copiar `.env.example` a `.env` y completar las variables.

## Ejecutar

```bash
npm run dev
```

El servidor levanta en `http://localhost:3000`. Para probar que está vivo:

```
GET /api/v1/health  ->  { "status": "ok" }
```
