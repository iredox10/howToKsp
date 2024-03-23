import mongoose from "mongoose";
import slug from 'slug'

const howTo = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        unique: true
    },
   slug:{
        type: String,
        unique: true
    },
    markdown: String,
   desc:{
    type: String, 
    required:true
   }, 
},{timestamps:true})

howTo.pre('save', function(){
    if(this.name){
        this.slug = slug(this.name)
    }
})

const HowTo = mongoose.model('howto', howTo)
export default HowTo