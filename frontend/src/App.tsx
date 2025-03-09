import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";

function App() {
  return (
    <>
      <div className="flex flex-col justify-center items-center h-screen gap-5">
        <h1 className="text-3xl font-bold underline text-blue-400">
          InvoiceFlow
        </h1>
        <Button>Shadcn Button</Button>
        <Button
          variant="outline"
          onClick={() =>
            toast("Event has been created", {
              description: "Sunday, December 03, 2023 at 9:00 AM",
              action: {
                label: "Undo",
                onClick: () => console.log("Undo"),
              },
            })
          }
        >
          Show Toast
        </Button>
      </div>
      <div>No direct push to main</div>
      <Toaster />
    </>
  );
}

export default App;
