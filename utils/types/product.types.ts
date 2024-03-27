export interface ICreateProductRequest {
  productName: string;
  productCategory: string;
  productSubCategory: string;
  brand: string;
  skuNo: string;
  tagList: undefined;
  productPrice: string;
  offerPrice: string;
  colorList: undefined;
  functionList: undefined;
  placeOfOrigin: string;
  style: string;
  batteryLife: string;
  screen: string;
  memorySize: string;
  modelNumber: string;
  brandName: string;
  detailsAttribute: string;
  detailsValue: string;
}

export interface ICreateProduct {
  data: any;
  status: boolean;
  message: string;
  error?: string;
}
