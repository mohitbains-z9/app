// app/api/books/[id]/route.js
import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import Book from '../../../../models/books';
import connectDB from '../../../../lib/dbconnection';

export async function GET(request, { params }) {
  try {
    await connectDB();
    const { id } = params;

    if (!mongoose.isValidObjectId(id)) {
      return NextResponse.json({ error: 'Invalid book ID' }, { status: 400 });
    }

    const book = await Book.findById(id).lean(); 

    if (!book) {
      return NextResponse.json({ error: 'Book not found' }, { status: 404 });
    }

    return NextResponse.json(book, { status: 200 });
  } catch (error) {
    console.error('GET /api/books/[id] error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
