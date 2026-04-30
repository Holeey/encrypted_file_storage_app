import FileTable from "../../components/files/FileTable";
import VaultCard from "../../components/vault/VaultCard";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-4 gap-4">
        {/* Cards here */}
      </div>

      <FileTable />
      <VaultCard />
    </div>
  );
}