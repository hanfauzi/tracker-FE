import { AppSidebar } from "../_components/ParentSidebar";

const ParentDashboardPage = () => {
  return (
    <>
      <div className="flex min-h-screen">
      <AppSidebar />
      <main className="flex-1 p-4">
      </main>
    </div>
    </>
  );
};

export default ParentDashboardPage;
