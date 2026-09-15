import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { comparePassword, signToken } from '@/lib/auth';

export async function POST(req: Request) {
  try {
    const { mobile, password, role } = await req.json();

    if (!mobile || !password) {
      return NextResponse.json({ error: 'Mobile and password required' }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { mobile },
      include: {
        farmerProfile: true,
        areaAdminProfile: true,
      },
    });

    if (!user) {
      return NextResponse.json({ error: 'User account not found' }, { status: 404 });
    }

    const validPassword = await comparePassword(password, user.passwordHash);
    if (!validPassword) {
      return NextResponse.json({ error: 'Invalid password credentials' }, { status: 401 });
    }

    const token = signToken({ userId: user.id, role: user.role, name: user.name });

    return NextResponse.json({
      success: true,
      token,
      user: {
        id: user.id,
        name: user.name,
        mobile: user.mobile,
        role: user.role,
        preferredLanguage: user.preferredLanguage,
        farmerProfile: user.farmerProfile,
        areaAdminProfile: user.areaAdminProfile,
      },
    });
  } catch (error: any) {
    console.error('Login API Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
