# Portafolio de José Rondón

Sitio estático (Vite + React + Tailwind) para mostrar quién soy, el stack que uso y los proyectos de [github.com/Rondnt](https://github.com/Rondnt).

Cuando GitHub Pages esté activo, la URL será:

`https://rondnt.github.io/Portafolio/`

## Cómo correrlo en local

```bash
npm install
npm run dev
```

Abre `http://localhost:5173`.

## Cómo publicarlo en GitHub

1. Crea un repositorio llamado **Portafolio** (público) en tu cuenta `Rondnt`.
2. En esta carpeta:

```bash
git init
git add .
git commit -m "Publicar portafolio"
git branch -M main
git remote add origin https://github.com/Rondnt/Portafolio.git
git push -u origin main
```

3. En el repo: **Settings → Pages → Source: GitHub Actions**.
4. El workflow `.github/workflows/pages.yml` construye y publica el sitio.

Si más adelante quieres la URL corta `https://rondnt.github.io`, crea el repo `Rondnt.github.io`, mueve este código ahí y deja `VITE_BASE` vacío (`/`).

## Cómo editar tu información

Todo el contenido vive en `src/data/site.ts`:

- nombre, bio, avatar
- grupos del stack
- lista de proyectos (repo, demo, año, resumen)

No hace falta tocar componentes para agregar un proyecto: añade un objeto al array `projects`.
