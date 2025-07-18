import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import bcrypt, { compareSync } from 'bcrypt';
import prisma from '@/app/lib/prisma';
interface LoginResponse {
  token?: string;
  error?: string;
}
const hashedPassword = await bcrypt.hash('password', 10);
export async function POST(req: NextRequest) {
 try {
    const { email, password } = await req.json();

    // Validate input
    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 });
    }

    // Find user in database
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user || !compareSync(password, user.password)) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
    }

    // Generate JWT with tenantId and user data
    const token = jwt.sign(
      { user: { id: user.id, email: user.email, role: user.role, tenantId: user.tenantId } },
      process.env.JWT_SECRET || "default_secret",
      { expiresIn: "1h" }
    );

    // Set cookie
    const response = NextResponse.json({ message: "Login successful" });
    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 3600, // 1 hour
      path: "/",
    });

    return response;
   } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}