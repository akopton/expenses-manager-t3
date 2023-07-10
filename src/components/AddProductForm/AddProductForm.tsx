import { useState } from "react";
import styles from "./form.module.css";
import { api } from "~/utils/api";

export const AddProductForm = () => {
  const [name, setName] = useState<string>("");
  const [value, setValue] = useState<string>("");
  const addProduct = api.products.addProduct.useMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const numberValue = parseFloat(value);
    await addProduct.mutateAsync({ name, value: numberValue });
  };

  const handleName = (e: React.FormEvent<HTMLInputElement>) => {
    const name = e.currentTarget.value;
    setName(name);
  };

  const handleValue = (e: React.FormEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    setValue(value);
  };

  return (
    <>
      <form className={styles.form} onSubmit={handleSubmit}>
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
          type="submit"
          value="Add"
          className={styles.submitBtn}
          onClick={handleSubmit}
        />
      </form>
    </>
  );
};
