import Posts from "@/components/Posts";
import Tabs from "@/components/Tabs";
import { Bell, Edit, Search } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex h-screen max-h-screen font-segoe mt-1 ml-5">
      <section className="p-2 flex flex-col gap-4 w-full">
        {/* categories */}
        <div className="lg:ml-32">
          <Tabs /></div>
        {/* posts */}
        <div className="flex flex-col gap-3 mt-5 lg:ml-32">
          <Posts
            author="Derrick"
            category="Human Parts"
            title="Laziness Does Not Exist"
            subTitle="when people procastinate, it is usually a good reason"
          />
        </div>
      </section>
    </div>
  );
}
