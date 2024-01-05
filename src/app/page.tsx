// import Link from "next/link";

// import { CreatePost } from "~/app/_components/create-post";
import React from "react";
import { getServerAuthSession } from "~/server/auth";

// import { api } from "~/trpc/server";
import {
  Navbar,
  NavbarBrand,
  NavbarMenuToggle,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  Link,
  Button,
} from "@nextui-org/react";

export default async function Home() {
  // const hello = await api.post.hello.query({ text: "from tRPC" });
  const session = await getServerAuthSession();

  const menuItems = ["Sayur", "Pesanan", "Customer"];
  const toMenuItem = ["/items/sayur", "/items/pesanan", "/items/customer"];

  return (
    <Navbar disableAnimation isBordered>
      <NavbarContent className="sm:hidden" justify="start">
        <NavbarMenuToggle />
      </NavbarContent>
      <NavbarContent>
        <NavbarBrand>
          {/* <AcmeLogo /> */}
          <p className="font-bold text-inherit">Fresha</p>
        </NavbarBrand>
      </NavbarContent>

      {session && (
        <NavbarContent className="hidden gap-4 sm:flex" justify="center">
          {menuItems.map((item, index) => (
            <NavbarItem key={`${item}-${index}`} isActive>
              <Link href={toMenuItem[index]} color="foreground" size="sm">
                {item}
              </Link>
            </NavbarItem>
          ))}
        </NavbarContent>
      )}

      <NavbarContent justify="end">
        <NavbarItem>
          <div className="flex items-center gap-4">
            <p style={{ fontSize: "1rem" }} className="text-center text-black">
              {session && <span>{session.user?.name}</span>}
            </p>
            <Button
              as={Link}
              color="primary"
              href={session ? "/api/auth/signout" : "/api/auth/signin"}
              variant="flat"
            >
              {session ? "Sing Out" : "Sign in"}
            </Button>
          </div>
        </NavbarItem>
      </NavbarContent>

      {session && (
        <NavbarMenu>
          {menuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link
                className="w-full"
                color={
                  index === 2
                    ? "warning"
                    : index === menuItems.length - 1
                      ? "danger"
                      : "foreground"
                }
                href="#"
                size="lg"
              >
                {item}
              </Link>
            </NavbarMenuItem>
          ))}
        </NavbarMenu>
      )}
    </Navbar>
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
