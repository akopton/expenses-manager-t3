import { Prisma, type Product } from "@prisma/client";
import React, { Key, KeyboardEventHandler, useMemo, useState } from "react";
import { MdExpandMore } from "react-icons/md";
import styles from "./select.module.css";

const product = Prisma.validator<Prisma.ProductArgs>()({});
type TProduct = Prisma.ProductGetPayload<typeof product>;

type SelectProps<T> = {
  data: TProduct[];
  onSelect: (opt: T, isChecked: boolean) => void;
  selectedOptions: T[];
};

type OptionProps<T> = {
  item: T;
  onSelect: (opt: T, isChecked: boolean) => void;
  isSelected: boolean | undefined;
};

const Option = (props: OptionProps<Product>) => {
  const { item, isSelected, onSelect } = props;
  const [isChecked, setIsChecked] = useState<boolean>(
    isSelected ? isSelected : false
  );

  const handleCheckbox = (
    e: React.FormEvent<HTMLInputElement>,
    item: Product
  ) => {
    const isChecked = e.currentTarget.checked;
    setIsChecked(isChecked);
    onSelect({ ...item }, isChecked);
  };

  return (
    <li className={styles.listItem}>
      <label htmlFor={item.id} className={styles.option}>
        <input
          type="checkbox"
          id={item.id}
          checked={isChecked}
          onChange={(e) => handleCheckbox(e, item)}
          className={styles.checkbox}
        />
        {item.name}
      </label>
    </li>
  );
};

export const CustomSelect = (props: SelectProps<Product>) => {
  const [searchValue, setSearchValue] = useState<string>("");
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const { data, onSelect, selectedOptions } = props;

  const filteredOptions = useMemo(() => {
    return data.filter((el: Product) => el.name.includes(searchValue));
  }, [searchValue, data]);

  const handleSearch = (e: React.FormEvent<HTMLInputElement>) => {
    setIsExpanded(true);
    setSearchValue(e.currentTarget.value);
  };

  return (
    <div className={styles.container}>
      <div className={styles.search}>
        <input
          type="text"
          className={styles.input}
          value={searchValue}
          onChange={handleSearch}
        />
        <MdExpandMore
          className={styles.arrow}
          onClick={() => setIsExpanded((prev) => !prev)}
        />
      </div>
      {isExpanded && (
        <ul className={styles.list}>
          {filteredOptions.map((el: Product) => {
            return (
              <Option
                item={el}
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
