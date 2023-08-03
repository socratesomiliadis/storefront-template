import { Suspense } from "react";

export default function SearchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Suspense>
      <div className="bg-offWhite rounded-b-xl flex flex-col gap-8 px-4 pb-4 text-black dark:text-white md:flex-row">
        {children}
      </div>
    </Suspense>
  );
}
