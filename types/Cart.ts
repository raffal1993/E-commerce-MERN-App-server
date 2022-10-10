export interface Product {
      productId: string;
      quantity: number;
}

export interface CartSchema {
      userId: string;
      products?: Product[];
}
