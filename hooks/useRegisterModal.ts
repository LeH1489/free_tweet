import { create } from "zustand";

interface RegisterModalStore {
  isOpen?: boolean;
  onOpen: () => void;
  onClose: () => void;
}

//tạo 1 hook để control login modal
const useRegisterModal = create<RegisterModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useRegisterModal;
