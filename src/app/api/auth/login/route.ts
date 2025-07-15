import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

interface LoginResponse {
  token?: string;
  error?: string;
}

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();
  if (email === 'admin@example.com' && password === 'password') {
    const token = jwt.sign(
      { email, role: 'admin' },
      'secret_key',
      { expiresIn: '1h' }
    );
    return NextResponse.json({ token });
  } else {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  }
}