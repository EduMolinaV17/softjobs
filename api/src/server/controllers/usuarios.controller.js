import { bcryptCompare, bcryptPass } from '../../utils/auth/bcrypt.js'
import { jwtSign } from '../../utils/auth/jwt.js'
import * as sql from '../models/usuarios.dao.js'

export const register = (req, res) => sql.registerModel(req.body.email, bcryptPass(req.body.password), req.body.rol, req.body.lenguage)
  .then((result) => {
    if (result.code) {
      res.status(500).json({ status: false, code: 500, message: result })
      return
    }
    res.status(201).json({ status: true, code: 201, message: 'Usuario creado con éxito' })
  })
  .catch((error) => res.status(500).json({ status: false, code: 500, message: error }))

export const login = (req, res) => sql.loginModel(req.body)
  .then((result) => {
    if (result.length === 0) {
      res.status(200).json({ status: true, code: 200, message: 'Usuario y/o contraseña no existen' })
      return
    }
    const passwordCheck = bcryptCompare(req.body.password, result[0].password)
    console.log('Contraseña:', passwordCheck)
    if (!passwordCheck) {
      res.status(401).json({ status: false, code: 401, message: 'Contraseña incorrecta' })
      return
    }
    const token = jwtSign(result[0])
    res.status(200).json({ status: true, code: 200, message: { token } })
  })
  .catch((error) => res.status(500).json({ status: false, code: 500, message: error }))

export const obtenerUsuario = (req, res) => sql.obtenerUsuarioModel(req.usuario.email)
  .then((result) => res.status(200).json(result))
  .catch((error) => res.status(500).json({ status: false, code: 500, message: error }))
