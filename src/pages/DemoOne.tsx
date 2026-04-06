import React from "react";
import Slideshow from "@/components/ui/slideshow";
import Header from "@/components/ui/Header";

export default function DemoOne() {
  return (
    <div className="min-h-screen bg-ink">
      <Header onNewCase={() => window.location.href = '/chat'} />
      <main className="w-full h-screen">
        <Slideshow />
      </main>
    </div>
  );
}
