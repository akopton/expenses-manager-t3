import { api } from "~/utils/api";
import { Prisma, Product } from "@prisma/client";
import styles from "./select.module.css";
import { useMemo, useState } from "react";

const product = Prisma.validator<Prisma.ProductArgs>()({});
type TProduct = Prisma.ProductGetPayload<typeof product>;

type SelectProps = {
  data: TProduct[];
  onSelect: (isChecked: boolean, item: Product) => void;
};

type OptionProps = {
  item: Product;
  onSelect: (isChecked: boolean, item: Product) => void;
};

const Option = (props: OptionProps) => {
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const { item, onSelect } = props;

  const handleCheckbox = (
    e: React.FormEvent<HTMLInputElement>,
    item: Product
  ) => {
    const isChecked = e.currentTarget.checked;
    setIsChecked(isChecked);
    onSelect(isChecked, item);
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

export const CustomSelect = (props: SelectProps) => {
  const [searchValue, setSearchValue] = useState<string>("");
  const { data, onSelect } = props;

  const newData = useMemo(() => {
    return data.filter((el: Product) => el.name.includes(searchValue));
  }, [searchValue]);

  const handleSearch = (e: React.FormEvent<HTMLInputElement>) => {
    setSearchValue(e.currentTarget.value);
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
          return <Option item={el} onSelect={onSelect} key={el.id} />;
        })}
      </ul>
    </div>
  );
};
