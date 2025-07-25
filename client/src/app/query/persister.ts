import { get, set, del } from "idb-keyval";
import { type PersistedClient } from "@tanstack/react-query-persist-client";

export const createPersister = (key: IDBValidKey = "reactQuery") => {
  return {
    persistClient: async (client: PersistedClient) => {
      await set(key, client);
    },
    restoreClient: async () => {
      return await get<PersistedClient>(key);
    },
    removeClient: async () => {
      await del(key);
    },
  };
};
