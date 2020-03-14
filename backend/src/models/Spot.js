const mongoose = require('mongoose');

const SpotSchema = new mongoose.Schema({
    thumbnail: String,
    company: String,
    price: Number,
    techs: [String],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User' //ref é para o mongoose saber de qual Schemas.Types.ObejectId está sendo referenciado
    }
},{
    toJSON: {
        virtuals: true,
    }
});

SpotSchema.virtual('thumbnail_url').get(function() {
    return `http://192.168.15.22:3333/files/${this.thumbnail}`
})

module.exports = mongoose.model('Spot', SpotSchema);