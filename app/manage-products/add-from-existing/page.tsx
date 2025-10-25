"use client";
import React, { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useAuth } from "@/context/AuthContext";
import { useExistingProduct } from "@/apis/queries/product.queries";
import { useMe } from "@/apis/queries/user.queries";
import { useToast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Plus, Copy, ArrowLeft, Eye, X } from "lucide-react";
import { withActiveUserGuard } from "@/components/shared/withRouteGuard";

const AddFromExistingProductPage = () => {
  const t = useTranslations();
  const { langDir } = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  const me = useMe();
  
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [showProductPopup, setShowProductPopup] = useState(false);
  const [shouldSearch, setShouldSearch] = useState(false);

  const { data: searchData, refetch: searchProducts, isError, error } = useExistingProduct(
    {
      page: 1,
      limit: 10,
      term: searchTerm,
      brandAddedBy: me.data?.data?.id,
    },
    shouldSearch && searchTerm.trim().length >= 3
  );

  const handleAddNewProduct = () => {
    router.push("/product");
  };

  const handleSearch = useCallback(() => {
    if (!searchTerm.trim()) {
      toast({
        title: t("please_enter_product_name"),
        description: t("search_term_too_short"),
        variant: "destructive",
      });
      return;
    }

    if (searchTerm.trim().length < 3) {
      toast({
        title: t("search_term_too_short"),
        description: t("search_term_too_short"),
        variant: "destructive",
      });
      return;
    }

    // Enable search and trigger the query
    setShouldSearch(true);
    setIsSearching(true);
  }, [searchTerm, toast, t]);

  const handleSelectProduct = (product: any) => {
    console.log('Selected product for copy:', product);
    console.log('Product ID:', product.id);
    console.log('Product Name:', product.productName);
    console.log('Product Images:', product.existingProductImages);
    router.push(`/product?copy=${product.id}`);
  };

  const handleViewProduct = (product: any) => {
    setSelectedProduct(product);
    setShowProductPopup(true);
  };

  const closeProductPopup = () => {
    setShowProductPopup(false);
    setSelectedProduct(null);
  };

  // Handle search results from the query
  useEffect(() => {
    if (isError) {
      console.error('Search error:', error);
      toast({
        title: t("search_failed"),
        description: t("search_failed"),
        variant: "destructive",
      });
      setIsSearching(false);
      setSearchResults([]);
    } else if (searchData?.data) {
      console.log('Search results from query:', searchData.data);
      setSearchResults(searchData.data);
      setIsSearching(false);
    } else if (searchTerm.trim().length >= 3) {
      setIsSearching(false);
      setSearchResults([]);
    }
  }, [searchData, searchTerm, isError, error, toast, t]);


  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                onClick={() => router.back()}
                className="p-2 hover:bg-gray-100"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
              </Button>
              <h1 className="text-3xl font-bold text-gray-900">
                {t("add_product")}
              </h1>
            </div>
            
            {/* Add New Product Button */}
            <Button
              onClick={handleAddNewProduct}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              <Plus className="h-4 w-4 mr-2" />
              {t("add_new_product")}
            </Button>
          </div>
        </div>

        {/* Search Section */}
        <div className="bg-white rounded-lg shadow-xs p-6 mb-6">
          <div className="mb-4">
            <p className="text-sm text-gray-600 mb-3" dir={langDir}>
              {t("search_existing_product_description")}
            </p>
            <div className="flex gap-2">
              <Input
                type="text"
                placeholder={t("enter_product_name")}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                className="flex-1"
                dir={langDir}
              />
              <Button onClick={handleSearch} disabled={isSearching}>
                <Search className="h-4 w-4 mr-2" />
                {isSearching ? t("searching") : t("search")}
              </Button>
            </div>
          </div>

          {/* Search Results */}
          {searchResults.length > 0 && (
            <div className="space-y-3">
              <h4 className="font-medium text-gray-900" dir={langDir}>
                {t("search_results")}
              </h4>
              <div className="max-h-60 overflow-y-auto space-y-2">
                {searchResults.map((product) => (
                  <div
                    key={product.id}
                    className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50"
                  >
                    <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                      {product.existingProductImages?.[0]?.image ? (
                        <Image
                          src={product.existingProductImages[0].image}
                          alt={product.productName}
                          width={48}
                          height={48}
                          className="rounded-lg object-cover"
                        />
                      ) : (
                        <Copy className="h-6 w-6 text-gray-400" />
                      )}
                    </div>
                    <div className="flex-1">
                      <h5 className="font-medium text-gray-900" dir={langDir}>
                        {product.productName}
                      </h5>
                      <p className="text-xs text-gray-400" dir={langDir}>
                        {product.category?.name} • {product.brand?.brandName}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleViewProduct(product)}
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        {t("view")}
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleSelectProduct(product)}
                      >
                        <Copy className="h-4 w-4 mr-2" />
                        {t("select")}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* No Results Found */}
          {searchTerm && searchResults.length === 0 && !isSearching && (
            <div className="text-center py-8">
              <p className="text-gray-500 mb-2" dir={langDir}>
                {t("no_products_found")}
              </p>
              <p className="text-sm text-gray-400" dir={langDir}>
                {t("try_different_search_term")}
              </p>
            </div>
          )}

          {/* Initial State */}
          {!searchTerm && searchResults.length === 0 && (
            <div className="text-center py-8">
              <div className="bg-gray-50 rounded-lg p-8 border-2 border-dashed border-gray-200">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="h-8 w-8 text-gray-400" />
                </div>
                <p className="text-gray-500 mb-2" dir={langDir}>
                  {t("search_existing_product_description")}
                </p>
                <p className="text-sm text-gray-400" dir={langDir}>
                  {t("enter_product_name_to_search")}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Product Details Popup */}
      {showProductPopup && selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Popup Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900" dir={langDir}>
                {t("product_details")}
              </h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={closeProductPopup}
                className="p-2 hover:bg-gray-100"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            {/* Popup Content */}
            <div className="p-6">
              {/* Product Images */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-900 mb-3" dir={langDir}>
                  {t("product_images")}
                </h4>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {selectedProduct.existingProductImages && selectedProduct.existingProductImages.length > 0 ? (
                    selectedProduct.existingProductImages.map((image: any, index: number) => (
                      <div key={index} className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                        <Image
                          src={image.image}
                          alt={`${selectedProduct.productName} - Image ${index + 1}`}
                          width={200}
                          height={200}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))
                  ) : (
                    <div className="col-span-full text-center py-8 text-gray-500">
                      {t("no_images_available")}
                    </div>
                  )}
                </div>
              </div>

              {/* Product Information */}
              <div className="space-y-4">
                <div>
                  {/* <h4 className="font-medium text-gray-900 mb-3" dir={langDir}>
                    {t("product_information")}
                  </h4> */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-600" dir={langDir}>
                        {t("product_name")}
                      </label>
                      <p className="text-gray-900 mt-1" dir={langDir}>
                        {selectedProduct.productName}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600" dir={langDir}>
                        {t("category")}
                      </label>
                      <p className="text-gray-900 mt-1" dir={langDir}>
                        {selectedProduct.category?.name || t("not_specified")}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600" dir={langDir}>
                        {t("brand")}
                      </label>
                      <p className="text-gray-900 mt-1" dir={langDir}>
                        {selectedProduct.brand?.brandName || t("not_specified")}
                      </p>
                    </div>
                    {/* <div>
                      <label className="text-sm font-medium text-gray-600" dir={langDir}>
                        {t("product_id")}
                      </label>
                      <p className="text-gray-900 mt-1 font-mono">
                        {selectedProduct.id}
                      </p>
                    </div> */}
                  </div>
                </div>

                {/* Short Description */}
                {selectedProduct.shortDescription && (
                  <div>
                    <label className="text-sm font-medium text-gray-600" dir={langDir}>
                      {t("short_description")}
                    </label>
                    <p className="text-gray-900 mt-1" dir={langDir}>
                      {selectedProduct.shortDescription}
                    </p>
                  </div>
                )}

                {/* Full Description */}
                {selectedProduct.description && (
                  <div>
                    <label className="text-sm font-medium text-gray-600" dir={langDir}>
                      {t("description_and_specification")}
                    </label>
                    <p className="text-gray-900 mt-1" dir={langDir}>
                      {(() => {
                        try {
                          const desc = typeof selectedProduct.description === 'string' 
                            ? JSON.parse(selectedProduct.description) 
                            : selectedProduct.description;
                          
                          if (Array.isArray(desc)) {
                            const textContent = desc
                              .filter(item => item.type === 'p' && item.children)
                              .flatMap(item => item.children)
                              .map(child => child.text)
                              .join(' ');
                            return textContent || 'No description available';
                          }
                          
                          return selectedProduct.description;
                        } catch (error) {
                          return selectedProduct.description;
                        }
                      })()}
                    </p>
                  </div>
                )}

                {/* Additional Details */}
                {selectedProduct.specifications && (
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3" dir={langDir}>
                      {t("specifications")}
                    </h4>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <pre className="text-sm text-gray-700 whitespace-pre-wrap" dir={langDir}>
                        {JSON.stringify(selectedProduct.specifications, null, 2)}
                      </pre>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Popup Footer */}
            <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200">
              <Button variant="outline" onClick={closeProductPopup}>
                {t("close")}
              </Button>
              <Button 
                onClick={() => {
                  closeProductPopup();
                  handleSelectProduct(selectedProduct);
                }}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                <Copy className="h-4 w-4 mr-2" />
                {t("select")}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default withActiveUserGuard(AddFromExistingProductPage);
