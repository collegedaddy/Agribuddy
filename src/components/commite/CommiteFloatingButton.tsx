
import React from "react";
import { Plus } from "lucide-react";

type Props = {
  onClick: () => void;
  active: boolean;
};

export function CommiteFloatingButton({ onClick, active }: Props) {
  return (
    <button
      className={`
        fixed bottom-7 right-7 z-50 rounded-full text-primary-foreground shadow-xl w-14 h-14 flex items-center justify-center
        border-2 border-background hover:scale-105 transition-all duration-200
        ${active ? "bg-secondary ring-2 ring-ring" : "bg-primary hover:bg-primary/90"}
      `}
      type="button"
      aria-label="New Post"
      onClick={onClick}
    >
      <Plus size={28} />
    </button>
  );
}
