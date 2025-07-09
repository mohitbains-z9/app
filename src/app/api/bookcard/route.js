// app/api/books/route.js
import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import Book from '../../../models/books'; 
import connectDB from "../../../lib/dbconnection"

export async function GET(request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const page = parseInt(searchParams.get('page')) || 1;
    const limit = parseInt(searchParams.get('limit')) || 12;

    if (id) {
      // Existing single book fetch logic
      if (!mongoose.isValidObjectId(id)) {
        return NextResponse.json({ error: 'Invalid book ID' }, { status: 400 });
      }
      const book = await Book.findById(id).select('title author description coverPhotoUrl');
      if (!book) {
        return NextResponse.json({ error: 'Book not found' }, { status: 404 });
      }
      return NextResponse.json(book, { status: 200 });
    }

    // Fetch paginated books
    const skip = (page - 1) * limit;
    const [books, totalCount] = await Promise.all([
      Book.find()
        .select('title author description coverPhotoUrl')
        .skip(skip)
        .limit(limit)
        .lean(),
      Book.countDocuments()
    ]);

    return NextResponse.json({
      books,
      totalCount,
      currentPage: page,
      totalPages: Math.ceil(totalCount / limit)
    }, { status: 200 });
  } catch (error) {
    console.error('GET /api/books error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}