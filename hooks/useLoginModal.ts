import { create } from "zustand";

interface LoginModalStore {
  isOpen?: boolean;
  onOpen: () => void;
  onClose: () => void;
}

//tạo 1 hook để control login modal
const useLoginModal = create<LoginModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useLoginModal;
