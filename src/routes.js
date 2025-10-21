const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { Router } = require('express')
const router = Router()
const { startConnection, closeConnection } = require('./database/connection')
const userModel = require('./database/user')

router.post('/auth', async (req, res) => {
    const { email, password } = req.body

    // verifica se email e senha foram digitados
    if (!email || !password) {
        return res.status(400).json({
            code: 'AUTH-001',
            message: 'E-mail ou senha não foram informados. Revise os campos e tente novamente.'
        })
    }

    // valida se o usuário existe
    await startConnection()
    const foundUser = await userModel.findOne({ email })
    if (!foundUser) {
        return res.status(400).json({
            code: 'AUTH-002',
            message: 'E-mail e/ou senha inválidos.'
        })
    }
    await closeConnection()

    // valida se a senha digitada e criptografada são iguais
    const userPassword = foundUser.password
    const checkedPassword = await bcrypt.compare(password, userPassword)
    if (!checkedPassword) {
        return res.status(400).json({
            code: 'AUTH-002',
            message: 'E-mail e/ou senha inválidos.'
        })
    }

    // gera o web token
    const secret = process.env.JWT_SECRET
    const token = jwt.sign({
        id: foundUser._id,
        email,
        role: foundUser.role
    }, secret)
    return res.json({ token })
})

router.post('/register', async (req, res) => {
    const { email, password, confirmPassword, role } = req.body
    // validação
    if (!email, !password, !confirmPassword) {
        return res.status(400).json({
            code: 'REG-001',
            message: 'Email, senha ou confirmação da senha não foram informados. Revise os campos e tente novamente.'
        })
    }

    if (!(password === confirmPassword)) {
        return res.status(400).json({
            code: 'REG-002',
            message: 'A senha e a confirmação da senha não conferem. Revise os campos e tente novamente.'
        })
    }
    await startConnection()

    // valida se o usuário já existe
    const foundUser = await userModel.findOne({ email })
    if (foundUser) {
        return res.status(400).json({
            code: 'REG-003',
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