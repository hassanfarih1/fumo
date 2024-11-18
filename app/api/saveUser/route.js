import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req) {
  try {
    // Parse and validate request body
    const body = await req.json();
    if (!body || !body.id || !body.email) {
      return new Response(
        JSON.stringify({ error: 'Invalid request payload' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const { id, email } = body;

    // Check if the user already exists
    const existingUser = await prisma.user.findUnique({
      where: { id },
    });

    if (existingUser) {
      // Return a success response without performing any operations
      return new Response(
        JSON.stringify({ message: 'User already exists, skipping save.' }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Create the user if they don't exist
    await prisma.user.create({
      data: { id, email },
    });

    return new Response(
      JSON.stringify({ message: 'User saved successfully' }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error saving user:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to save user' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}
