export interface ICreateProductRequest {
  productName: string;
  categoryId: number;
  subCategoryId: number;
  brandId: number;
  skuNo: string;
  productTagList?: Array<{
    tagId: number;
  }>;
  productImagesList?: Array<{
    imageName: string;
    image: string;
  }>;
  placeOfOriginId: number;
  productPrice: number;
  offerPrice: number;
  description: string;
  specification: string;
}

export interface ICreateProduct {
  data: any;
  status: boolean;
  message: string;
}
