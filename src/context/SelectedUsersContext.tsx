import { User } from "@prisma/client";
import { useEffect, useState } from "react";
import { createContext } from "react";

type ContextProps = {
  selectedUsers: User[];
  addUser: (user: User) => void;
  removeUser: (user: User) => void;
};

const initialContext: ContextProps = {
  selectedUsers: [],
  addUser: (user: User) => {},
  removeUser: (user: User) => {},
};

export const SelectedUsersContext = createContext(initialContext);

export const SelectedUsersProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);

  const addUser = (user: User) => {
    setSelectedUsers((prev) => {
      if (prev.map((el) => el.id).includes(user.id)) {
        return prev;
      }
      return [...prev, user];
    });
  };

  const removeUser = (user: User) => {
    setSelectedUsers((prev) => prev.filter((el) => el.id !== user.id));
  };

  useEffect(() => {
    console.log(selectedUsers);
  }, [selectedUsers]);

  return (
    <SelectedUsersContext.Provider
      value={{ selectedUsers, addUser, removeUser }}
    >
      {children}
    </SelectedUsersContext.Provider>
  );
};
