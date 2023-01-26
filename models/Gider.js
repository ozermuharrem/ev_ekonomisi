
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GiderSchema = new Schema({
    giderTuru : {
        type: String,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    tutar : {
        type : Number,
        required : true
    },
    vade : {
        type : Date,
    },
    createDate : {
        type: Date,
        default : Date.now
    },
    kategori: {
        type:mongoose.Schema.Types.ObjectId,
        ref : 'Kategori'
    },
    user : {
        type:mongoose.Schema.Types.ObjectId,
        ref : 'User'
    }
});

const Gider = mongoose.model('gider', GiderSchema);

module.exports = Gider;