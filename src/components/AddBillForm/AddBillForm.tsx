import { Category, type Product } from "@prisma/client";
import { useEffect, useState, useContext } from "react";
import { CustomSelect } from "~/components/CustomSelect/CustomSelect";
import { api } from "~/utils/api";
import styles from "./form.module.css";
import { sumPlnValues } from "~/utils/sumValues";
import { ProductsContext } from "~/context/ProductsContext";
import { ProductsTable } from "../ProductsTable/ProductsTable";

const sampleCategories = [
  { id: 1, name: "spożywcze" },
  { id: 2, name: "budowlane" },
  { id: 3, name: "samochód" },
  { id: 4, name: "opłaty" },
];

export const AddBillForm = () => {
  const [name, setName] = useState<string>("");
  const [items, setItems] = useState<Product[]>([]);
  const [isPaid, setIsPaid] = useState<boolean>(false);
  const [sumValue, setSumValue] = useState<number>(0);
  const [paymentDate, setPaymentDate] = useState<Date>(new Date());
  const [category, setCategory] = useState<"">("");
  const added_at = new Date();
  const updated_at = new Date();
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
      category,
      items,
      value: sumValue,
      paymentDate,
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

  const handleCategorySearch = (e: React.FormEvent<HTMLInputElement>) => {
    const myTimeout = setTimeout(() => {
      sampleCategories.forEach((el) => {
        if (el.name.includes(e.currentTarget.value)) {
          console.log(e.currentTarget.value);
        }
      });
    }, 1000);

    clearTimeout(myTimeout);
  };

  return (
    <>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.formLeft}>
          <label htmlFor="name-input" className={styles.inputWrapper}>
            <span className={styles.sectionTitle}>Nazwa</span>
            <input
              id="name-input"
              className={styles.input}
              type="text"
              placeholder="mleko"
              onChange={handleName}
              value={name}
            />
          </label>

          <label htmlFor="category-input" className={styles.inputWrapper}>
            <span className={styles.sectionTitle}>Kategoria</span>
            <input
              id="category-input"
              className={styles.input}
              type="text"
              placeholder="spożywcze"
              onKeyDown={handleCategorySearch}
            />
          </label>

          <label
            htmlFor="date-input"
            className={styles.inputWrapper}
            style={{ opacity: isPaid ? ".2" : "1" }}
          >
            <span className={styles.sectionTitle}>Data płatności</span>
            <input
              id="date-input"
              className={styles.input}
              type="text"
              value={paymentDate.toLocaleDateString()}
              disabled={isPaid ? true : false}
            />
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

        <div className={styles.formCenter}>
          <span className={styles.sectionTitle}>Wybierz produkty</span>
          <div className={styles.select}>
            <CustomSelect
              options={products}
              onSelect={handleSelect}
              selectedOptions={items}
            />
          </div>
        </div>

        <div className={styles.formRight}>
          <span className={styles.sectionTitle}>Produkty</span>
          {items.length > 0 && (
            <ProductsTable updateProduct={updateProduct} data={items} />
          )}
          <span className={styles.sectionTitle}>
            Suma: {sumValue.toFixed(2).replace(".", ",")} zł
          </span>
        </div>
      </form>
      <div className={styles.bottomBtns}>
        <button type="button" onClick={handleSubmit} className={styles.addBtn}>
          Dodaj
        </button>
        <button type="button" onClick={handleSubmit} className={styles.addBtn}>
          Dodaj do zestawu
        </button>
      </div>
    </>
  );
};
