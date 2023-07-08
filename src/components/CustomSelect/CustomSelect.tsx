import { Prisma, type Product } from "@prisma/client";
import styles from "./select.module.css";
import { useMemo, useState } from "react";

const product = Prisma.validator<Prisma.ProductArgs>()({});
type TProduct = Prisma.ProductGetPayload<typeof product>;

type SelectProps<T> = {
  data: TProduct[];
  onSelect: (opt: T, isChecked: boolean) => void;
  selectedOptions: T[];
};

type OptionProps = {
  item: Product;
  onSelect: (opt: Product, isChecked: boolean) => void;
  isSelected: boolean | undefined;
};

const Option = (props: OptionProps) => {
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
    <div className={styles.listItem}>
      <label htmlFor={item.id}>
        <input
          type="checkbox"
          id={item.id}
          checked={isChecked}
          onChange={(e) => handleCheckbox(e, item)}
        />
        {item.name}
      </label>
    </div>
  );
};

export const CustomSelect = (props: SelectProps<Product>) => {
  const [searchValue, setSearchValue] = useState<string>("");
  const { data, onSelect, selectedOptions } = props;

  const newData = useMemo(() => {
    return data.filter((el: Product) => el.name.includes(searchValue));
  }, [searchValue, data]);

  const handleSearch = (e: React.FormEvent<HTMLInputElement>) => {
    setSearchValue(e.currentTarget.value);
  };

  const handleSelectedOptions = (opt: Product, isChecked: boolean) => {
    onSelect(opt, isChecked);
  };

  return (
    <div className={styles.container}>
      <input
        type="text"
        className={styles.input}
        value={searchValue}
        onChange={handleSearch}
      />
      <ul className={styles.list}>
        {newData.map((el: Product) => {
          return (
            <Option
              item={el}
              isSelected={
                selectedOptions.find((opt) => opt.id === el.id) ? true : false
              }
              onSelect={handleSelectedOptions}
              key={el.id}
            />
          );
        })}
      </ul>
    </div>
  );
};
