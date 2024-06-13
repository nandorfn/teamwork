import { createStore } from "zustand/vanilla";

export type StoreState = {
  modal: boolean,
  data: any,
}

export type StoreActions = {
  setModal: (newData: boolean) => void,
  setData: (newData: any) => void
}

export type MainStore = StoreState & StoreActions

export const defaultInitState: StoreState = {
  modal: false,
  data: null,
};

export const createMainStore = (
  initState: StoreState = defaultInitState,
) => {
  return createStore<MainStore>()((set) => ({
    ...initState,
    setModal: (newData) => set((state) => ({ modal: newData})),
    setData: (newData) => set((state) => ({ data: newData }))
  }));
};
