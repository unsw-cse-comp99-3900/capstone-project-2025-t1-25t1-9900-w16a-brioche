import { Button } from "@/components/ui/button";

function App() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold text-red-500 underline mb-4">
        Vite + React
      </h1>
      <Button  size="lg">
        Click me
      </Button>
    </div>
  );
}

export default App;
