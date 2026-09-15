import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { hashPassword, signToken } from '@/lib/auth';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { fullName, mobile, email, password, stateCode, districtCode, preferredLanguage, communicationMethod, village, taluk, pincode } = body;

    if (!fullName || !mobile || !password) {
      return NextResponse.json({ error: 'Missing required registration fields' }, { status: 400 });
    }

    const existing = await prisma.user.findUnique({ where: { mobile } });
    if (existing) {
      return NextResponse.json({ error: 'Mobile number already registered' }, { status: 400 });
    }

    const passwordHash = await hashPassword(password);

    const user = await prisma.user.create({
      data: {
        name: fullName,
        mobile,
        email: email || null,
        passwordHash,
        role: 'FARMER',
        preferredLanguage: preferredLanguage || 'as',
        farmerProfile: {
          create: {
            state: stateCode || 'AS',
            district: districtCode || 'KAMRUP',
            taluk: taluk || 'Kamrup Taluk',
            village: village || 'Kamrup Village',
            pincode: pincode || '781001',
            communicationMethod: communicationMethod || 'BOTH',
          },
        },
      },
      include: {
        farmerProfile: true,
      },
    });

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
      },
    });
  } catch (error: any) {
    console.error('Registration API Error:', error);
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 });
  }
}
