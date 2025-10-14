const bcrypt = require('bcrypt')
const { Router } = require('express')
const router = Router()
const { startConnection, closeConnection } = require('./database/connection')
const userModel = require('./database/user')

router.get('/auth', () => {})
router.post('/register', async (req, res) => {
    const { email, password, confirmPassword, role } = req.body
    // validação
    if (!email, !password, !confirmPassword) {
        return res.status(400).json({
            code: 'AUTH-001',
            message: 'Email, senha ou confirmação da senha não foram informados. Revise os campos e tente novamente.'
        })
    }

    if (!(password === confirmPassword)) {
        return res.status(400).json({
            code: 'AUTH-002',
            message: 'A senha e a confirmação da senha não conferem. Revise os campos e tente novamente.'
        })
    }
    await startConnection()

    // valida se o usuário já existe
    const foundUser = await userModel.findOne({ email })
    if (foundUser) {
        return res.status(400).json({
            code: 'AUTH-003',
            message: 'Não é possível criar um usuário com este e-mail.'
        })
    }

    // criptografia do password
    const salt = await bcrypt.genSalt(10)
    const passwordHash = await bcrypt.hash(
        password, salt
    )

    const user = await userModel.create({
        email,
        password: passwordHash,
        role
    })
    console.log('Usuário criado: ', user)
    await closeConnection()
    return res.status(201).json()
})

module.exports = { router }