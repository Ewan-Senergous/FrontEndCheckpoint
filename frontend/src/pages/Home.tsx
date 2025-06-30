import { Button } from "@/components/ui/button";

export function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4">
      <p>You should start working here!</p>
      <div className="flex gap-4">
        <Button variant="bleu">Test Button</Button>
        <Button variant="vert">Button Vert</Button>
      </div>
    </div>
  );
}
