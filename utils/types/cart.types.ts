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
    consumerDiscountType?: string;
    vendorDiscount: number;
    vendorDiscountType?: string;
    minQuantityPerCustomer?: number;
    maxQuantityPerCustomer?: number;
  };
  quantity: number;
  object: any;
}
