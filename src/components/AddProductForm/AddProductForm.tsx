import { useState } from "react";
import styles from "./form.module.css";
import { api } from "~/utils/api";

export const AddProductForm = () => {
  const [name, setName] = useState<string>("");
  const [value, setValue] = useState<number>(0);
  const addProduct = api.products.addProduct.useMutation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const count = 5;
    addProduct.mutateAsync({ name, value, count });
  };

  const handleName = (e: React.FormEvent<HTMLInputElement>) => {
    const name = e.currentTarget.value;
    setName(name);
  };

  const handleValue = (e: React.FormEvent<HTMLInputElement>) => {
    const value = parseFloat(e.currentTarget.value);
    setValue(value);
  };

  return (
    <>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          onChange={handleName}
          value={name}
          className={styles.input}
        />
        <input
          type="number"
          onChange={handleValue}
          value={value}
          className={styles.input}
        />
        <input
          type="button"
          value="Add"
          className={styles.submitBtn}
          onClick={handleSubmit}
        />
      </form>
    </>
  );
};