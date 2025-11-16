import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get('secret');
  
  // Validate secret to prevent unauthorized revalidation
  if (secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ message: 'Invalid secret' }, { status: 401 });
  }

  try {
    // Revalidate homepage
    revalidatePath('/');
    
    // Revalidate articles page
    revalidatePath('/articles');
    
    return NextResponse.json({ 
      revalidated: true, 
      message: 'Cache cleared successfully',
      timestamp: new Date().toISOString()
    });
  } catch (err) {
    return NextResponse.json({ 
      message: 'Error revalidating',
      error: String(err)
    }, { status: 500 });
  }
}
