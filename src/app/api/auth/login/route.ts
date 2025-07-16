import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
interface LoginResponse {
  token?: string;
  error?: string;
}
const hashedPassword = await bcrypt.hash('password', 10);
export async function POST(req: NextRequest) {
  const { email, password } = await req.json();
  if (email === 'admin@example.com') {
    const isValid = await bcrypt.compare(password, hashedPassword);
    if (isValid) {
    const secret = process.env.JWT_SECRET || 'default_secret';
    const token = jwt.sign(
      { email, role: 'admin' },
      secret,
      { expiresIn: '1m' }
    );
    return NextResponse.json({ token });
  }
  } else {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  }
}