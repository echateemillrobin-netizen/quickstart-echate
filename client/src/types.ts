export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
}

export interface Order {
  id: number;
  productId: number;
  quantity: number;
  totalPrice: number;
  createdAt: string;
}
