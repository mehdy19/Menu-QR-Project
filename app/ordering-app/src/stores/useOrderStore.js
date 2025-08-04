import create from 'zustand';

const useOrderStore = create((set) => ({
  orderItems: [],
  addItem: (item) =>
    set((state) => {
      const existingItem = state.orderItems.find((i) => i.id === item.id);
      if (existingItem) {
        return {
          orderItems: state.orderItems.map((i) =>
            i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
          ),
        };
      }
      return { orderItems: [...state.orderItems, { ...item, quantity: 1 }] };
    }),
  removeItem: (itemId) =>
    set((state) => ({
      orderItems: state.orderItems.filter((i) => i.id !== itemId),
    })),
  updateQuantity: (itemId, quantity) =>
    set((state) => ({
      orderItems: state.orderItems.map((i) =>
        i.id === itemId ? { ...i, quantity } : i
      ),
    })),
  clearCart: () => set({ orderItems: [] }),
}));

export default useOrderStore;
