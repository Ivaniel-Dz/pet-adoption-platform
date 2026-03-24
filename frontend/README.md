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
npx @angular/cli@latest new [nameProject]
```

> Verificar version instalado
```bash
npx ng version
```

## Ejecución del servidor
```bash
npx ng serve
```

## Instalar dependencias necesarias
```bash
npm install
```

> A partir de Angular 22, no funciona las Directivas: ``ngFor`` y ``ngIF``, usar ``Signal`` para evitar bugs de carga de datos con el uso de las directivas ``@for`` y ``@if``
