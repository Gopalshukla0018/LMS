import { cn } from "@/lib/utils";

function Skeleton({ className, ...props }) {
  // Provide a sensible default that respects Tailwind dark mode.
  // Most usages passed only sizing classes; giving a dark fallback here
  // ensures skeletons render correctly in dark theme without editing every file.
  const defaultClasses =
    "bg-gray-300 dark:bg-gray-700 animate-pulse rounded-md";
  return (
    <div
      data-slot="skeleton"
      className={cn(defaultClasses, className)}
      {...props}
    />
  );
}

export { Skeleton };
