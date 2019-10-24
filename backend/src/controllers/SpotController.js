//index, show, store, update, destroy

const User = require('../models/User');
const Spot = require('../models/Spot');

module.exports = {

    //Showing all spots with "techs" filter
    async index(req, res) {
        const { tech } = req.query;// é igual a const tech = req.query.tech

        //Verifying if exits some spot with the input "tech"
        const spots = await Spot.find({ techs: tech });// mesmo techs sendo um array, ele busca somente os spots com a tecnologia requisitada

        return res.json(spots);
    },

    //Show one spot
    async show(req, res) {
        const spot = await Spot.findOne({_id: req.params.id});

        return res.json(spot);
    },

    // Store spots
    async store(req, res) {
        const {filename} = req.file; // é igual a const filename = req.file.filename
        const {company, techs, price} = req.body;
        const {user_id} = req.headers;

        //Verifying if exist an user with this id
        const user = await User.findById(user_id);

        //If not
        if(!user) {
            //Return server error (400)
            return res.status(400).json({ error: 'User does not exist' })
        }

        //Else. Creating a new Spot
        const spot = await Spot.create({
            user: user_id,
            thumbnail: filename,
            company,
            techs: techs.split(',').map(tech => tech.trim()),
            price,
        });

        return res.json(spot)
    },

    //Updating Spots
    async update(req, res) {
        const aux = req.file;
        const {company, techs, price} = req.body;

        if (aux != undefined || aux != null) {
            const spot = await Spot.findByIdAndUpdate(req.params.id, {
                thumbnail: req.file.filename,
                company,
                techs: techs.split(',').map(tech => tech.trim()),
                price,
            }, {new: true});

            return res.json(spot);
        } else {
            const spot = await Spot.findByIdAndUpdate(req.params.id, {
                company,
                techs: techs.split(',').map(tech => tech.trim()),
                price,
            }, {new: true});

            return res.json(spot);
        }
    },

    //Deleting Spots
    async destroy(req, res) {

        await Spot.findByIdAndRemove(req.params.id);

        return res.json('Delete successfull');
    }
}