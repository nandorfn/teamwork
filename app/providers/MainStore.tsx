"use client";

import { type ReactNode, createContext, useRef, useContext } from "react";
import { type StoreApi, useStore } from "zustand";

import { type MainStore, createMainStore } from "../store/store";

export const MainStoreContext = createContext<StoreApi<MainStore> | null>(
  null,
);

export interface MainStoreProviderProps {
  children: ReactNode
}

export const MainStoreProvider = ({
  children,
}: MainStoreProviderProps) => {
  const storeRef = useRef<StoreApi<MainStore>>();
  if (!storeRef.current) {
    storeRef.current = createMainStore();
  }

  return (
    <MainStoreContext.Provider value={storeRef.current}>
      {children}
    </MainStoreContext.Provider>
  );
};

export const useMainStore = <T,>(
  selector: (store: MainStore) => T,
): T => {
  const mainStoreContext = useContext(MainStoreContext);

  if (!mainStoreContext) {
    throw new Error("useCounterStore must be use within CounterStoreProvider");
  }

  return useStore(mainStoreContext, selector);
};
