import { User } from "@prisma/client";
import { api } from "~/utils/api";
import { AiOutlineClose, AiOutlineCheckCircle } from "react-icons/ai";
import { ThemeContext } from "~/context/ThemeContext";
import { useContext, useState } from "react";
import { useSearch } from "~/hooks/useSearch";
import styles from "./list.module.css";
import { ShoppingListContext } from "~/context/ShoppingListContext";

type ListProps = {
  closeList: () => void;
  show: boolean;
};

type UserProps = User & {
  selected?: boolean;
};

const User = (props: UserProps) => {
  const { selected, ...rest } = props;
  const { selectedUsers, addUser, removeUser } =
    useContext(ShoppingListContext);

  const user = { ...rest };

  const handleClick = () => {
    if (selectedUsers.map((el) => el.id).includes(user.id)) {
      removeUser(user);
    } else {
      addUser(user);
    }
  };

  return (
    <li>
      <button type="button" onClick={handleClick} className={styles.listItem}>
        <span>{props.name}</span>
        <span>{selected ? <AiOutlineCheckCircle /> : null}</span>
      </button>
    </li>
  );
};

export const UsersList = (props: ListProps) => {
  const [searchValue, setSearchValue] = useState("");

  const users = api.users.getUsersButCurrent.useQuery();

  const { closeList, show } = props;
  const { theme } = useContext(ThemeContext);
  const { selectedUsers } = useContext(ShoppingListContext);
  const { filteredData } = useSearch(users.data, searchValue);

  return (
    <div>
      <ul
        className={styles.list}
        style={{
          transform: show ? "translateY(0)" : "translateY(105%)",
          boxShadow:
            theme === "dark"
              ? "0 0 4px var(--primary-font)"
              : "0 0 4px var(--primary-bg)",
        }}
      >
        <div className={styles.topWrap}>
          <input
            type="text"
            className={styles.input}
            placeholder="Znajdź użytkownika..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <button type="button" className={styles.closeBtn} onClick={closeList}>
            <AiOutlineClose />
          </button>
        </div>
        {filteredData &&
          filteredData.map((user) => {
            if (selectedUsers.map((user) => user.id).includes(user.id)) {
              return <User {...user} key={user.id} selected />;
            } else {
              return <User {...user} key={user.id} />;
            }
          })}
      </ul>
    </div>
  );
};
