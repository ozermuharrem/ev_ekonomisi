const { default: mongoose } = require('mongoose');
const mongooser = require('mongoose');
const slugify = require('slugify'); 

const Schema = mongoose.Schema;

const GiderSchema = new Schema({
    ay : {
        type : String,
        required : true

    },
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
    createDate : {
        type: Date,
        default : Date.now
    },
    kategori: {
        type:mongoose.Schema.Types.ObjectId,
        ref : 'Kategori'
    }
})

GiderSchema.pre('save', function(next){
    this.slug = slugify(this.ay, {
        lower : true,
        strict:true
    })
    next();
})

const Gider = mongoose.model('gider', GiderSchema);

module.exports = Gider;