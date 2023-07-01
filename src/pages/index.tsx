import { signIn, signOut, useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import { api } from "~/utils/api";

export default function Home() {
  const { data: sessionData, status } = useSession();

  if (status === "loading") {
    return <p>Loading...</p>
  }

  return (
    <>
      <Head>
        <title>UChat</title>
        <meta name="description" content="UChat chat app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-slate-800 to-slate-950">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <h1 className="text-5xl font-extrabold dark:text-pink-400 sm:text-[5rem]">
            UChat
          </h1>
          {sessionData ? (
            <Link
              className="max-w-xs rounded-full px-10 py-3 font-semibold dark:bg-pink-500 dark:text-white dark:hover:bg-pink-400"
              href="/chat"
            >
              Get Started
            </Link>
          ) : (
            <button
              className="max-w-xs rounded-full px-10 py-3 font-semibold dark:bg-pink-500 dark:text-white dark:hover:bg-pink-400"
              onClick={() => void signIn()}
            >
              Sign in
            </button>
          )}
        </div>
      </main>
    </>
  );
}

function AuthShowcase() {
  const { data: sessionData } = useSession();

  const { data: secretMessage } = api.example.getSecretMessage.useQuery(
    undefined, // no input
    { enabled: sessionData?.user !== undefined }
  );

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <p className="text-center text-2xl text-white">
        {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
        {secretMessage && <span> - {secretMessage}</span>}
      </p>
      <button
        className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
        onClick={sessionData ? () => void signOut() : () => void signIn()}
      >
        {sessionData ? "Sign out" : "Sign in"}
      </button>
    </div>
  );
}
