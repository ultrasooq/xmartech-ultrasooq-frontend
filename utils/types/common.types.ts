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
}

export interface IRenderProduct {
  id: number;
  productImage: string;
  productName: string;
  categoryName: string;
  skuNo: string;
  brandName: string;
  productPrice: string;
}
