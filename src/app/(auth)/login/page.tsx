import ParentLoginCard from "../_components/ParentLoginCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const LoginPage = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-center w-screen h-screen gap-4">
        <Tabs defaultValue="parent" className="w-full max-w-sm">
          <TabsList>
            <TabsTrigger value="parent">Parent</TabsTrigger>
            <TabsTrigger value="password">Child</TabsTrigger>
          </TabsList>
          <TabsContent value="parent">
            <ParentLoginCard />
          </TabsContent>
          <TabsContent value="child">Change your password here.</TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default LoginPage;
