import "~/styles/globals.css";

import { Inter } from "next/font/google";
import { cookies } from "next/headers";

import { TRPCReactProvider } from "~/trpc/react";
import Providers from "./provider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});
 
export const metadata = {
  title: "Fresha",
  description: "Web Admin",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`font-sans ${inter.variable}`}>
        <Providers>
          <TRPCReactProvider cookies={cookies().toString()}>
            {children}
          </TRPCReactProvider>
        </Providers>
      </body>
    </html>
  );
}
