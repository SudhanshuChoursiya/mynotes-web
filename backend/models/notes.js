const mongoose=require('mongoose');

const notesSchema=new mongoose.Schema({
    
    title:{
        type:String,        
    }, 
    img_src:{
        type:String,
    }, 
    file_src:{
        type:String
    }, 
    subject:{
        type:String, 
    }, 
    Class:{
        type:String
    }
    
});

module.exports=mongoose.model('note',notesSchema);
