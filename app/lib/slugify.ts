export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .normalize('NFD') // Normalize unicode characters
    .replace(/[\u0300-\u036f]/g, '') // Remove diacritics
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/[^\w\-]+/g, '') // Remove all non-word chars
    .replace(/\-\-+/g, '-') // Replace multiple - with single -
    .replace(/^-+/, '') // Trim - from start of text
    .replace(/-+$/, ''); // Trim - from end of text
}

// Generate unique slug by appending timestamp if needed
export function generateUniqueSlug(text: string, addTimestamp: boolean = false): string {
  const baseSlug = slugify(text);
  if (addTimestamp) {
    return `${baseSlug}-${Date.now()}`;
  }
  return baseSlug;
}
