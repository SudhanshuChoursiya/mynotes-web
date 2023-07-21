//multer middleware
const multer =require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
   if(file.fieldname==="image"){
    cb(null, 'public/notes_images')
  } else if(file.fieldname==="notesfile"){
    cb(null, 'public/notes-files')
  }
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + '-' + file.originalname)
  }
})

const fileFilter=function(req,file,cb){
    if(file.fieldname==="image"){
        if(file.mimetype.startsWith("image")){
            cb(null,true)
        }else{
          req.fileValidationError="file type is invalid";
            cb(null,false)
        }
    }
    if(file.fieldname==="notesfile") {
        if (file.mimetype.startsWith("application")) {
      cb(null,true)      
        }else {
           req.fileValidationError="file type is invalid";
            cb(null,false)
        }
    }
}


  


const upload = multer({storage,fileFilter})

module.exports=upload