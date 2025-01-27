const multer   = require('multer')
const diskStorage = require("multer")
const storage = multer.diskStorage({
    filename: function (req, file, cb) {
      console.log("files:",file)
      cb(null, file.originalname)
    }
  })
  
  const upload = multer({ storage: storage })

  module.exports={upload}