import { create } from "zustand";
export const useAccountAddress = create((set) => ({
  accountAddress: "",
  updateAccountAddress: (address) => set(() => ({ accountAddress: address })),
  removeAccountAddress: () => set({ accountAddress: "" }),
}));
