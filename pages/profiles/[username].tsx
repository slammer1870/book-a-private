import Layout from "@/components/Layout";
import { useRouter } from "next/router";

import { useEffect, useState } from "react";

type User = {
  name: String;
  username: String;
};

export default function Profile() {
  const router = useRouter();

  const { username } = router.query;

  console.log(username);

  const [user, setUser] = useState<User | undefined>();
  const [loadingState, setLoadingState] = useState<Boolean>();

  useEffect(() => {
    const getUser = async () => {
      setLoadingState(true);
      const res = await fetch("/api/profiles/get-user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: username as string }),
      });

      const data = await res.json();

      console.log(data);

      const { error } = data;

      if (error) {
        setUser(undefined);
        setLoadingState(false);
        return;
      }

      setUser(data);
      setLoadingState(false);
    };

    getUser();
  }, [router]);

  return (
    <Layout>
      <div className="container mx-auto px-4 pt-20 pb-10 min-h-screen">
        {loadingState && (
          <h1 className="text-3xl font-medium mb-2">Loading...</h1>
        )}
        {user && !loadingState && (
          <h1 className="text-3xl font-medium mb-2">
            {user.name}'s Booking Profile
          </h1>
        )}
        {!user && !loadingState && (
          <h1 className="text-3xl font-medium mb-2">
            Booking Profile not found for user with username {username}
          </h1>
        )}
      </div>
    </Layout>
  );
}
