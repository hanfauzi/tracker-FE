import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./_components/ParentSidebar";
import ReactQueryProvider from "@/providers/ReactQueryProviders";
import { Toaster } from "@/components/ui/sonner";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main>
        <SidebarTrigger />
        <Toaster position="top-center" />
        <ReactQueryProvider>{children}</ReactQueryProvider>
      </main>
    </SidebarProvider>
  );
};

export default layout;
