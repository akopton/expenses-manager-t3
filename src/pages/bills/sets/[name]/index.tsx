import { Bill } from "@prisma/client";
import { useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { BillsList } from "~/components/BillsList/BillsList";
import { GridList } from "~/components/GridList/GridList";
import { api } from "~/utils/api";
import { convertToPln } from "~/utils/convertToPln";

export default function SetPage() {
  const router = useRouter();
  const setId = router.query.id as string;
  const set = api.billSets.getSetById.useQuery({ id: setId });
  const session = useSession();
  const currentUser = session.data?.user;
  //todo: get set by it id

  return (
    <>
      <Head>
        <title>Elo mordo</title>
      </Head>
      <main>
        {set.data && (
          <div className="border-2 border-primaryColor">
            <div>{set.data.name}</div>
            <div>
              <span>Wartość: </span>
              <span>{convertToPln(set.data.value)}</span>
            </div>
            <ul>
              {set.data.owners.map((owner) => {
                if (owner.email === currentUser?.email) {
                  return <li key={owner.id}>{owner.name} (Ty)</li>;
                } else {
                  return <li key={owner.id}>{owner.name}</li>;
                }
              })}
            </ul>
            <div className="border-2 border-primaryColor">
              <span>Rachunki:</span>
              <BillsList data={set.data.bills} />
              <Link href={`${router.query.id}/add-bill`}>Dodaj istniejący</Link>
              <Link href={`${router.query.id}/add-bill`}>Dodaj nowy</Link>
            </div>
          </div>
        )}
      </main>
    </>
  );
}
