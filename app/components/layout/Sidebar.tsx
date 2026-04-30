export default function Sidebar() {
  return (
    <aside className="w-60 bg-[#0F172A] p-4">
      <h1 className="text-xl font-bold mb-6">SecureStore</h1>

      <nav className="space-y-2">
        <p>Dashboard</p>
        <p>My Files</p>
        <p>Vault</p>
        <p>Shared</p>
        <p>Settings</p>
      </nav>
    </aside>
  );
}