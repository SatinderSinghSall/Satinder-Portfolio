import Sidebar from "./Sidebar";

export default function AdminLayout({ children }) {
  return (
    <div className="flex">
      <Sidebar />
      <main className="ml-64 flex-1 min-h-screen bg-gray-50 p-6">
        {children}
      </main>
    </div>
  );
}
