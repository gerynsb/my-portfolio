import ExperienceForm from '@/app/components/admin/forms/ExperienceForm';

export default function NewExperiencePage() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8 text-black">Create New Experience</h1>
      <ExperienceForm />
    </div>
  );
}
