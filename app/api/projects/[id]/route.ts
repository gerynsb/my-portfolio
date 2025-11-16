import { NextRequest, NextResponse } from 'next/server';
import { getDatabase, COLLECTIONS } from '@/app/lib/db';
import { ObjectId } from 'mongodb';
import { projectSchema } from '@/app/lib/validation/project';
import { slugify } from '@/app/lib/slugify';
import { revalidateHomePage } from '@/app/lib/revalidate';

// GET - Get single project
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const db = await getDatabase();
    const project = await db
      .collection(COLLECTIONS.PROJECTS)
      .findOne({ _id: new ObjectId(id) });

    if (!project) {
      return NextResponse.json(
        { error: 'Project not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(project);
  } catch (error) {
    console.error('Error fetching project:', error);
    return NextResponse.json(
      { error: 'Failed to fetch project' },
      { status: 500 }
    );
  }
}

// PATCH - Update project
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const validatedData = projectSchema.parse(body);

    const db = await getDatabase();
    const slug = slugify(validatedData.title);

    const result = await db
      .collection(COLLECTIONS.PROJECTS)
      .findOneAndUpdate(
        { _id: new ObjectId(id) },
        {
          $set: {
            ...validatedData,
            slug,
            updatedAt: new Date(),
          },
        },
        { returnDocument: 'after' }
      );

    if (!result) {
      return NextResponse.json(
        { error: 'Project not found' },
        { status: 404 }
      );
    }

    // Auto-revalidate homepage for real-time updates
    revalidateHomePage();

    return NextResponse.json(result);
  } catch (error) {
    console.error('Error updating project:', error);
    if (error instanceof Error && 'issues' in error) {
      return NextResponse.json(
        { error: 'Validation failed', details: error },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: 'Failed to update project' },
      { status: 500 }
    );
  }
}

// DELETE - Delete project
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const db = await getDatabase();
    const result = await db
      .collection(COLLECTIONS.PROJECTS)
      .deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { error: 'Project not found' },
        { status: 404 }
      );
    }

    // Auto-revalidate homepage for real-time updates
    revalidateHomePage();

    return NextResponse.json({ message: 'Project deleted successfully' });
  } catch (error) {
    console.error('Error deleting project:', error);
    return NextResponse.json(
      { error: 'Failed to delete project' },
      { status: 500 }
    );
  }
}
