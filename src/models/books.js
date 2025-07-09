import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Book title is required'],
    trim: true,
    maxlength: [100, 'Title cannot exceed 100 characters'],
  },
  author: {
    type: String,
    required: [true, 'Author name is required'],
    trim: true,
    maxlength: [50, 'Author name cannot exceed 50 characters'],
  },
  description: {
    type: String,
    trim: true,
    maxlength: [500, 'Description cannot exceed 500 characters'],
  },
  coverPhotoId: {
    type: String,
    trim: true,
  },
  pdfUrl: {
    type: String,
    required: [true, 'PDF URL is required'],
    trim: true,
  },
  coverPhotoUrl: {
    type: String,
    trim: true,
  },
  category: {
    type: String,
    enum: ['Fiction', 'Non-Fiction', 'Science Fiction', 
    'Biography', 'History', 'Self-Help', 'Fantasy', 'Mystery'],
    default: 'Other',
  },
  publishedDate: {
    type: Date,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  driveLink: {
    type: String,
    required: true,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

bookSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

export default mongoose.models.Book || mongoose.model('Book', bookSchema)