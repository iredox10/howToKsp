import mongoose from "mongoose";
import slug from 'slug'

const category = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        unique: true
    },
   slug:{
        type: String,
        unique: true
    },
    desc: String,
    howTo:[ {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'howto'
    }]
},{timestamps:true})

category.pre('save', function(){
    if(this.name){
        this.slug = slug(this.name)
    }
})

const Category = mongoose.model('category', category)
export default Category