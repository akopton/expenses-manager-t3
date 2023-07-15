import { Bill } from "@prisma/client";
import { CustomSelect } from "../CustomSelect/CustomSelect";
import styles from "./form.module.css";
import { api } from "~/utils/api";
import React, { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";

type FormProps = {
  onSubmit: (
    e: React.FormEvent,
    name: string,
    selectedBills: Bill[]
  ) => Promise<void>;
};

export const AddSetForm = (props: FormProps) => {
  const [showForm, setShowForm] = useState<boolean>(false);
  const [showSelect, setShowSelect] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [selectedBills, setSelectedBills] = useState<Bill[]>([]);
  const bills = api.bills.getBills.useQuery();
  const addNewSet = api.billSets.addNewSetReturnAll.useMutation();
  const { onSubmit } = props;
  const handleSelect = (opt: Bill, isChecked: boolean) => {
    isChecked
      ? setSelectedBills((prev) => [...prev, opt])
      : setSelectedBills((prev) => prev.filter((el) => el.id !== opt.id));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.currentTarget.value;
    setName(name);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) return;
    await onSubmit(e, name, selectedBills);
    reset();
  };

  const reset = () => {
    setName("");
    setSelectedBills([]);
  };

  const closeForm = () => {
    reset();
    setShowForm(false);
  };

  if (!showForm) {
    return (
      <button onClick={() => setShowForm(true)} className={styles.showFormBtn}>
        Nowy zestaw
      </button>
    );
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <button type="button" className={styles.closeFormBtn} onClick={closeForm}>
        <AiOutlineClose />
      </button>
      <label htmlFor="set-name" className={styles.inputWrapper}>
        <span className={styles.inputTitle}>Nazwa zestawu</span>
        <input
          id="set-name"
          type="text"
          className={styles.input}
          placeholder="Zestaw 1"
          value={name}
          onChange={handleChange}
        />
      </label>

      {showSelect ? (
        <div className={styles.select}>
          <button
            type="button"
            className={styles.submitBtn}
            onClick={() => setShowSelect(false)}
          >
            Zamknij
          </button>
          {bills.data && (
            <CustomSelect<Bill>
              options={bills.data}
              onSelect={handleSelect}
              selectedOptions={selectedBills}
            />
          )}
        </div>
      ) : (
        <button
          type="button"
          className={styles.submitBtn}
          onClick={() => setShowSelect(true)}
        >
          Dodaj rachunki
        </button>
      )}
      {selectedBills.length > 0 && (
        <span className={styles.selectedBillsCount}>
          Ilość rachunków: {selectedBills.length}
          <div className={styles.selectedBillsTooltip}>
            <div className={styles.tooltipArrow}></div>
            <ul className={styles.selectedBillsList}>
              {selectedBills.map((el) => (
                <li key={el.id}>{el.name}</li>
              ))}
            </ul>
          </div>
        </span>
      )}

      <button type="submit" className={styles.submitBtn} onClick={handleSubmit}>
        Stwórz zestaw
      </button>
    </form>
  );
};
