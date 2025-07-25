import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = parseInt(params.id);

  try {
    const updated = await prisma.incident.update({
      where: { id },
      data: { resolved: true },
    });

    return NextResponse.json(updated);
  } catch (err: any) {
    console.error('[PATCH ERROR]', err);
    return NextResponse.json({ error: err.message || 'Failed to update' }, { status: 500 });
  }
}