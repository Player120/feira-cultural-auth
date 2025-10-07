const bcrypt = require('bcrypt')
const { Router } = require('express')
const router = Router()

router.get('/auth', () => {})
router.post('/register', async (req, res) => {
    const { email, password, confirmPassword } = req.body
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

    // valida se o usuário já existe

    // criptografia do password
    const salt = await bcrypt.genSalt(10)
    const passwordHash = await bcrypt.hash(
        password, salt
    )

    const user = new User({
        email,
        password: passwordHash,
        role
    })
})

module.exports = { router }