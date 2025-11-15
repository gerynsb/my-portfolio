import ExperienceForm from '@/app/components/admin/forms/ExperienceForm';
import { ObjectId } from 'mongodb';
import { getDatabase, COLLECTIONS } from '@/app/lib/db';

export default async function EditExperiencePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const db = await getDatabase();
  const experience = await db
    .collection(COLLECTIONS.EXPERIENCES)
    .findOne({ _id: new ObjectId(id) });

  if (!experience) {
    return <div>Experience not found</div>;
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8 text-black">Edit Experience</h1>
      <ExperienceForm experience={JSON.parse(JSON.stringify(experience))} />
    </div>
  );
}
