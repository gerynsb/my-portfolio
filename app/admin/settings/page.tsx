import AdminHeader from '@/app/components/admin/AdminHeader';
import SettingsForm from '@/app/components/admin/forms/SettingsForm';

export default function SettingsPage() {
  return (
    <div>
      <AdminHeader title="Site Settings" />
      <div className="p-8">
        <SettingsForm />
      </div>
    </div>
  );
}
