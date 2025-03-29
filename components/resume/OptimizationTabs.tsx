// src/components/resume/optimization/tabs.jsx
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function OptimizationTabs({
  activeTab,
  setActiveTab,
  resumeData,
  optimizationApplied,
  children,
}) {
  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="analysis">Analysis</TabsTrigger>
        <TabsTrigger value="optimization">Optimization</TabsTrigger>
        <TabsTrigger value="preview">Preview</TabsTrigger>
      </TabsList>

      <TabsContent value={activeTab} className="mt-6">
        {children}
      </TabsContent>
    </Tabs>
  );
}
