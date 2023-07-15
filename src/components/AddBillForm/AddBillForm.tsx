import { type Product } from "@prisma/client";
import { useEffect, useState, useContext, useMemo } from "react";
import { CustomSelect } from "~/components/CustomSelect/CustomSelect";
import { api } from "~/utils/api";
import styles from "./form.module.css";
import { sumPlnValues } from "~/utils/sumValues";
import { ProductsContext } from "~/context/ProductsContext";
import { ProductsTable } from "../ProductsTable/ProductsTable";
import { replacePolishLetters } from "~/utils/replacePolishLetters";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { LoadingStatusModal } from "../LoadingStatusModal/LoadingStatusModal";
import { useLoadingState } from "~/hooks/useLoadingState";
import { useRouter } from "next/router";
import { ThemeContext } from "~/context/ThemeContext";

export const AddBillForm = () => {
  const [hideCategories, setHideCategories] = useState<boolean>(true);
  const [name, setName] = useState<string>("");
  const [items, setItems] = useState<Product[]>([]);
  const [isPaid, setIsPaid] = useState<boolean>(false);
  const [sumValue, setSumValue] = useState<number>(0);
  const [paymentDate, setPaymentDate] = useState<Date>(new Date());
  const [category, setCategory] = useState<string>("");
  const added_at = new Date();
  const updated_at = new Date();
  const addBill = api.bills.addBill.useMutation();
  const { error, loading, success, handleLoadingStatus, resetStatus } =
    useLoadingState();

  const router = useRouter();
  const { theme } = useContext(ThemeContext);
  const reset = () => {
    setName("");
    setItems([]);
    setIsPaid(false);
    setSumValue(0);
    setPaymentDate(new Date());
    setCategory("");
  };

  const getCategory = () => {
    if (!router.asPath.includes("categories")) return;

    const category = router.query.name as string;
    if (!category) return;
    setCategory(category);
  };

  const addNewBill = async () => {
    handleLoadingStatus("loading");
    try {
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
    } catch (err) {
      handleLoadingStatus("error");
    } finally {
      handleLoadingStatus("success");
    }
  };

  const { products } = useContext(ProductsContext);
  const categories = api.categories.getCategories.useQuery();

  const handleName = (e: React.FormEvent<HTMLInputElement>) => {
    setName(e.currentTarget.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!paymentDate) return;
    await addNewBill();
    reset();
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
    getCategory();
  }, [items]);

  const filteredCategories = useMemo(() => {
    return categories.data?.filter((el) =>
      replacePolishLetters(el.name).includes(replacePolishLetters(category))
    );
  }, [category]);

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
              onChange={(e) => {
                setHideCategories(false);
                setCategory(e.currentTarget.value);
              }}
              value={category}
              autoComplete={"off"}
              disabled={
                router.asPath.includes("categories") && router.query.name
                  ? true
                  : false
              }
            />
            {!hideCategories &&
              category &&
              filteredCategories &&
              filteredCategories.length > 0 && (
                <ul
                  className={styles.categoriesList}
                  style={{
                    display: hideCategories ? "none" : "block",
                    background:
                      theme === "dark"
                        ? "var(--primary-bg)"
                        : "var(--primary-font)",
                  }}
                >
                  {filteredCategories?.map((cat) => {
                    return (
                      <li
                        key={cat.id}
                        onClick={() => {
                          setCategory(cat.name);
                          setHideCategories(true);
                        }}
                        className={styles.categoryItem}
                      >
                        {cat.name}
                      </li>
                    );
                  })}
                </ul>
              )}
          </label>

          <div
            className={styles.inputWrapper}
            style={{ opacity: isPaid ? ".2" : "1" }}
          >
            <span className={styles.sectionTitle}>Termin płatności</span>
            <DatePicker
              dateFormat={"dd.MM.yyyy"}
              disabled={isPaid ? true : false}
              selected={paymentDate}
              className={styles.input}
              onChange={(date) => {
                if (date) setPaymentDate(date);
              }}
            />
          </div>

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
      {loading && (
        <LoadingStatusModal
          status="loading"
          message="Proszę czekać"
          closeModal={resetStatus}
        />
      )}
      {error && (
        <LoadingStatusModal
          status="error"
          message="Wystąpił błąd"
          closeModal={resetStatus}
        />
      )}
      {success && (
        <LoadingStatusModal
          status="success"
          message="Pomyślnie dodano"
          closeModal={resetStatus}
        />
      )}
    </>
  );
};
