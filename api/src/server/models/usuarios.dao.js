import db from '../database/db_conection.js'

export const registerModel = (email, password, rol, lenguage) => db('INSERT INTO usuarios (id, email, password, rol, lenguage) VALUES (DEFAULT, $1, $2, $3, $4);', [email, password, rol, lenguage])

export const loginModel = ({ email }) => db('SELECT email, password FROM usuarios WHERE email = $1;', [email])

export const obtenerUsuarioModel = (email) => db('SELECT email, rol, lenguage FROM usuarios WHERE email = $1;', [email])
