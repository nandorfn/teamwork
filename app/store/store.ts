import { createStore } from "zustand/vanilla";

export type StoreState = {
  modal: boolean,
  data: any,
  user: {
    id: number,
    username: string,
  } | null
}

export type StoreActions = {
  setModal: (newData: boolean) => void,
  setData: (newData: any) => void,
  setUser: (newData: any) => void
}

export type MainStore = StoreState & StoreActions

export const defaultInitState: StoreState = {
  modal: false,
  data: null,
  user: null,
};

export const createMainStore = (
  initState: StoreState = defaultInitState,
) => {
  return createStore<MainStore>()((set) => ({
    ...initState,
    setModal: (newData) => set((state) => ({ modal: newData})),
    setData: (newData) => set((state) => ({ data: newData })),
    setUser: (newData) => set((state) => ({ user: newData }))
  }));
};
