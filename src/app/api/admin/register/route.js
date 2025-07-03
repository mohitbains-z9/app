import Admin from '../../../../models/adminmodel';
import connectDB from '../../../../lib/dbconnection';
import jwt from 'jsonwebtoken';

export async function POST(req) {
  try {
    await connectDB();
    const { name, email, password } = await req.json();

    const adminExists = await Admin.findOne({ email });
    if (adminExists) {
      return new Response(JSON.stringify({ message: 'Admin already exists' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const admin = await Admin.create({
      name,
      email,
      password,
      role: 'admin',
    });

    if (admin) {
      const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
      });

      return new Response(
        JSON.stringify({
          _id: admin._id,
          name: admin.name,
          email: admin.email,
          role: admin.role,
          token,
        }),
        {
          status: 201,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    } else {
      return new Response(JSON.stringify({ message: 'Invalid admin data' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  } catch (error) {
    return new Response(JSON.stringify({ message: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}