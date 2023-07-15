import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";

export default function SetPage() {
  const router = useRouter();
  const setName = router.query.name;

  return (
    <>
      <Head>
        <title>Elo mordo</title>
      </Head>
      <main>
        to jest jeden zestaw {setName}
        <Link href={`${router.asPath}/add-bill`}>dodaj nowy</Link>
      </main>
    </>
  );
}
