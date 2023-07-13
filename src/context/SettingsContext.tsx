// import { useSession } from "next-auth/react";
// import { createContext, useState, useEffect } from "react";
// import { api } from "~/utils/api";

// type TSettings = {};

// const settings: TSettings = {};

// export const SettingsContext = createContext(settings);

// export const SettingsProvider = ({
//   children,
// }: {
//   children: React.ReactNode;
// }) => {
//   const [settings, setSettings] = useState<TSettings>();
//   const session = useSession();
//   const userId = session.data?.user.id;
//   const userSettings = { data: {} };
//   //   api.settings.getSettings.useQuery({id: userId})

//   useEffect(() => {
//     setSettings(userSettings.data);
//   }, [settings]);

//   return (
//     <SettingsContext.Provider value={{ settings }}>
//       {children}
//     </SettingsContext.Provider>
//   );
// };
