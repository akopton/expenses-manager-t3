import { type Product } from "@prisma/client";
import React, { useContext, useMemo, useState } from "react";
import { MdExpandLess, MdExpandMore } from "react-icons/md";
import { AiOutlinePlus } from "react-icons/ai";
import { ProductsContext } from "~/context/ProductsContext";
import styles from "./select.module.css";
import { ThemeContext } from "~/context/ThemeContext";

type SelectProps<T> = {
  options?: T[];
  onSelect: (opt: T, isChecked: boolean) => void;
  selectedOptions: T[];
};

type OptionProps<T> = {
  option: T;
  onSelect: (opt: T, isChecked: boolean) => void;
  isSelected: boolean;
};

const AddProductForm = () => {
  const [productName, setProductName] = useState<string>("");
  const [productValue, setProductValue] = useState<string>("");
  const { addNewProduct } = useContext(ProductsContext);

  const handleProductName = (e: React.FormEvent<HTMLInputElement>) => {
    setProductName(e.currentTarget.value);
  };

  const handleProductValue = (e: React.FormEvent<HTMLInputElement>) => {
    setProductValue(e.currentTarget.value);
  };

  const reset = () => {
    setProductName("");
    setProductValue("");
  };

  const handleClick = async () => {
    const name = productName;
    const value = parseFloat(productValue);
    await addNewProduct({ name, value });

    reset();
  };

  return (
    <li className={styles.option}>
      <input
        type="text"
        placeholder="Nazwa"
        value={productName}
        onChange={handleProductName}
        className={styles.nameInput}
      />
      <label htmlFor="value">
        <input
          id="value"
          type="number"
          placeholder="0"
          value={productValue}
          onChange={handleProductValue}
          className={styles.valueInput}
        />
        <span className={styles.inputLabel}>zł</span>
      </label>
      <button type="button" onClick={handleClick} className={styles.btnAdd}>
        Dodaj
      </button>
    </li>
  );
};

const Option = (props: OptionProps<Product>) => {
  const { option, isSelected, onSelect } = props;
  const [isChecked, setIsChecked] = useState<boolean>(
    isSelected ? isSelected : false
  );

  const handleCheckbox = (
    e: React.FormEvent<HTMLInputElement>,
    option: Product
  ) => {
    const isChecked = e.currentTarget.checked;
    setIsChecked(isChecked);
    onSelect({ ...option }, isChecked);
  };

  return (
    <li className={styles.listItem}>
      <label htmlFor={option.id} className={styles.option}>
        <input
          type="checkbox"
          id={option.id}
          checked={isChecked}
          onChange={(e) => handleCheckbox(e, option)}
          className={styles.checkbox}
        />
        <span>{option.name}</span>
      </label>
    </li>
  );
};

export const CustomSelect = (props: SelectProps<Product>) => {
  const [searchValue, setSearchValue] = useState<string>("");
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [showAddProduct, setShowAddProduct] = useState<boolean>(false);
  const { theme } = useContext(ThemeContext);
  const { options, onSelect, selectedOptions } = props;

  const filteredOptions = useMemo(() => {
    return options?.filter((el: Product) => el.name.includes(searchValue));
  }, [searchValue, options]);

  const handleSearch = (e: React.FormEvent<HTMLInputElement>) => {
    setIsExpanded(true);
    setSearchValue(e.currentTarget.value);
  };

  const handleClick = () => {
    setIsExpanded((prev) => !prev);

    if (searchValue && isExpanded) {
      setSearchValue("");
      setIsExpanded(true);
    }
  };

  return (
    <div
      className={styles.container}
      style={{
        borderColor:
          theme === "dark" ? "var(--primary-font)" : "var(--primary-bg)",
      }}
    >
      <div className={styles.search}>
        <input
          type="text"
          className={styles.input}
          value={searchValue}
          onChange={handleSearch}
          placeholder="Wybierz z listy..."
        />
        {!isExpanded ? (
          <MdExpandMore className={styles.arrow} onClick={handleClick} />
        ) : (
          <MdExpandLess className={styles.arrow} onClick={handleClick} />
        )}
      </div>

      {isExpanded && (
        <ul className={styles.list}>
          {!showAddProduct && (
            <li>
              <button
                type="button"
                className={styles.addProductBtn}
                onClick={() => setShowAddProduct((prev) => !prev)}
              >
                <AiOutlinePlus />
                Dodaj produkt
              </button>
            </li>
          )}
          {showAddProduct && <AddProductForm />}
          {filteredOptions?.map((el: Product) => {
            return (
              <Option
                option={el}
                isSelected={
                  selectedOptions.find((opt) => opt.id === el.id) ? true : false
                }
                onSelect={onSelect}
                key={el.id}
              />
            );
          })}
        </ul>
      )}
    </div>
  );
};
