import type { Bill, User } from "@prisma/client";
import { CustomSelect } from "../CustomSelect/CustomSelect";
import styles from "./form.module.css";
import { api } from "~/utils/api";
import React, { useState } from "react";
import { AiOutlineCheck, AiOutlineClose } from "react-icons/ai";

type FormProps = {
  onSubmit: (
    name: string,
    selectedBills?: Bill[],
    selectedUsers?: User[]
  ) => Promise<void>;
};

export const AddSetForm = (props: FormProps) => {
  const [showForm, setShowForm] = useState<boolean>(false);
  const [showSelect, setShowSelect] = useState<boolean>(false);
  const [showUsers, setShowUsers] = useState<boolean>(false);

  const [name, setName] = useState<string>("");
  const [selectedBills, setSelectedBills] = useState<Bill[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);

  const bills = api.bills.getBills.useQuery();
  const users = api.users.getUsers.useQuery();
  const { onSubmit } = props;

  const handleUsers = (user: User) => {
    setSelectedUsers((prev) => {
      return prev.includes(user)
        ? prev.filter((el) => el.id !== user.id)
        : [...prev, user];
    });
  };

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

    if (selectedBills.length > 0 && selectedUsers.length > 0) {
      await onSubmit(name, selectedBills, selectedUsers);
    }

    if (selectedBills.length > 0 && selectedUsers.length < 1) {
      await onSubmit(name, selectedBills);
    }

    if (selectedBills.length < 1 && selectedUsers.length > 0) {
      await onSubmit(name, undefined, selectedUsers);
    }

    if (selectedBills.length < 1 && selectedUsers.length < 1) {
      await onSubmit(name);
    }

    closeForm();
  };

  const reset = () => {
    setName("");
    setSelectedBills([]);
    setSelectedUsers([]);
  };

  const closeForm = () => {
    reset();
    setShowForm(false);
    setShowSelect(false);
    setShowUsers(false);
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

      {showUsers ? (
        <div className={styles.select}>
          <button
            type="button"
            className={styles.submitBtn}
            onClick={() => setShowUsers(false)}
          >
            Zamknij
          </button>

          <ul className={styles.usersList}>
            {users.data &&
              users.data.map((user) => {
                if (selectedUsers.includes(user)) {
                  return (
                    <li
                      key={user.id}
                      className={styles.userItem}
                      onClick={() => handleUsers(user)}
                    >
                      {user.name}{" "}
                      <AiOutlineCheck className={styles.userCheck} />
                    </li>
                  );
                } else {
                  return (
                    <li
                      key={user.id}
                      className={styles.userItem}
                      onClick={() => handleUsers(user)}
                    >
                      {user.name}
                    </li>
                  );
                }
              })}
          </ul>
        </div>
      ) : (
        <button
          type="button"
          className={styles.submitBtn}
          onClick={() => setShowUsers(true)}
        >
          Zaproś
        </button>
      )}

      <button type="submit" className={styles.submitBtn} onClick={handleSubmit}>
        Stwórz zestaw
      </button>
    </form>
  );
};
