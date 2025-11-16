import { NextRequest, NextResponse } from 'next/server';
import { getDatabase, COLLECTIONS } from '@/app/lib/db';
import { projectSchema } from '@/app/lib/validation/project';
import { slugify } from '@/app/lib/slugify';
import { revalidateHomePage } from '@/app/lib/revalidate';

// GET - List all projects
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const categoryId = searchParams.get('categoryId');
    const featured = searchParams.get('featured');

    const db = await getDatabase();
    const query: any = {};

    if (categoryId) {
      query.categoryId = categoryId;
    }

    if (featured === 'true') {
      query.featured = true;
    }

    const projects = await db
      .collection(COLLECTIONS.PROJECTS)
      .find(query)
      .sort({ order: 1, createdAt: -1 })
      .toArray();

    // Populate category names
    const projectsWithCategories = await Promise.all(
      projects.map(async (project) => {
        const category = await db
          .collection(COLLECTIONS.PROJECT_CATEGORIES)
          .findOne({ _id: project.categoryId });
        return {
          ...project,
          categoryName: category?.name || 'Uncategorized',
        };
      })
    );

    return NextResponse.json(projectsWithCategories);
  } catch (error) {
    console.error('Error fetching projects:', error);
    return NextResponse.json(
      { error: 'Failed to fetch projects' },
      { status: 500 }
    );
  }
}

// POST - Create new project
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = projectSchema.parse(body);

    const db = await getDatabase();
    const slug = slugify(validatedData.title);

    // Check if slug already exists
    const existing = await db
      .collection(COLLECTIONS.PROJECTS)
      .findOne({ slug });

    const finalSlug = existing ? `${slug}-${Date.now()}` : slug;

    const result = await db.collection(COLLECTIONS.PROJECTS).insertOne({
      ...validatedData,
      slug: finalSlug,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const project = await db
      .collection(COLLECTIONS.PROJECTS)
      .findOne({ _id: result.insertedId });

    // Auto-revalidate homepage for real-time updates
    revalidateHomePage();

    return NextResponse.json(project, { status: 201 });
  } catch (error) {
    console.error('Error creating project:', error);
    if (error instanceof Error && 'issues' in error) {
      return NextResponse.json(
        { error: 'Validation failed', details: error },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: 'Failed to create project' },
      { status: 500 }
    );
  }
}
