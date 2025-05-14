import { Router } from "express"
import { getMedicamentos, getMedicamentosById, getMedicamentosByReceta, getMedicamentosByTipo, createMedicamentos, deleteMedicamentosById} from "../controllers/medicamentos.controller.js"

const router = Router()

router.get('/medicamentos', getMedicamentos)
router.get('/medicamentos/:id', getMedicamentosById)
router.get('/medicamentos/receta/:receta', getMedicamentosByReceta)
router.get('/medicamentos/tipo/:tipo', getMedicamentosByTipo)

router.post('/medicamentos', createMedicamentos)

router.delete('/medicamentos/:id', deleteMedicamentosById)

export default router