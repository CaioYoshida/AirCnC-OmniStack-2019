//index, show, store, update, destroy

const Booking = require('../models/Booking');

module.exports = {

    //Adding a booking for some spot
    async store(req, res) {
        
        const { user_id } = req.headers;
        const { spot_id } = req.params;
        const { date } = req.body;

        //Creating a booking
        const booking = await Booking.create({
            user: user_id,
            spot: spot_id,
            date,
        });

        //Showing all the specifications from each Schema
        await booking.populate('spot').populate('user').execPopulate();

        //Here the const "ownerSocket" is receiving the global variable req.connectedUsers from server.js
        const ownerSocket = req.connectedUsers[booking.spot.user];
        //And here we are verifying there's a real time with the ownerSocket
        if (ownerSocket) {
            //the parameter .to is to emit a message to the right person (ownerSocket) and send him all the booking's object
            req.io.to(ownerSocket).emit('booking_request', booking);
        }

        return res.json(booking);
    }
};