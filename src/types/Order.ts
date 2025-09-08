export interface Order {
  number: number;
  price: number;
  currency: string;
  itemName: string;
  amount: number;
  createdAt: number;
  shippedAt: number;
}
