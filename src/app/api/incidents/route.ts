import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const resolvedParam = searchParams.get('resolved');
  const resolved = resolvedParam === 'true';

  try {
    const incidents = await prisma.incident.findMany({
      where: { resolved },
      orderBy: { tsStart: 'desc' },
      include: {
        camera: true,
      },
    });

    return NextResponse.json(incidents);
  } catch (err) {
    return NextResponse.json({ error: 'Error fetching incidents' }, { status: 500 });
  }
}
