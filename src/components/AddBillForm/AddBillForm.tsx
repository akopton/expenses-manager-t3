import { type Product } from "@prisma/client";
import { useEffect, useState, useContext } from "react";
import { CustomSelect } from "~/components/CustomSelect/CustomSelect";
import { api } from "~/utils/api";
import styles from "./form.module.css";
import { sumPlnValues } from "~/utils/sumValues";
import { ProductsContext } from "~/context/ProductsContext";
import { ProductsTable } from "../ProductsTable/ProductsTable";

export const AddBillForm = () => {
  const [name, setName] = useState<string>("");
  const [items, setItems] = useState<Product[]>([]);
  const [isPaid, setIsPaid] = useState<boolean>(false);
  const [sumValue, setSumValue] = useState<number>(0);
  const added_at = new Date();
  const updated_at = new Date();
  const paymentDate = new Date();
  const addBill = api.bills.addBill.useMutation();

  const { products } = useContext(ProductsContext);
  // const {categories} = useContext(CategoriesContext);

  const handleName = (e: React.FormEvent<HTMLInputElement>) => {
    setName(e.currentTarget.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await addBill.mutateAsync({
      name,
      items,
      value: sumValue,
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

  useEffect(() => {
    setSumValue(() => sumPlnValues(items));
  }, [items]);

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name-input" className={styles.nameInputWrapper}>
          Nazwa
          <input
            id="name-input"
            type="text"
            placeholder="name"
            onChange={handleName}
            value={name}
            className={styles.nameInput}
          />
        </label>

        <div className={styles.category}>Kategoria</div>
        <div className={styles.set}>Dodaj do zestawu</div>

        <label htmlFor="">
          <input type="text" value={paymentDate.toLocaleDateString()} />
        </label>

        <label htmlFor="isPaid" className={styles.isPaid}>
          <input
            type="checkbox"
            id="isPaid"
            className={styles.checkbox}
            checked={isPaid}
            onChange={() => setIsPaid((prev) => !prev)}
          />
          <span>{isPaid ? "Zapłacone" : "Do zapłaty"}</span>
        </label>
      </div>

      <div>
        <div className={styles.select}>
          <CustomSelect
            options={products}
            onSelect={handleSelect}
            selectedOptions={items}
          />
        </div>
        <div className={styles.selectedOptionsWrapper}>
          <span>Produkty</span>
          {items.length > 0 && (
            <ProductsTable updateProduct={updateProduct} data={items} />
          )}
        </div>

        <span className={styles.sumValue}>
          Suma: {sumValue.toFixed(2).replace(".", ",")} zł
        </span>
      </div>

      <input
        type="submit"
        value="Dodaj"
        onClick={handleSubmit}
        className={styles.addBtn}
      />
    </form>
  );
};
