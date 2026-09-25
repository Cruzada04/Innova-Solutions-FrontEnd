# Innova Solutions · Frontend

Aplicación web de **InnovaSolutions**, una plataforma educativa basada en **flashcards** para apoyar el aprendizaje de niños menores de 10 años dentro del espectro autista. Este repositorio contiene la interfaz en Angular, que consume la API REST del backend.

Proyecto académico desarrollado por el **Grupo 06** (Facultad de Ingeniería, UPC), curso *Arquitectura de Aplicaciones Web*.

Backend: [Innova-Solutions-Backend](https://github.com/Cruzada04/Innova-Solutions-Backend)

## Pantallas y funcionalidades

- Bienvenida, selección de rol, registro e inicio de sesión.
- Rutas protegidas con **guard de autenticación** (token JWT).
- **Inicio** con el resumen del usuario.
- **Creación** de categorías y flashcards (texto, imagen, colores de fondo y de texto, y opciones de respuesta).
- **Mis flashcards**: consulta de las flashcards creadas.
- Sección "Acerca de".

## Tecnologías

- Angular 22 y TypeScript
- Formularios reactivos y Angular Router
- RxJS
- Vitest para pruebas unitarias
- Prettier para el formato del código

## Estructura

```
src/app/
  components/   Pantallas (welcome, login, register-form, role-selection,
                main-layout, inicio, creacion, mis-flashcards, acerca-de)
  services/     auth.service (login) y api-data.service (consumo de la API)
  guards/       auth.guard (protección de rutas)
```

## Cómo ejecutarlo

Requisitos: Node.js y npm, y el [backend](https://github.com/Cruzada04/Innova-Solutions-Backend) en ejecución en `http://localhost:8080`.

```bash
git clone https://github.com/Cruzada04/Innova-Solutions-FrontEnd.git
cd Innova-Solutions-FrontEnd
npm install
npm start
```

La aplicación queda en `http://localhost:4200`.

La URL del backend está definida en `src/app/services/api-data.service.ts` y `src/app/services/auth.service.ts`. Cámbiala ahí si tu API corre en otra dirección.

## Otros comandos

```bash
npm run build   # compilación de producción en dist/
npm test        # pruebas unitarias
```

