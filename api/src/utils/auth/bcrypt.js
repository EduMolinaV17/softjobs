import bcrypt from 'bcryptjs'

export const bcryptPass = (password) => bcrypt.hashSync(password, 10)

export const bcryptCompare = (password, cryptPassword) => bcrypt.compareSync(password, cryptPassword)
