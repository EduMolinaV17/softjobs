import { Router } from 'express'
import * as usuariosController from '../controllers/usuarios.controller.js'
import { verificarToken } from '../middlewares/usuarios.middleware.js'

const router = Router()

router.post('/usuarios', usuariosController.register)
router.post('/login', usuariosController.login)
router.get('/usuarios', verificarToken, usuariosController.obtenerUsuario)

export default router
