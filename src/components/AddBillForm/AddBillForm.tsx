import type { Product } from "@prisma/client";
import { useEffect, useState } from "react";
import { CustomSelect } from "~/components/CustomSelect/CustomSelect";
import { api } from "~/utils/api";
import { sumValues } from "~/utils/sumValues";

export const AddBillForm = () => {
  const products = api.products.getProducts.useQuery();
  const addBill = api.bills.addBill.useMutation();
  const [name, setName] = useState<string>("");
  const [items, setItems] = useState<Product[]>([]);
  const [isPaid, setIsPaid] = useState<boolean>(false);
  const [value, setValue] = useState<number>(0);
  const added_at = new Date();
  const updated_at = new Date();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await addBill.mutateAsync({
      name,
      items,
      value,
      added_at,
      updated_at,
      isPaid,
    });
  };

  const handleSelect = (opt: Product, isChecked: boolean) => {
    isChecked
      ? setItems((prev) => [...prev, opt])
      : setItems((prev) => prev.filter((el) => el.id !== opt.id));
  };

  useEffect(() => {
    setValue(() => sumValues(items));
  }, [items]);

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      <label htmlFor="name-input">
        Nazwa
        <input
          id="name-input"
          type="text"
          placeholder="name"
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
      </label>
      <div>
        {products.data && (
          <CustomSelect
            data={products.data}
            onSelect={handleSelect}
            selectedOptions={items}
          />
        )}
      </div>
      <ul>
        {items.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
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
      <input type="submit" value="Add" onClick={handleSubmit} />
    </form>
  );
};
