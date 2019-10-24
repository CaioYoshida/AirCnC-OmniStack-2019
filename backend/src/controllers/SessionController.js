//index, show, store, update, destroy

const User = require('../models/User');

module.exports = {
    async store(req, res) {
        const email = req.body.email;// Search an email on body

        let user = await User.findOne({ email });// verifica se já existe um usuário cadastrado com esse email

        //Se não existe
        if(!user) {
            //Creating a user in Database
            user = await User.create({ email })// { email } representa a desestruturação de { email: email }
        }

        return res.json(user);
    }
}