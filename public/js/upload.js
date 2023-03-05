const multer = require('multer'); // para lidar com o upload de arquivos
const path = require('path');

// configurar o armazenamento das imagens
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, './public/img/uploads/'); // pasta para armazenar as imagens
    },
    filename: (req, file, cb) => {
      const ext = path.extname(file.originalname);
      cb(null, `image-${Date.now()}${ext}`); // renomear a imagem para um nome único
    }
  });
  // configurar o multer para lidar com arquivos de imagem
  const upload = multer({
    storage: storage ,
    limits: { fileSize: 1024 * 1024 * 5 }, // limitar o tamanho do arquivo a 5MB
  }); 
  module.exports = { upload }