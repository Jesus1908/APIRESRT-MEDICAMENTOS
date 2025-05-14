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
