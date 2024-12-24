import React from "react";
import clsx from "clsx";

interface SheetProps {
  open: boolean;
  onOpenChange: () => void;
  children: React.ReactNode;
  className?: string; // Add className to the interface
}

export const Sheet: React.FC<SheetProps> = ({ open, onOpenChange, children, className }) => {
  return (
    <div
      className={clsx(
        "fixed inset-0 z-50 transition-opacity",
        open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none",
        className // Forward the className
      )}
      onClick={onOpenChange}
    >
      <div
        className="fixed inset-0 bg-black bg-opacity-50"
        onClick={(e) => e.stopPropagation()}
      />
      {children}
    </div>
  );
};

interface SheetContentProps {
  children: React.ReactNode;
  className?: string; // Ensure className is defined here
}

export const SheetContent: React.FC<SheetContentProps> = ({ children, className }) => {
  return (
    <div
      className={clsx(
        "fixed bottom-0 left-0 right-0 bg-white shadow-xl p-4",
        className // Forward the className
      )}
    >
      {children}
    </div>
  );
};
