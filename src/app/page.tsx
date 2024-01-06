import React from "react";
import { getServerAuthSession } from "~/server/auth";
import LoginComponent from "./login/page";
import Dashboard from "./dashboard/page";
import Layout from "./dashboard/layout";

export default async function Home() {
  const session = await getServerAuthSession();
  return (
    <div>
      {session ? (
        // <div>sudah login</div>
        <Layout>
          <Dashboard />
        </Layout>
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
