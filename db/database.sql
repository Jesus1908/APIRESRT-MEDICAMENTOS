CREATE DATABASE farmacia;

USE farmacia;

CREATE TABLE medicamentos(
id             INT AUTO_INCREMENT PRIMARY KEY,
tipo           ENUM('A', 'B', 'C') NOT NULL,
nombre         VARCHAR(120) NOT NULL,
nomcomercial   VARCHAR(40),
presentacion   ENUM('A', 'B', 'C') NOT NULL,
receta         ENUM('S', 'N') NOT NULL,
precio         DECIMAL(7,2) NOT NULL
)ENGINE = INNODB;

INSERT INTO medicamentos (tipo, nombre, nomcomercial, presentacion, receta, precio)
VALUES
('A', 'Paracetamol', 'Dolofén', 'A', 'N', 12.50),
('B', 'Ibuprofeno', 'Alivium', 'B', 'N', 15.90),
('C', 'Amoxicilina', 'Amoxil', 'C', 'S', 25.00),
('A', 'Loratadina', 'Claritine', 'B', 'N', 18.30),
('B', 'Metformina', 'Glucophage', 'A', 'S', 30.00),
('C', 'Omeprazol', 'Omepral', 'C', 'N', 22.75),
('A', 'Azitromicina', 'Zithromax', 'B', 'S', 40.50),
('B', 'Diclofenaco', 'Voltaren', 'A', 'N', 14.20),
('C', 'Salbutamol', 'Ventolin', 'C', 'S', 19.99),
('A', 'Ranitidina', 'Zantac', 'B', 'S', 23.10),
('B', 'Clorfenamina', 'Cloro-Trimeton', 'A', 'N', 11.40),
('C', 'Ciprofloxacino', 'Ciproxin', 'B', 'S', 35.80);

SELECT * FROM medicamentos;
