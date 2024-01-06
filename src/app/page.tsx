import React from "react";
import { getServerAuthSession } from "~/server/auth";

import DashboardComponent, {
  type IDashboardProps,
} from "./_components/dashboard";
import LoginComponent from "./_components/login";

export default async function Home() {
  const session = await getServerAuthSession();
  const profileData: IDashboardProps = {
    src: session?.user.image ?? "image kosong",
    name: session?.user.name ?? "name kosong",
    email: session?.user.email ?? "email kosong",
  };
  return (
    <div>
      {session ? (
        // <div>sudah login</div>
        <DashboardComponent {...profileData}></DashboardComponent>
      ) : (
        // <div>belum login</div>
        <LoginComponent></LoginComponent>
      )}
    </div>
  );
}

// async function CrudShowcase() {
//   const session = await getServerAuthSession();
//   if (!session?.user) return null;

//   const latestPost = await api.post.getLatest.query();

//   return (
//     <div className="w-full max-w-xs">
//       {latestPost ? (
//         <p className="truncate">Your most recent post: {latestPost.name}</p>
//       ) : (
//         <p>You have no posts yet.</p>
//       )}

//       <CreatePost />
//     </div>
//   );
// }
