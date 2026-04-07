import React from 'react';
import { Sidebar } from '@/components/ui/sidebar-with-submenu';

export default function SidebarDemo() {
  return (
    <main className="min-h-screen bg-void flex">
      <Sidebar />
      <div className="flex-1 ml-80 p-8 flex flex-col justify-center items-center">
        <div className="max-w-xl text-center space-y-4">
          <h1 className="text-4xl font-display font-bold text-purple">Sidebar Navigation</h1>
          <p className="text-text-secondary text-balance">
            This is a demonstration of the JusticeAI sidebar component. It features full SPA
            routing, Radix UI dropdown menus, interactive profile management, and nested legal
            submenus.
          </p>
        </div>
      </div>
    </main>
  );
}
