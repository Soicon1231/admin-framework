import { NextRequest, NextResponse } from 'next/server';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

export async function GET(req: NextRequest) {
  const users: User[] = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'admin' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'user' },
    { id: 3, name: 'Jack Smith', email: 'jaack@example.com', role: 'user' },

  ];
  return NextResponse.json(users);
}