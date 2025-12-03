import type { Metadata } from "next";
import { DM_Sans, Poppins } from "next/font/google";
import { Providers } from "./providers";
import ClientLayout from "./client-layout";
import "./globals.css";

const dmSans = DM_Sans({
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  variable: "--font-dm-sans",
  subsets: ["latin"],
});
const poppins = Poppins({
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  subsets: ["latin"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Health Linker",
  description: "Health Linker Job Portal - Find your perfect healthcare job",
  other: {
    "format-detection": "telephone=no, email=no, address=no",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className={`${dmSans.variable} ${poppins.variable}  antialiased`} suppressHydrationWarning={true}>
        <Providers>
          <ClientLayout>{children}</ClientLayout>
        </Providers>
      </body>
    </html>
  );
}
