# API de Medicamentos

Esta API permite realizar operaciones CRUD (crear, leer, actualizar y eliminar) sobre un listado de medicamentos en una base de datos MySQL.

---

## Requisitos

- Node.js v14 o superior  
- MySQL  
- Postman, Insomnia o cualquier cliente REST  
- Estar en la misma red local si se accede desde otro dispositivo

---

## Instalación

### 1. Clonar el repositorio

```bash
git clone https://github.com/tu-usuario/nombre-del-proyecto.git
cd nombre-del-proyecto

2. Instalar dependencias
npm install

3. Instalar el cliente MySQL para Node.js
npm install mysql2

4. Crear la base de datos y la tabla
En tu servidor MySQL, ejecuta:

CREATE DATABASE farmacia;

USE farmacia;

CREATE TABLE medicamentos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  tipo VARCHAR(100),
  nombre VARCHAR(100),
  nomComercial VARCHAR(100),
  presentacion VARCHAR(100),
  receta CHAR(1),
  precio DECIMAL(10,2)
);

5. Configurar la conexión a la base de datos
Edita el archivo de configuración de la conexión (por ejemplo db.js):

import { createPool } from 'mysql2/promise';

export const pool = createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'farmacia',
  waitForConnections: true,
  connectionLimit: 10,
});

6. Iniciar el servidor
npm run dev
Por defecto, la API estará disponible en: http://localhost:3000

Endpoints:

Obtener todos los medicamentos:
GET /api/medicamentos

Crear un nuevo medicamento
POST /api/medicamentos
{
  "tipo": "Antibiótico",
  "nombre": "Amoxicilina",
  "nomComercial": "Amoxil",
  "presentacion": "Cápsulas 500mg",
  "receta": "S",
  "precio": 25.00
}

Actualizar un medicamento:
PUT /api/medicamentos/:id
{
  "tipo": "Analgésico",
  "nombre": "Ibuprofeno",
  "nomComercial": "Dolorstop",
  "presentacion": "Tabletas 400mg",
  "receta": "N",
  "precio": 18.50
}

Eliminar un medicamento:
DELETE /api/medicamentos/:id

Validaciones:
No se permite registrar medicamentos con precio menor o igual a 0.
No se pueden eliminar medicamentos con receta (receta = "S").