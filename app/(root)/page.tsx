
import Posts from "@/components/Posts";
import Tabs from "@/components/Tabs";
import { Suspense } from "react";

export default function Home() {
  return (
    <div className="flex h-screen max-h-screen font-segoe mt-1 ml-5">
      <section className="p-2 flex flex-col gap-4 w-full">
        {/* categories */}
        <div className="lg:ml-32">
          <Suspense fallback={<div>Loading...</div>}>
            <Tabs /></Suspense>
        </div>
        {/* posts */}
        <div className="flex flex-col gap-3 mt-5 lg:ml-32 lg:border-r-2 lg:border-gray-100 lg:-mr-32">
          <Posts />
        </div>
      </section>
    </div>
  );
}
