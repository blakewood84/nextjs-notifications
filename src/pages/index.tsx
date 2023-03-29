import Head from "next/head";
import { connect } from "getstream";
import { useUser } from "@/stores/user";
import { API_KEY, APP_SECRET } from "@/config/constants";
import { useEffect } from "react";

export default function Home({ token }: { token: string }) {
  const { setToken } = useUser();

  useEffect(() => {
    setToken(token);
  }, []);

  return (
    <>
      <Head>
        <title>Drop Notifications</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="h-full flex items-center justify-center w-full flex-col bg-slate-900">
        <div className="flex items-center">
          <button className="btn btn-primary mr-5">Follow</button>
          Emanate
        </div>
      </main>
    </>
  );
}

export async function getServerSideProps() {
  const client = connect(API_KEY, APP_SECRET);

  const token = await client.createUserToken("eric");

  return {
    props: {
      token,
    },
  };
}
