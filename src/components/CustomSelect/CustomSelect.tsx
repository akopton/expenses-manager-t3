import { type Product } from "@prisma/client";
import React, { useMemo, useState } from "react";
import { MdExpandLess, MdExpandMore } from "react-icons/md";
import styles from "./select.module.css";

type SelectProps<T> = {
  options: T[];
  onSelect: (opt: T, isChecked: boolean) => void;
  selectedOptions: T[];
};

type OptionProps<T> = {
  option: T;
  onSelect: (opt: T, isChecked: boolean) => void;
  isSelected: boolean;
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
        {option.name}
      </label>
    </li>
  );
};

export const CustomSelect = (props: SelectProps<Product>) => {
  const [searchValue, setSearchValue] = useState<string>("");
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const { options, onSelect, selectedOptions } = props;

  const filteredOptions = useMemo(() => {
    return options.filter((el: Product) => el.name.includes(searchValue));
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
    <div className={styles.container}>
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
          {filteredOptions.map((el: Product) => {
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
