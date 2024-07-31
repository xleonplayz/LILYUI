import { NextRequest, NextResponse } from 'next/server';
import path from 'path';
import { promises as fs } from 'fs';

export async function GET() {
  const jsonDirectory = path.join(process.cwd(), 'points.json');
  const fileContents = await fs.readFile(jsonDirectory, 'utf8');
  return NextResponse.json(JSON.parse(fileContents));
}
