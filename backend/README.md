# Backend:
## Tecnología:
- Python
- Rest Framework
- PostGrade SQL

## Estructura del Backend
```bash
pet-adoption-platform/
│
├── backend/
│   ├── venv
```

## Creación y Configuración del Proyecto

1. Verificar si tiene instalado de formar global ``virtualenv``
```bash
virtualenv --version
```
> Si no tiene instalado, instalar con el siguiente comando:
```bash
pip install virtualenv
```

2. Crear un entorno virtual para el proyecto
```bash
virtualenv venv
```

3. Activar el entorno virtual desde CMD
> Activar desde el VSC
```bash
1. F1
2. Escribir Entorno virtual
3. Escoger el recomendado (env)
```

> Activar manual por script desde CMD
```bash
 .\venv\Scripts\activate
```

4. Instalar Django en el entorno virtual
```bash
pip install django
```
> Comprobar su instalación
```bash
django-admin --version
```

5. Crear el proyecto
> la carpeta principal se llamara ``config`` ya que albergara las configuraciones principales
```bash
django-admin startproject config .
```

6. Ejecutar Servidor
```bash
python manage.py runserver
```

7. Instalación de Django REST Framework
```bash
pip install djangorestframework
```
