/**
 * @fileoverview Category connection checking utility for the Ultrasooq marketplace.
 *
 * Determines whether a vendor's business categories are linked to a
 * product's category through direct connections, direct ID match, or
 * category hierarchy path traversal. This is used to enforce that
 * vendors can only price products within their registered business
 * categories.
 *
 * @module utils/categoryConnection
 * @dependencies None (pure function).
 */

/**
 * Checks if a vendor's business category is connected to a product's category.
 *
 * @description
 * Intent: Validates that a vendor is authorized to sell/price a product
 * based on category relationships. Uses a multi-strategy approach:
 *
 * 1. **Direct Connection** -- Checks the `categoryConnections` array for
 *    a `connectTo` ID that matches any of the vendor's business category IDs.
 * 2. **Direct Match** -- Falls back to checking if the product's category
 *    ID directly matches a vendor business category.
 * 3. **Category Path** -- If connections are unavailable, parses the
 *    product's `categoryLocation` path (comma or slash separated) and
 *    checks for any overlap with vendor category IDs.
 *
 * Usage: Called before allowing a vendor to add a price to a product,
 * or to filter product lists to only show category-eligible items.
 *
 * Data Flow: Vendor business category IDs + product category data ->
 * boolean authorization result.
 *
 * @param {number[]} vendorBusinessCategoryIds - Array of the vendor's business category IDs.
 * @param {number} productCategoryId - The product's category ID.
 * @param {string} [productCategoryLocation] - Optional category hierarchy path (e.g., "4,12,45").
 * @param {any[]} [categoryConnections] - Optional array of category connection objects from the API.
 * @returns {boolean} True if the vendor is connected to the product's category.
 */
export const checkCategoryConnection = (
  vendorBusinessCategoryIds: number[],
  productCategoryId: number,
  productCategoryLocation?: string,
  categoryConnections?: any[]
): boolean => {
  if (!vendorBusinessCategoryIds?.length || !productCategoryId) {
    return false;
  }

  // Check direct connection via categoryConnections
  // categoryConnections contains connections FROM the product's category TO business categories
  if (categoryConnections?.length) {
    const isConnected = categoryConnections.some((connection: any) => {
      // Try multiple ways to get the connectTo ID
      const connectToId = 
        connection.connectTo || 
        connection.connectToDetail?.id ||
        connection.connectToId;
      
      if (!connectToId) return false;
      
      // Check if this connection's connectTo matches any of the vendor's business category IDs
      const connectToIdNum = Number(connectToId);
      const matches = vendorBusinessCategoryIds.includes(connectToIdNum);
      
      return matches;
    });
    if (isConnected) {
      return true;
    }
  }

  // Fallback: Check if productCategoryId directly matches any vendor business category
  // This handles the case where the product category itself is a business category
  if (vendorBusinessCategoryIds.includes(Number(productCategoryId))) {
    return true;
  }

  // If categoryConnections not available, check via categoryLocation
  // This is a fallback - ideally categoryConnections should be provided
  if (productCategoryLocation && vendorBusinessCategoryIds.length > 0) {
    // Handle both comma-separated and slash-separated paths
    const categoryPath = productCategoryLocation
      .split(/[,\/]/)
      .map(Number)
      .filter(Boolean);
    
    // Check if any vendor business category ID is in the product's category path
    const hasMatch = vendorBusinessCategoryIds.some((vendorCatId) =>
      categoryPath.includes(vendorCatId)
    );
    if (hasMatch) {
      return true;
    }
  }

  return false;
};

