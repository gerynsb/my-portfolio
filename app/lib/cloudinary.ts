import { v2 as cloudinary } from 'cloudinary';

if (!process.env.CLOUDINARY_CLOUD_NAME) {
  throw new Error('Please add your CLOUDINARY_CLOUD_NAME to .env.local');
}

if (!process.env.CLOUDINARY_API_KEY) {
  throw new Error('Please add your CLOUDINARY_API_KEY to .env.local');
}

if (!process.env.CLOUDINARY_API_SECRET) {
  throw new Error('Please add your CLOUDINARY_API_SECRET to .env.local');
}

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export default cloudinary;

// Helper function to upload image from base64
export async function uploadImage(base64Image: string, folder: string = 'portfolio') {
  try {
    const result = await cloudinary.uploader.upload(base64Image, {
      folder: folder,
      resource_type: 'auto',
    });
    return {
      url: result.secure_url,
      publicId: result.public_id,
    };
  } catch (error) {
    console.error('Error uploading to Cloudinary:', error);
    throw new Error('Failed to upload image');
  }
}

// Helper function to delete image
export async function deleteImage(publicId: string) {
  try {
    await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    console.error('Error deleting from Cloudinary:', error);
    throw new Error('Failed to delete image');
  }
}
