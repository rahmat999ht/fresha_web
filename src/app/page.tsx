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

