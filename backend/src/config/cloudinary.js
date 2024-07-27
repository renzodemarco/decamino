import { v2 as cloudinary } from 'cloudinary';
import env from './env.js'

cloudinary.config({
  cloud_name: env.CLOUD_NAME,
  api_key: env.CLOUDINARY_KEY,
  api_secret: env.CLOUDINARY_SECRET
});

export const uploadProfileImage = async (file, id) => {
  return await cloudinary.uploader.upload(file.path, {
    public_id: "profile-img/" + id,  // Nombre que tendrá el archivo
    folder: id, // Carpeta donde se guardará el archivo
    format: 'webp',
    transformation: [
      { width: 500, height: 500, crop: "fill" }, // Redimensionar y hacer cuadrada
      { fetch_format: "auto", quality: "auto" }  // Optimizar la imagen
    ]
  });
}

export const uploadRestaurantImage = async (file, id) => {
  return await cloudinary.uploader.upload(file.path, {
    public_id: `restaurant-photos/${id}/${Date.now()}`, // Nombre único para cada imagen
    folder: id, // Carpeta específica para el restaurante
    format: 'webp',
    transformation: [
      { width: 800, height: 600, crop: "fill" },
      { fetch_format: "auto", quality: "auto" }
    ]
  });
};

export const uploadRestaurantImages = async (files, id) => {
  const uploadPromises = files.map(file => uploadRestaurantImage(file, id));
  return Promise.all(uploadPromises);
};

export const deleteCloudinaryPhoto = async (publicId) => {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    return result
  } 
  catch (error) {
    throw error
  }
};

export default cloudinary