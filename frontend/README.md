# Frontend

## Tecnologías usadas
- Angular v21
- scss

## Instalar Angular
> Version especifica
```bash
npx -p @angular/cli@17 ng new [nameProject]
```
> Ultima version 
```bash
ng new my-app
```

> Verificar version instalado
```bash
ng version
```

## Ejecución del servidor
```bash
ng serve
```

## Instalar dependencias necesarias
```bash
npm install
```

> A partir de Angular 22, no funciona las Directivas: ``ngFor`` y ``ngIF``, usar ``Signal`` para evitar bugs de carga de datos con el uso de las directivas ``@for`` y ``@if``

## Notas
### ¿Guardar el access token en un signal() es seguro?

- Sí, es mucho más seguro que localStorage o sessionStorage, porque el token vive solo en memoria (RAM).

```bash
accessToken = signal<string | null>(null);
```

Ventajas:
✅ No persiste en navegador
✅ Se elimina al cerrar pestaña/refresh
✅ No queda almacenado permanentemente
✅ Menor riesgo de robo comparado con localStorage

### Entonces ¿cuál es la arquitectura más segura?
La recomendación moderna para SPA (Angular/React/Vue) es:
```bash
Refresh Token
↓
HttpOnly Cookie (backend)

Access Token
↓
Memoria RAM (signal/store)
```
O sea exactamente lo que implementamos en el proyecto.

Arquitectura del Proyecto
```bash
Django
├── refresh token (HttpOnly cookie)
└── access token (JSON response)

Angular
├── access token -> signal()
└── nunca toca refresh token
```

> ¿Se puede usar HttpOnly Cookie en frontend?
> NO.
> HttpOnly solo existe del lado del backend.

### ¿Entonces Angular cómo usa la cookie?
Automáticamente. Cuando se hace:
```bash
withCredentials: true
```
> el navegador envía la cookie solo. Angular no necesita tocar la cookie.