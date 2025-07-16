import { NextResponse } from 'next/server';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

export async function GET() {
  const projectRoot = path.resolve();
  const jsonData = {
    workspace: {
      root: projectRoot,
      uuid: uuidv4(),
    },
  };
  return NextResponse.json(jsonData);
}