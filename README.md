The API for authenticating accounts in the feira-cultural project that I developed in the senior year of my techinical web development 
course back in 2025.
It utilizes frameworks from Node.js, such as bcrypt, cors, dotenv, express, jsonwebtoken and mongoose to encrypt and decrypt data,
generate tokens, etc., in order to authenticate users received from the from the feira-cultural-alunos and feira-cultural-professores
APIs. It pulls all users and their information directly from the MongoDB database that contains all users registered using the
feira-cultural-alunos and feira-cultural-professores API.

It is recomended to have all 3 APIs, feira-cultural-alunos, feira-cultural-professores and feira-cultural-auth, running at the same time
in order to have full functionality.
