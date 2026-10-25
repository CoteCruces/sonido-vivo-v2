Instalar Node y npm si no está instalado:
https://nodejs.org/download/release/v22.13.1/

comprobación de que están instalados:
node -v
npm -v

Crear proyecto:
npm create vite@latest **nombre_del_proyecto**

Iniciar página:
npm run dev

Instalar iconos de la web:
npm install bootstrap-icons

Instalar para pruebas unitarias:
npm install -D vitest @testing-library/react jsdom

Para hacer correr las pruebas:
npm run test

También:
npx vitest run

Instalar herramienta para generar reportes:
npm install -D @vitest/coverage-v8@5.0.5

Generar un reporte:
npx vitest run --coverage
