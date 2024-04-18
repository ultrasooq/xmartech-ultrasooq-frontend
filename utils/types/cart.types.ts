export interface CartItem {
  id: number;
  productId: number;
  productDetails: {
    productName: string;
    offerPrice: string;
    productImages: { id: number; image: string }[];
  };
  quantity: number;
}
