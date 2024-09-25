import { getLoggedInUser } from "@/lib/actions/user.actions";
import { User } from "@/types";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import Image from "next/image";

export default async function Home() {
  const user: User | null = await getLoggedInUser()

  return (
    <div className="h-screen max-h-screen py-20 mx-auto text-center flex flex-col items-center max-w-3xl">
      <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl mt-14">
        Empower Your Movement, Transform Your Health.
      </h1>
      <p className="mt-6 text-lg max-w-prose text-muted-foreground">
        Discover expert tips, treatments, and exercises
        designed to help you move better,live pain-free,
        and achieve lasting well-being.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 mt-6">
        <Link
          href="/request-access"
          className={buttonVariants({ variant: "green" })}
        >
          Request Access
        </Link>
        <Link
          href="/articles"
          className={buttonVariants({ variant: "ghost" })}
        >
          Browse Articles
        </Link>
      </div>
      <div className="flex text-center mt-10">
        <Image
          src="/assets/images/PhysioExamples.png"
          alt="examples"
          width={4000}
          height={4000}
          layout="responsive"
          className="w-full max-w-sm sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl"
        />
      </div>
    </div>
  );
}
