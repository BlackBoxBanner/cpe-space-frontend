import { Button } from "@/components/common/button";
import { cn } from "@dookdiks/utils";
import Image from "next/image";

export default function Home() {
  return (
    <main className={cn("bg-alabaster h-screen max-h-screen")}>
      <Button>Click me</Button>
    </main>
  );
}
