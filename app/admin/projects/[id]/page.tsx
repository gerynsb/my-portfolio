import ProjectForm from '@/app/components/admin/forms/ProjectForm';
import { ObjectId } from 'mongodb';
import { getDatabase, COLLECTIONS } from '@/app/lib/db';

export default async function EditProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const db = await getDatabase();
  const project = await db
    .collection(COLLECTIONS.PROJECTS)
    .findOne({ _id: new ObjectId(id) });

  if (!project) {
    return <div>Project not found</div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Edit Project</h1>
      <ProjectForm project={JSON.parse(JSON.stringify(project))} />
    </div>
  );
}
