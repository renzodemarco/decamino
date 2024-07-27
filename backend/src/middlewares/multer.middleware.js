import multer from 'multer'
import path from 'path'

// Configura Multer para almacenar archivos temporalmente en el servidor
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads'); // Carpeta temporal en el servidor
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}${ext}`); // Nombre único para evitar conflictos
  },
});

// Función para filtrar los archivos según su tipo
const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    const error = new Error('Tipo de archivo no válido. Solo se permiten imágenes JPEG, PNG o WEBP.');
    error.status = 400
    cb(error, false)
  }
};

// Configurar límites de tamaño de archivo
const limits = { fileSize: 3 * 1024 * 1024 }; // 3 MB

export const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: limits
});

export const uploadMultiple = upload.array('photos', 5);