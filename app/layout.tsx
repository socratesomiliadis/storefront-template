import Navbar from "components/layout/navbar";
import { Inter } from "next/font/google";
import { ReactNode, Suspense } from "react";
import "./globals.css";
import Footer from "components/footer";

const { TWITTER_CREATOR, TWITTER_SITE, SITE_NAME } = process.env;

export const metadata = {
  title: {
    default: SITE_NAME as string,
    template: `%s | ${SITE_NAME}`,
  },
  robots: {
    follow: true,
    index: true,
  },
  ...(TWITTER_CREATOR &&
    TWITTER_SITE && {
      twitter: {
        card: "summary_large_image",
        creator: TWITTER_CREATOR,
        site: TWITTER_SITE,
      },
    }),
};

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="bg-softGray text-black selection:bg-teal-300">
        <Navbar />
        <Suspense>
          <main className="bg-softGray">{children}</main>
        </Suspense>
        <Footer />
      </body>
    </html>
  );
}
