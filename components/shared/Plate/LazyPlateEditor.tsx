"use client";
import dynamic from "next/dynamic";

// Lazy load PlateEditor - it's a very large component
const PlateEditor = dynamic(
  () => import("./PlateEditor"),
  {
    loading: () => (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    ),
    ssr: false, // Plate editor is typically client-only
  }
);

export default PlateEditor;
