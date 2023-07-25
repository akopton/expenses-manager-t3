import { User } from "@prisma/client";
import styles from "./list.module.css";
import { api } from "~/utils/api";

type ListProps = {
  closeList: () => void;
};

const User = (props: User) => {
  return <li>{props.name}</li>;
};

export const UsersList = (props: ListProps) => {
  const { closeList } = props;
  const users = api.users.getUsersButCurrent.useQuery();
  return (
    <ul onBlur={closeList}>
      <button type="button" onClick={closeList}>
        X
      </button>
      {users.data &&
        users.data.map((user) => {
          return <User {...user} key={user.id} />;
        })}
    </ul>
  );
};
