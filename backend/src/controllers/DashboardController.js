const Spot = require('../models/Spot');

module.exports = {

    //Showing all spots from an user
    async show(req, res) {
        const { user_id } = req.headers;

        //Finding all the spots from an user
        const spots = await Spot.find({ user: user_id });

        return res.json(spots);
    }
}