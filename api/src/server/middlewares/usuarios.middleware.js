import { jwtDecode, jwtVerify } from '../../utils/auth/jwt.js'

export const verificarToken = (req, res, next) => {
  const autorizacion = req.header('Authorization')
  if (autorizacion === undefined) {
    return res.status(401).json({ status: false, code: 401, message: 'Token no proporcionado' })
  }
  const [bearer, token] = autorizacion.split(' ')
  if (bearer !== 'Bearer') {
    return res.status(401).json({ status: false, code: 401, message: 'Formato de token inválido' })
  }
  try {
    req.usuario = jwtDecode(token)
    jwtVerify(token) && next()
  } catch (error) {
    res.status(401).json({ status: false, code: 401, message: 'Token inválido' })
  }
}
