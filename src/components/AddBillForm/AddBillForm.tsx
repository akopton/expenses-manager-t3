import { Prisma, type Product } from "@prisma/client";
import { useEffect, useState } from "react";
import { CustomSelect } from "~/components/CustomSelect/CustomSelect";
import { api } from "~/utils/api";
import { sumValues } from "~/utils/sumValues";
import { decimalToFloat } from "~/utils/decimalToFloat";
import styles from "./form.module.css";

type SelectedProductProps<T> = {
  product: T;
  updateProduct: (product: T) => void;
};

const SelectedProduct = (props: SelectedProductProps<Product>) => {
  const {
    product: { id, value, count, name },
    updateProduct,
  } = props;

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    if (e.currentTarget.id.includes("count")) {
      updateProduct({
        id,
        name,
        value,
        count: parseInt(e.currentTarget.value),
      });
    } else {
      const newValue = parseFloat(e.currentTarget.value);
      updateProduct({ id, name, value: newValue, count });
    }
  };

  return (
    <li className="flex">
      <span>{name}</span>
      <label htmlFor={`${id}-value`}>
        <input
          id={`${id}-value`}
          type="number"
          value={value}
          onChange={handleChange}
        />
      </label>
      <label htmlFor={`${id}-count`}>
        <input
          id={`${id}-count`}
          type="number"
          value={count}
          onChange={handleChange}
        />
      </label>
    </li>
  );
};

export const AddBillForm = () => {
  const products = api.products.getProducts.useQuery();
  const addBill = api.bills.addBill.useMutation();
  const [name, setName] = useState<string>("");
  const [items, setItems] = useState<Product[]>([]);
  const [isPaid, setIsPaid] = useState<boolean>(false);
  const [value, setValue] = useState<number>(0);
  const added_at = new Date();
  const updated_at = new Date();

  const handleName = (e: React.FormEvent<HTMLInputElement>) => {
    setName(e.currentTarget.value);
  };

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

  const updateProduct = (product: Product) => {
    const newProducts = items.map((item) => {
      if (item.id === product.id) {
        return product;
      } else {
        return item;
      }
    });
    setItems(newProducts);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <label htmlFor="name-input">
        <input
          id="name-input"
          type="text"
          placeholder="name"
          onChange={handleName}
          value={name}
        />
      </label>
      <div>
        {products.data && (
          <CustomSelect
            options={products.data}
            onSelect={handleSelect}
            selectedOptions={items}
          />
        )}
      </div>
      <ul>
        {items.map((item) => {
          return (
            <SelectedProduct
              product={item}
              updateProduct={updateProduct}
              key={item.id}
            />
          );
        })}
      </ul>
      <label htmlFor="isPaid">
        {isPaid ? "Zapłacone" : "Do zapłaty"}
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
