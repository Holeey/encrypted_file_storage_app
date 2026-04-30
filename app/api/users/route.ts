import { prisma } from "../../lib/prisma"
import { NextResponse, NextRequest } from "next/server"

import bcrypt from "bcryptjs"

export async function GET() {
  try {
    const users = await prisma.user.findMany()
    return NextResponse.json(users)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
    const  body  = await request.json()
    try { 
        const existingUser = await prisma.user.findUnique({
            where: { email: body.email},
        })
        if (existingUser) {
            return NextResponse.json({ error: "User with this email already exists" }, { status: 400 })
        }

        const hashedPassword = await bcrypt.hash(body.password, 10)
        const newUser = await prisma.user.create({
            data: {
                name: body.name,
                email: body.email,
                password: hashedPassword,
            },
        })
        return NextResponse.json(newUser, { status: 201 })
    } catch (error) {
        return NextResponse.json({ error: "Failed to create user" }, { status: 500 })
    }
}