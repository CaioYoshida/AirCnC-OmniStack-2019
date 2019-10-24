const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
    date: String,
    approved: Boolean,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User' //ref é para o mongoose saber de qual Schemas.Types.ObejectId está sendo referenciado
    },
    spot: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Spot' //ref é para o mongoose saber de qual Schemas.Types.ObejectId está sendo referenciado
    }
});

module.exports = mongoose.model('Booking', BookingSchema);