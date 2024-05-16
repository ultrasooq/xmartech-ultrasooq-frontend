export interface APIResponseError {
  message: string;
  status: boolean;
  data: any;
  response?: any;
}

export interface ICountries {
  id: number;
  countryName: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  status: string;
}

export interface ILocations {
  id: number;
  locationName: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  status: string;
}

export interface IBrands {
  id: number;
  brandName: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  status: string;
}

export interface ISelectOptions {
  label: string;
  value: number;
  children: any[];
}

export interface IRenderProduct {
  id: number;
  productImage: string;
  productName: string;
  categoryName: string;
  skuNo: string;
  brandName: string;
  productPrice: string;
  status?: string;
  productProductPriceId?: number;
  productProductPrice?: string;
}

export type OptionProps = {
  label: string;
  value: string;
};

export interface TrendingProduct {
  id: number;
  productName: string;
  productPrice: number;
  offerPrice: number;
  productImage: string;
  categoryName: string;
  brandName: string;
  skuNo: string;
  shortDescription: string;
  productReview: {
    rating: number;
  }[];
  status: string;
  productWishlist?: any[];
  inWishlist?: boolean;
  productProductPriceId?: number;
  productProductPrice?: string;
}

export type ProductImageProps = {
  path: string;
  id: string;
};

export interface ControlledSelectOptions extends OptionProps {
  icon?: string;
}
