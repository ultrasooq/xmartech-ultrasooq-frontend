/**
 * @fileoverview Product CRUD type definitions for the Ultrasooq marketplace.
 *
 * Defines request and response shapes for creating, updating, and deleting
 * products. Product types include regular products ("P") and RFQ products
 * ("R").
 *
 * @module utils/types/product.types
 * @dependencies None (pure type definitions).
 */

/**
 * Request payload for creating a new product.
 *
 * @description
 * Intent: Captures all fields needed by the backend to create a product
 * listing including metadata, images, pricing, and content.
 *
 * Usage: Submitted from the product creation form by sellers.
 *
 * Data Flow: Product form -> mutation hook -> API POST /products.
 *
 * Notes: `productType` discriminates between regular ("P") and RFQ ("R")
 * products. Tags and images are optional arrays of nested objects.
 *
 * @property productType - "R" for RFQ product, "P" for regular product.
 * @property productName - Display name of the product.
 * @property categoryId - ID of the assigned product category.
 * @property brandId - ID of the product brand.
 * @property skuNo - Stock keeping unit number.
 * @property productTagList - Optional array of tag associations.
 * @property productImagesList - Optional array of image records with name and URL.
 * @property placeOfOriginId - ID of the product's place of origin.
 * @property productPrice - Original list price.
 * @property offerPrice - Discounted/offer price.
 * @property description - Full product description (may contain HTML/JSON).
 * @property specification - Product specification text (may contain HTML/JSON).
 * @property status - Whether the product listing is "ACTIVE" or "INACTIVE".
 */
export interface ICreateProductRequest {
  productType: "R" | "P";
  productName: string;
  categoryId: number;
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
  status: "ACTIVE" | "INACTIVE";
}

/**
 * Response payload from the create-product endpoint.
 *
 * @description
 * Intent: Standard response wrapper confirming product creation.
 *
 * Data Flow: API POST /products -> ICreateProduct.
 *
 * @property data - The created product data (generic shape).
 * @property status - Boolean success indicator.
 * @property message - Human-readable response message.
 */
export interface ICreateProduct {
  data: any;
  status: boolean;
  message: string;
}

/**
 * Request payload for deleting a product.
 *
 * @description
 * Intent: Identifies the product to delete by its string ID.
 *
 * Data Flow: Delete button -> mutation hook -> API DELETE /products/:id.
 *
 * @property productId - String ID of the product to delete.
 */
export interface IDeleteProductRequest {
  productId: string;
}

/**
 * Response payload from the delete-product endpoint.
 *
 * @description
 * Intent: Shares the same shape as {@link ICreateProduct} for consistency.
 *
 * @extends ICreateProduct
 */
export interface IDeleteProduct extends ICreateProduct {}

/**
 * Request payload for updating an existing product.
 *
 * @description
 * Intent: Extends the creation payload with the product's ID so the
 * backend knows which record to update.
 *
 * Data Flow: Product edit form -> mutation hook -> API PUT /products/:id.
 *
 * @extends ICreateProductRequest
 * @property productId - Numeric ID of the product to update.
 */
export interface IUpdateProductRequest extends ICreateProductRequest {
  productId: number;
}

/**
 * Response payload from the update-product endpoint.
 *
 * @description
 * Intent: Extends the standard product response with additional fields
 * for customized product pricing range.
 *
 * @extends ICreateProduct
 * @property customizeProductId - ID of any associated customized product record.
 * @property fromPrice - Lower bound of the price range.
 * @property toPrice - Upper bound of the price range.
 */
export interface IUpdateProduct extends ICreateProduct {
  customizeProductId: number;
  fromPrice: number;
  toPrice: number;
}
