import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import NextNProgress from "nextjs-progressbar";

import { trpc } from "../utils/trpc";

import "../styles/globals.css";
import Head from "next/head";
import NavBar from "../components/navbar";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <Head>
        <title>Polliwhirl</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content="Polliwhirl" />

        <meta property="og:title" content="Polliwhirl" />
        <meta property="og:description" content="Polliwhirl" />
        <meta
          property="og:image"
          content="https://polliwhirl.com/og-image.png"
        />
        <meta property="og:url" content="https://polliwhirl.com" />
        <meta name="twitter:card" content="summary_large_image" />

        <link rel="icon" href="/favicon.ico" />
      </Head>

      <NextNProgress />
      <NavBar />
      <Component {...pageProps} />
    </SessionProvider>
  );
};

export default trpc.withTRPC(MyApp);
