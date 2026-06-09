import Sidebar from "../../components/layout/Sidebar";
import Topbar from "../../components/layout/Topbar";
import UploadModal from "../../components/ui/uploadModal";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-[#020617] text-white">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Topbar />
       
        <main className="p-6">{children}</main>
      </div> 
      <div className="position- absolute top-0 left-0 w-full h-full flex items-center justify-center">
        <UploadModal />
      </div>
      
    </div>
  );
}