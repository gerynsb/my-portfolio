import { revalidatePath } from 'next/cache';

/**
 * Auto-revalidate homepage and related pages after data changes
 * Call this after any CREATE, UPDATE, or DELETE operation
 */
export function revalidateHomePage() {
  try {
    revalidatePath('/');
    revalidatePath('/articles');
    console.log('✅ Cache revalidated successfully');
  } catch (error) {
    console.error('❌ Error revalidating cache:', error);
  }
}
