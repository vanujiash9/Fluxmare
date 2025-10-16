"use client";

import * as React from "react";

export function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      className={"animate-pulse bg-border/20 rounded-md " + (className || "")}
      {...props}
    />
  );
}

export default Skeleton;
