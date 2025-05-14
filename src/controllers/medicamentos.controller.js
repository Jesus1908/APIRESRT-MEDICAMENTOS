import {pool} from '../db.js';

export const getMedicamentos = async(req, res) => {
  const [rows] = await pool.query ("SELECT * FROM medicamentos")
  res.json(rows)
}

export const getMedicamentosById = async(req, res) => {
  const [rows] = await pool.query ("SELECT * FROM medicamentos WHERE id = ?", [req.params.id])
 
  if (rows.length <= 0) return res.status(404).json({
    message: "No existe medicamento con este ID"
  })

  res.json(rows)
}

export const getMedicamentosByReceta = async (req, res) => {
  const [rows] = await pool.query("SELECT * FROM medicamentos WHERE receta = ?", [req.params.receta]
  );

  if (rows.length <= 0) {
    return res.status(404).json({
      message: "No existen medicamentos con esa condición de receta"
    });
  }

  res.json(rows);
};

export const getMedicamentosByTipo = async (req, res) => {
  const [rows] = await pool.query("SELECT * FROM medicamentos WHERE tipo = ?", [req.params.tipo]
  );

  if (rows.length <= 0) {
    return res.status(404).json({
      message: "No existen el tipo de medicamento"
    });
  }

  res.json(rows);
};

export const createMedicamentos = async (req, res) => {
  const { tipo, nombre, nomComercial, presentacion, receta, precio } = req.body;

  if (precio <= 0) {
    return res.status(400).json({
      message: "El precio no puede ser 0 o negativo"
    });
  }

  const [rows] = await pool.query(
    "INSERT INTO medicamentos (tipo, nombre, nomComercial, presentacion, receta, precio) VALUES (?,?,?,?,?,?)",
    [tipo, nombre, nomComercial, presentacion, receta, precio]
  );

  res.send({
    id: rows.insertId,
    tipo,
    nombre,
    nomComercial,
    presentacion,
    receta,
    precio
  });
};


export const updateMedicamentos = async (req, res) => {
  const id = req.params.id
  const {tipo, nombre, nomComercial, presentacion, receta, precio} =  req.body

  if (precio <= 0) {
    return res.status(400).json({
      message: "El precio no puede ser 0 o negativo"
    });
  }
  const querySQL = `
  UPDATE medicamentos SET
    tipo = ?,
    nombre = ?,
    nomComercial = ?,
    presentacion = ?,
    receta = ?,
    precio = ?
  WHERE id = ?
  `
  const [result] = await pool.query(querySQL, [tipo, nombre, nomComercial, presentacion, receta, precio, id])

  if (result.affectedRows == 0) {
    return res.status(404).json({
      message: 'El ID no existe'
    })
  }
  res.json({ message: 'Actualización correcta'})
}

export const deleteMedicamentosById = async (req, res) => {
  const [rows] = await pool.query("SELECT receta FROM medicamentos WHERE id = ?", [req.params.id]);
  if (rows.length === 0) {
    return res.status(404).json({
      message: "No existe registro con este ID"
    });
  }
  if (rows[0].receta === 'S') {
    return res.status(403).json({
      message: "No se puede eliminar un medicamento que requiere receta"
    });
  }
  const [result] = await pool.query("DELETE FROM medicamentos WHERE id = ?", [req.params.id]);
  return res.sendStatus(204); 
};
