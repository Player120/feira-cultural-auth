const { app } = require('./app')
const port = process.env.SERVER_PORT
app.listen(port, () => {
    console.log(
        `Servidor executando na porta ${port}`
    )
})