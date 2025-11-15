import SkillForm from '@/app/components/admin/forms/SkillForm';

export default function NewSkillPage() {
  return (
    <div>
      <div className="p-8">
        <h1 className="text-3xl font-bold mb-8 text-black">Create New Skill</h1>
        <SkillForm />
      </div>
    </div>
  );
}
