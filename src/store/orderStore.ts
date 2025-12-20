import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface OrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  subtotal: number;
}

interface OrderAddress {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface Order {
  orderId: string;
  customerName: string;
  email: string;
  phone: string;
  address: OrderAddress;
  items: OrderItem[];
  orderSummary: {
    subtotal: number;
    discount: number;
    gst: number;
    total: number;
  };
  paymentStatus: string;
  orderDate: string;
  paymentMethod: string;
  status?: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
}

interface OrderState {
  orders: Order[];
  addOrder: (order: Order) => void;
  getOrder: (orderId: string) => Order | undefined;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;
  clearOrders: () => void;
}

export const useOrderStore = create<OrderState>()(
  persist(
    (set, get) => ({
      orders: [],
      
      addOrder: (order) => 
        set((state) => ({
          orders: [...state.orders, { ...order, status: 'pending' }],
        })),
      
      getOrder: (orderId) => 
        get().orders.find((order) => order.orderId === orderId),
      
      updateOrderStatus: (orderId, status) =>
        set((state) => ({
          orders: state.orders.map((order) =>
            order.orderId === orderId ? { ...order, status } : order
          ),
        })),
      
      clearOrders: () => set({ orders: [] }),
    }),
    {
      name: 'animeverse-orders',
    }
  )
);
