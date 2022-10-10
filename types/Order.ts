export interface Product {
      productId: string;
      quantity: number;
}

export interface OrderSchema {
      userId: string;
      products?: Product[];
      amount: number;
      address: object;
      status: string;
}
