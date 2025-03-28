export interface CartItem {
  id: number;
  productId: number;
  productPriceId: number;
  productPriceDetails: {
    offerPrice: string;
    productPrice_product: {
      productName: string;
      offerPrice: string;
      productImages: { id: number; image: string }[];
    };
    consumerDiscount: number;
    minQuantityPerCustomer?: number;
    maxQuantityPerCustomer?: number;
  };
  quantity: number;
}
