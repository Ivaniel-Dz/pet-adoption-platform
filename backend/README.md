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

## Instalar Paquetes y Librerías
> Instalar todo los paquetes en un solo comando
```bash
pip install django djangorestframework psycopg2-binary django-cors-headers djangorestframework-simplejwt python-dotenv
```

### ✅ 1️⃣ Instalar Django

```bash
pip install django
```

#### ¿Por qué lo instalamos?

Django es el framework principal del backend.

Nos proporciona:

* ORM
* Sistema de rutas
* Middleware
* Sistema de autenticación
* Panel admin
* Arquitectura MVT
* Sistema de migraciones

Sin Django no existe el backend.

---

### ✅ 2️⃣ Instalar Django REST Framework

```bash
pip install djangorestframework
```

#### ¿Por qué lo instalamos?

Django REST Framework permite convertir Django en una **API REST profesional**.

Nos da:

* Serializers (transformar modelos → JSON)
* ViewSets
* Routers automáticos
* Validaciones avanzadas
* Permisos y autenticación por API

Angular no consume HTML, consume JSON.
DRF es lo que convierte Django en backend API.

---

### ✅ 3️⃣ Instalar PostgreSQL driver

```bash
pip install psycopg2-binary
```

#### ¿Por qué lo instalamos?

Es el **driver que permite a Django comunicarse con PostgreSQL**.

Sin esto Django no puede conectarse a la base de datos.

En producción se usa `psycopg2` normal.
En desarrollo usamos `psycopg2-binary` porque es más fácil de instalar.

---

### ✅ 4️⃣ Instalar CORS Headers

```bash
pip install django-cors-headers
```

#### ¿Por qué lo instalamos?

Cuando Angular esté en:

```
http://localhost:4200
```

Y Django en:

```
http://localhost:8000
```

El navegador bloqueará las peticiones por política de seguridad (Same-Origin Policy).

`django-cors-headers` permite autorizar que el frontend pueda consumir la API.

Sin esto, tendrás errores tipo:

```
CORS policy: No 'Access-Control-Allow-Origin' header
```

---

### ✅ 5️⃣ Instalar JWT Authentication

```bash
pip install djangorestframework-simplejwt
```

#### ¿Por qué lo instalamos?

Simple JWT implementa autenticación basada en tokens JWT.

Ventajas:

* Stateless (no depende de sesiones)
* Ideal para SPA (Angular)
* Seguro y escalable
* Maneja refresh tokens

Para aplicaciones modernas con frontend separado, JWT es el estándar.

---

### ✅ 6️⃣ Instalar python-dotenv

```bash
pip install python-dotenv
```

#### ¿Por qué lo instalamos?

Permite cargar variables desde un archivo `.env`.

Ejemplo:

```
SECRET_KEY=123456
DB_PASSWORD=mi_password
DEBUG=True
```

En `settings.py` puedes hacer:

```python
from dotenv import load_dotenv
import os

load_dotenv()

SECRET_KEY = os.getenv("SECRET_KEY")
```

#### 🔎 ¿Si ya activé mi entorno virtual, igual debo instalarlo?

Sí.

El entorno virtual solo **aísla dependencias**, pero no instala nada automáticamente.

Un entorno virtual vacío no tiene paquetes.

---

### 🔍 Diferencia entre `venv` y `virtualenv`

#### 🔹 venv

* Viene incluido desde Python 3.3+
* Es el estándar moderno
* Más simple
* No requiere instalación externa

Se usa así:

```bash
python -m venv venv
```

---

#### 🔹 virtualenv

Es una herramienta externa más antigua.

```bash
pip install virtualenv
virtualenv venv
```

Ventajas antiguas:

* Más rápido en versiones viejas de Python
* Más opciones avanzadas

Hoy en día, para tu proyecto:

> ✅ Usa `venv`. Es suficiente y estándar.

---

### 🎯 Resumen Técnico

| Paquete       | Rol en arquitectura           |
| ------------- | ----------------------------- |
| Django        | Framework base                |
| DRF           | API REST                      |
| psycopg2      | Conexión PostgreSQL           |
| CORS          | Permitir Angular consumir API |
| SimpleJWT     | Autenticación moderna         |
| python-dotenv | Seguridad y configuración     |

---

## Crear Proyecto

1. Creación del Proyecto Main
> La carpeta se llama ``config`` ya que contendrá la configuración principal del backend
```bash
django-admin startproject config .
```

2. Ejecutar el Servidor
```bash
python manage.py runserver
```

3. Creación de las aplicaciones
```bash
python manage.py startapp nameApp
```

## Configuración de la Bade de Datos
> En desarrollo uso sqlLite
1. Crear migraciones
```bash
python manage.py makemigrations
```

```bash
python manage.py migrate
```

2. Crear superusuario
```bash
python manage.py createsuperuser
```
Pedirá:
- Email
- Username
- Password

## Paquetes Extras
1. Django-filter
```bash
pip install django-filter
```