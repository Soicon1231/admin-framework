// src/app/api/posts/route.ts
import prisma from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  // Extract token from cookies
  const token = request.cookies.get("token")?.value;

  if (!token) {
    return NextResponse.json({ error: "Token not found" }, { status: 403 });
  }

  // Decode JWT payload (without verification for demo; use a library for production)
  let tenantId: string | undefined;
  try {
    const payload = JSON.parse(
      Buffer.from(token.split(".")[1], "base64").toString()
    );
    tenantId = payload?.user?.tenantId;
  } catch {
    return NextResponse.json({ error: "Invalid token" }, { status: 403 });
  }

  if (!tenantId) {
    return NextResponse.json({ error: "Tenant not found" }, { status: 403 });
  }

  const posts = await prisma.post.findMany({
    where: { tenantId },
    include: { user: true },
  });
  return NextResponse.json(posts);
}