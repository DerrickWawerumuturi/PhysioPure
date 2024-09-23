import NotLoggedIn from "@/components/NotLoggedIn";
import Posts from "@/components/Posts";
import Recommended from "@/components/Recommended";
import { getLoggedInUser } from "@/lib/actions/user.actions";
import { User } from "@/types";

export default async function Home() {
  const user: User | null = await getLoggedInUser()

  return (

    <div className="flex h-screen max-h-screen font-segoe mt-1 ml-5">
      {user ? (
        <section className="p-2 flex flex-col gap-4 w-full">
          {/* categories */}
          <div className="lg:ml-32">
          </div>
          {/* posts */}
          <div className="flex space-x-36 lg:ml-10 justify-center">
            <Posts />
            <div className="sm:hidden lg:block pt-36 flex flex-col  space-y-7">
              <Recommended />
              <div>
                <h2></h2>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <NotLoggedIn user={user} />
      )}
    </div>
  );
}
