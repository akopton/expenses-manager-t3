import type { Product } from "@prisma/client";
import Head from "next/head";
import { useEffect, useState } from "react";
import { api } from "~/utils/api";
import { sumValues } from "~/utils/sumValues";

export default function AddBillPage() {
  const products = api.products.getProducts.useQuery();
  const bills = api.bills.getBills.useQuery();
  const [name, setName] = useState<string>("");
  const [items, setItems] = useState<Product[]>([]);
  const [value, setValue] = useState<number>(0);
  const [isPaid, setIsPaid] = useState<boolean>(false);

  const handleCheckbox = (
    e: React.FormEvent<HTMLInputElement>,
    el: Product
  ) => {
    e.currentTarget.checked
      ? setItems((prev) => [...prev, el])
      : setItems((prev) => prev.filter((item) => el.id !== item.id));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    //TODO: add bill to table
  };

  useEffect(() => {
    setValue(() => sumValues(items));
  }, [items]);

  return (
    <>
      <Head>
        <title>Dashboard</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center">
        <h1 className="text-3xl">add bill</h1>
        <div>
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="name"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
            <div>
              {products &&
                products.data?.map((el) => {
                  return (
                    <label htmlFor={el.name} key={el.id}>
                      {el.name}
                      <input
                        type="checkbox"
                        id={el.name}
                        className=" ml-3"
                        onChange={(e) => handleCheckbox(e, el)}
                      />
                    </label>
                  );
                })}
            </div>
            <label htmlFor="isPaid">
              Zapłacone?
              <input
                type="checkbox"
                id="isPaid"
                className=" ml-3"
                checked={isPaid}
                onChange={() => setIsPaid((prev) => !prev)}
              />
            </label>
            <input type="button" value="Add" onClick={handleSubmit} />
          </form>

          <div>value: {value}</div>
        </div>
        <div>
          <h2>bills</h2>
          <ul>
            {bills &&
              bills.data?.map((el) => {
                return (
                  <li key={el.id}>
                    <span>{el.name}</span>
                  </li>
                );
              })}
          </ul>
        </div>
      </main>
    </>
  );
}
