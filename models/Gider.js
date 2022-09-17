const { default: mongoose } = require('mongoose');
const mongooser = require('mongoose');
const slugify = require('slugify'); 

const Schema = mongoose.Schema;

const GiderSchema = new Schema({
    ay : {
        type : Number,
        required : true

    },
    banka : {
        type:Number,
        required : true
    },
    // kira : {
    //     aciklama : {
    //         type:String,
    //     },
    //     miktar : {
    //         type: Number,
    //         default : 0
    //     }

    // },
    // ulasim : {
    //     aciklama : {
    //         type:String,
    //     },
    //     miktar : {
    //         type: Number,
    //         default : 0
    //     }
    // },
    // egitim_saglik : {
    //     aciklama : {
    //         type:String,
    //     },
    //     miktar : {
    //         type: Number,
    //         default : 0
    //     }
    // } ,
    // diger : {
    //     aciklama : {
    //         type:String,
    //     },
    //     miktar : {
    //         type: Number,
    //         default : 0
    //     }
    // },
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
        lower : false,
        strict:true
    })
    next();
})

const Gider = mongoose.model('gider', GiderSchema);

module.exports = Gider;