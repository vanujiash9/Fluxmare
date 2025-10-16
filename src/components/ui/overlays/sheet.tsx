"use client";

import * as React from "react";

// Minimal, loosely-typed Sheet components to satisfy legacy usages in Sidebar.
// These intentionally use broad prop types to avoid tight coupling with any
// external primitive library while preserving structure and className/style
// forwarding so the UI remains unchanged.

export function Sheet({ children, open, onOpenChange, ...props }: any) {
  return (
    <div data-slot="sheet-root" {...props}>
      {children}
    </div>
  );
}

export function SheetContent({
  children,
  className,
  style,
  side,
  ...props
}: any) {
  return (
    <div
      data-slot="sheet-content"
      className={className}
      style={style}
      {...props}
    >
      {children}
    </div>
  );
}

export function SheetHeader({ children, className, ...props }: any) {
  return (
    <header data-slot="sheet-header" className={className} {...props}>
      {children}
    </header>
  );
}

export function SheetTitle({ children, className, ...props }: any) {
  return (
    <h2 data-slot="sheet-title" className={className} {...props}>
      {children}
    </h2>
  );
}

export function SheetDescription({ children, className, ...props }: any) {
  return (
    <p data-slot="sheet-description" className={className} {...props}>
      {children}
    </p>
  );
}
