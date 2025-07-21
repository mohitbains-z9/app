import connectDB from '../../../lib/dbconnection';
import Book from '../../../models/books';
import { File, Storage } from 'megajs';
import multer from 'multer';
import { Readable } from 'stream';
import { v2 as cloudinary } from 'cloudinary';
import { NextResponse } from 'next/server';

const upload = multer({ storage: multer.memoryStorage() });

export const config = {
  api: {
    bodyParser: false,
  },
};

// Configure Cloudinary
const cloudName = process.env.CLOUDINARY_CLOUD_NAME || process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
const apiKey = process.env.CLOUDINARY_API_KEY;
const apiSecret = process.env.CLOUDINARY_API_SECRET;

console.log('Cloudinary config:', {
  cloud_name: cloudName,
  api_key: apiKey,
  api_secret: apiSecret ? '*' : undefined,
});

if (!cloudName || !apiKey || !apiSecret) {
  throw new Error('Cloudinary environment variables are missing.');
}

cloudinary.config({
  cloud_name: cloudName,
  api_key: apiKey,
  api_secret: apiSecret,
});

export async function POST(request) {
  await connectDB();

  // Parse the multipart form data
  const formData = await request.formData();

  // Extract fields
  const title = formData.get('title');
  const author = formData.get('author');
  const description = formData.get('description');
  const category = formData.get('category');
  const publishedDate = formData.get('publishedDate');
  const coverPhotoFile = formData.get('coverPhoto');
  const pdfFile = formData.get('pdf');

  let pdfUrl = null;
  let coverPhotoUrl = null;
  let pdfLink = null;
  let coverPhotoId = null;

  try {
    // Connect to MEGA
    const storage = new Storage({
      email: process.env.MEGA_EMAIL,
      password: process.env.MEGA_PASSWORD,
    });
    await new Promise((resolve, reject) => {
      storage.on('ready', resolve);
      storage.on('error', (err) => {
        if (err && err.message && err.message.includes('EBLOCKED')) {
          reject(new Error('MEGA account is blocked. Please check your MEGA account status.'));
        } else {
          reject(err);
        }
      });
    });

    // Upload file
    const uploadStream = storage.upload({ name: pdfFile.name, size: pdfFile.size });
    const pdfStream = new Readable();
    pdfStream.push(Buffer.from(await pdfFile.arrayBuffer()));
    pdfStream.push(null);
    pdfStream.pipe(uploadStream);

    let uploadedFile;
    await new Promise((resolve, reject) => {
      uploadStream.on('complete', (file) => {
        uploadedFile = file;
        resolve();
      });
      uploadStream.on('error', reject);
    });
    pdfUrl = await uploadedFile.link();
    pdfLink = pdfUrl;

    // Upload Cover Photo to Cloudinary
    if (coverPhotoFile && typeof coverPhotoFile.arrayBuffer === 'function') {
      const coverBuffer = Buffer.from(await coverPhotoFile.arrayBuffer());
      const coverStream = new Readable();
      coverStream.push(coverBuffer);
      coverStream.push(null);
      try {
        const uploadResult = await new Promise((resolve, reject) => {
          const uploadStream = cloudinary.uploader.upload_stream(
            { resource_type: 'image', folder: 'book-covers' },
            (error, result) => {
              if (error) reject(error);
              else resolve(result);
            }
          );
          coverStream.pipe(uploadStream);
        });
        coverPhotoUrl = uploadResult.secure_url;
        coverPhotoId = uploadResult.public_id;
      } catch (cloudinaryError) {
        console.error('Cloudinary upload error:', cloudinaryError);
        return NextResponse.json({ error: 'Failed to upload cover photo to Cloudinary' }, { status: 500 });
      }
    }

    // Validate required fields
    if (!title || !author || !pdfUrl || !coverPhotoUrl) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const book = new Book({
      title,
      author,
      description,
      coverPhotoId,
      pdfUrl,
      coverPhotoUrl,
      category,
      publishedDate: publishedDate ? new Date(publishedDate) : undefined,
      pdfLink,
      driveLink: pdfUrl,
    });

    await book.save();
    return NextResponse.json({ message: 'Book added successfully', book }, { status: 201 });
  } catch (error) {
    if (error.message && error.message.includes('MEGA account is blocked')) {
      return NextResponse.json({ error: error.message }, { status: 403 });
    }
    console.error('Error in book creation:', error);
    return NextResponse.json({ error: 'Failed to add book: ' + error.message }, { status: 500 });
  }
}