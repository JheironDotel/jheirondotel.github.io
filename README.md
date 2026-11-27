# LoudThread

Landing oficial de LoudThread para Android. El sitio usa HTML, CSS y JavaScript sin dependencias ni compilación.

## Estructura

- `index.html` contiene la página y el texto en inglés.
- `css/styles.css` contiene los estilos y el diseño adaptable.
- `js/translations.js` contiene las traducciones al español. `js/main.js` gestiona el idioma y la galería.
- `assets/branding/` contiene el logotipo Thread Wave, el favicon derivado del icono oficial y la imagen para redes sociales.
- `assets/screenshots/en/` y `assets/screenshots/es/` contienen las capturas de cada idioma.

## Vista previa local

Desde la raíz del repositorio, ejecuta `python -m http.server 8000 --bind 127.0.0.1` con Python 3. En Windows también puedes usar `py -3 -m http.server 8000 --bind 127.0.0.1`. Abre [la página local](http://127.0.0.1:8000/).

## Traducciones y capturas

Edita el inglés en `index.html` y la clave correspondiente en `js/translations.js`. Las claves se indican en los atributos `data-text`, `data-content`, `data-label` y `data-alt`.

Para actualizar las capturas, exporta las originales en WebP y conserva los mismos nombres en ambas carpetas. `player.webp` es la captura real del reproductor (540 × 1200). La galería sigue el orden de los archivos promocionales de Google Play (675 × 1199).

1. `01_follow_along.webp`
2. `02_queue.webp`
3. `03_ocr.webp`
4. `04_saved.webp`
5. `05_seek.webp`
6. `06_voices.webp`

Si cambias el tamaño de una imagen, actualiza sus dimensiones en `index.html`. Para añadir otra captura, copia un elemento de la galería, ajusta `src` y `data-image`, y añade el texto alternativo en ambos idiomas.

## GitHub Pages

En **Settings → Pages**, configura **Deploy from a branch** con la rama `main` y `/(root)`. GitHub Pages publica los archivos de la raíz al recibir cambios en esa rama.

**AdMob.** Conserva `app-ads.txt` intacto en la raíz. Su [URL pública](https://jheirondotel.github.io/app-ads.txt) debe servir el archivo directamente, sin redirecciones.
