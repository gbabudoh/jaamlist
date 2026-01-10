import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// POST /api/admin/auth/login - Admin login
export async function POST(request: Request) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password required' },
        { status: 400 }
      )
    }

    // Special handling for Demo Credentials
    if (email === 'admin@jaamlist.com' && password === 'admin123') {
      // Upsert the demo admin user so they exist in the DB
      const demoUser = await prisma.user.upsert({
        where: { email: 'admin@jaamlist.com' },
        update: { role: 'ADMIN' },
        create: {
          email: 'admin@jaamlist.com',
          name: 'Jaamlist Admin',
          password: 'admin123', // In prod, this would be hashed
          role: 'ADMIN',
          avatar: 'https://github.com/shadcn.png'
        },
      })

      return NextResponse.json({
        success: true,
        user: {
          id: demoUser.id,
          email: demoUser.email,
          name: demoUser.name,
          role: demoUser.role,
          avatar: demoUser.avatar,
        },
        message: 'Login successful (Demo Mode)',
      })
    }

    // Normal login flow
    const user = await prisma.user.findFirst({
      where: {
        email,
        role: 'ADMIN',
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        avatar: true,
        password: true,
      },
    })

    if (!user) {
      return NextResponse.json(
        { error: 'Invalid credentials or not an admin' },
        { status: 401 }
      )
    }

    if (user.password !== password) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      )
    }

    // Remove password from user object before returning
    const { password: _, ...userWithoutPassword } = user

    return NextResponse.json({
      success: true,
      user: userWithoutPassword,
      message: 'Login successful',
    })
  } catch (error) {
    console.error('Admin login error:', error)
    return NextResponse.json(
      { error: 'Login failed' },
      { status: 500 }
    )
  }
}
