import { getDatabase, COLLECTIONS } from '@/app/lib/db';
import { ObjectId } from 'mongodb';
import { notFound } from 'next/navigation';
import SkillForm from '@/app/components/admin/forms/SkillForm';

export default async function EditSkillPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const db = await getDatabase();
  
  const skill = await db
    .collection(COLLECTIONS.SKILLS)
    .findOne({ _id: new ObjectId(id) });

  if (!skill) {
    notFound();
  }

  const skillData = {
    ...skill,
    _id: skill._id.toString(),
  };

  return (
    <div>
      <div className="p-8">
        <h1 className="text-3xl font-bold mb-8 text-black">Edit Skill</h1>
        <SkillForm skill={skillData} />
      </div>
    </div>
  );
}
