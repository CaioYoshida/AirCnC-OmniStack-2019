const multer = require('multer');
const path = require('path')

module.exports = {
    //This function will storage all the images which have been uploaded from frontend
    storage: multer.diskStorage({
        //This command sets the path destination for this files
        destination: path.resolve(__dirname, '..', '..', 'uploads'),// Caminho até a pasta 'uploads'
        filename: (req, file, cb) => {
            //Get the original extension of file
            const ext = path.extname(file.originalname);
            //Get the original name of file
            const name = path.basename(file.originalname, ext)
            //This function is naming the input file
            cb(null, `${name}-${Date.now()}${ext}`);
        }
    }),
}