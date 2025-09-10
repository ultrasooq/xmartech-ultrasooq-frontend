"use client";
import React, { useState, useMemo, useRef } from "react";
import { useTranslations } from "next-intl";
import { useAuth } from "@/context/AuthContext";
import { Building2, Package, Star, ChevronLeft, ChevronRight, ExternalLink, ChevronsLeft, ChevronsRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import ProductCard from "./ProductCard";
import { debounce } from "lodash";

type Vendor = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  profilePicture?: string;
  tradeRole: string;
  userProfile?: any[];
  productCount: number;
  averageRating?: number;
  location?: string;
  businessTypes?: string[];
};

type VendorsSectionProps = {
  vendors: Vendor[];
  isLoading?: boolean;
  products?: any[]; // Add products prop
};

const VendorsSection: React.FC<VendorsSectionProps> = ({ 
  vendors, 
  isLoading = false,
  products = []
}) => {
  const t = useTranslations();
  const { langDir } = useAuth();
  
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);

  // Debounced search
  const handleSearch = debounce((value: string) => {
    setSearchTerm(value);
  }, 300);

  // Filter vendors based on search term
  const filteredVendors = useMemo(() => {
    if (!searchTerm) return vendors;
    
    return vendors.filter(vendor => 
      `${vendor.firstName} ${vendor.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vendor.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vendor.tradeRole.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vendor.businessTypes?.some(type => 
        type.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [vendors, searchTerm]);

  // Pagination logic
  const totalPages = Math.ceil(filteredVendors.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedVendors = filteredVendors.slice(startIndex, endIndex);

  // Reset to first page when search term changes
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  // Group products by vendor
  const productsByVendor = useMemo(() => {
    const grouped: { [key: string]: any[] } = {};
    
    products.forEach(product => {
      if (product.vendorId) {
        if (!grouped[product.vendorId]) {
          grouped[product.vendorId] = [];
        }
        grouped[product.vendorId].push(product);
      }
    });
    
    return grouped;
  }, [products]);

  // Calculate summary statistics
  const totalVendors = vendors.length;
  const totalProducts = vendors.reduce((sum, vendor) => sum + vendor.productCount, 0);
  const averageRating = vendors.length > 0 
    ? vendors.reduce((sum, vendor) => sum + (vendor.averageRating || 0), 0) / vendors.length 
    : 0;

  if (isLoading) {
    return (
      <div className="py-12">
        <div className="w-full">
          <div className="mb-8">
            <div className="h-8 w-64 bg-gray-300 rounded animate-pulse mb-4"></div>
            <div className="h-4 w-96 bg-gray-300 rounded animate-pulse"></div>
          </div>
          <div className="space-y-8">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="h-12 w-12 bg-gray-300 rounded-full animate-pulse"></div>
                  <div className="space-y-2">
                    <div className="h-4 w-32 bg-gray-300 rounded animate-pulse"></div>
                    <div className="h-3 w-24 bg-gray-300 rounded animate-pulse"></div>
                  </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="h-32 bg-gray-300 rounded animate-pulse"></div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!vendors.length) {
    return (
      <div className="py-12">
        <div className="w-full text-center">
          <Building2 className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            {t("no_vendors_found")}
          </h3>
          <p className="text-gray-600">
            {t("no_vendors_available_description")}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="w-full">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {t("vendors")}
              </h2>
              <p className="text-gray-600">
                {t("discover_trusted_vendors_and_their_products")}
              </p>
            </div>
            <div className="mt-4 md:mt-0">
              <div className="relative">
                <Input
                  type="text"
                  placeholder={t("search_vendors")}
                  value={searchTerm}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="pl-10 w-64"
                  dir={langDir}
                />
                <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              </div>
            </div>
          </div>


        </div>

        {/* Vendors with Products */}
        <div className="space-y-8">
          {paginatedVendors.map((vendor) => {
            const vendorProducts = productsByVendor[vendor.id] || [];
            
            return (
              <VendorWithProducts
                key={vendor.id}
                vendor={vendor}
                products={vendorProducts}
              />
            );
          })}
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
            {/* Items per page selector */}
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-700">
                {t("show")}:
              </span>
              <Select
                value={itemsPerPage.toString()}
                onValueChange={(value) => {
                  setItemsPerPage(Number(value));
                  setCurrentPage(1);
                }}
              >
                <SelectTrigger className="w-20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="3">3</SelectItem>
                  <SelectItem value="6">6</SelectItem>
                  <SelectItem value="9">9</SelectItem>
                  <SelectItem value="12">12</SelectItem>
                </SelectContent>
              </Select>
              <span className="text-sm text-gray-700">
                {t("per_page")}
              </span>
            </div>

            {/* Pagination info */}
            <div className="text-sm text-gray-700">
              {t("showing")} {startIndex + 1} - {Math.min(endIndex, filteredVendors.length)} {t("of")} {filteredVendors.length} {t("vendors")}
            </div>

            {/* Pagination buttons */}
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(1)}
                disabled={currentPage === 1}
                className="flex items-center space-x-1"
              >
                <ChevronsLeft className="h-4 w-4" />
                <span className="hidden sm:inline">{t("first")}</span>
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="flex items-center space-x-1"
              >
                <ChevronLeft className="h-4 w-4" />
                <span className="hidden sm:inline">{t("previous")}</span>
              </Button>

              {/* Page numbers */}
              <div className="flex items-center space-x-1">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let pageNumber;
                  if (totalPages <= 5) {
                    pageNumber = i + 1;
                  } else if (currentPage <= 3) {
                    pageNumber = i + 1;
                  } else if (currentPage >= totalPages - 2) {
                    pageNumber = totalPages - 4 + i;
                  } else {
                    pageNumber = currentPage - 2 + i;
                  }

                  return (
                    <Button
                      key={pageNumber}
                      variant={currentPage === pageNumber ? "default" : "outline"}
                      size="sm"
                      onClick={() => setCurrentPage(pageNumber)}
                      className="w-8 h-8 p-0"
                    >
                      {pageNumber}
                    </Button>
                  );
                })}
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="flex items-center space-x-1"
              >
                <span className="hidden sm:inline">{t("next")}</span>
                <ChevronRight className="h-4 w-4" />
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(totalPages)}
                disabled={currentPage === totalPages}
                className="flex items-center space-x-1"
              >
                <span className="hidden sm:inline">{t("last")}</span>
                <ChevronsRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Vendor with Products Component
const VendorWithProducts: React.FC<{
  vendor: Vendor;
  products: any[];
}> = ({ vendor, products }) => {
  const t = useTranslations();
  const [scrollPosition, setScrollPosition] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 300;
      const newPosition = direction === 'left' 
        ? scrollPosition - scrollAmount 
        : scrollPosition + scrollAmount;
      
      scrollContainerRef.current.scrollTo({
        left: newPosition,
        behavior: 'smooth'
      });
      setScrollPosition(newPosition);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      {/* Vendor Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <div className="h-12 w-12 bg-gray-100 rounded-full flex items-center justify-center">
            {vendor.profilePicture ? (
              <img
                src={vendor.profilePicture}
                alt={vendor.firstName}
                className="h-12 w-12 rounded-full object-cover"
              />
            ) : (
              <Building2 className="h-6 w-6 text-gray-400" />
            )}
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-900">
              {vendor.firstName} {vendor.lastName}
            </h3>
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <span className="capitalize">{vendor.tradeRole.toLowerCase()}</span>
              <div className="flex items-center space-x-1">
                <Package className="h-4 w-4" />
                <span>{vendor.productCount} {t("products")}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Star className="h-4 w-4 text-yellow-400" />
                <span>{(vendor.averageRating || 0).toFixed(1)}</span>
              </div>
            </div>
            {vendor.businessTypes && vendor.businessTypes.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-2">
                {vendor.businessTypes.slice(0, 3).map((type, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {type}
                  </Badge>
                ))}
                {vendor.businessTypes.length > 3 && (
                  <Badge variant="secondary" className="text-xs">
                    +{vendor.businessTypes.length - 3}
                  </Badge>
                )}
              </div>
            )}
          </div>
        </div>
        <Button variant="outline" className="flex items-center space-x-2">
          <span>{t("view_products")}</span>
          <ExternalLink className="h-4 w-4" />
        </Button>
      </div>

      {/* Products Horizontal Scroll */}
      {products.length > 0 ? (
        <div className="relative">
          <div 
            ref={scrollContainerRef}
            className="flex space-x-4 overflow-x-auto pb-4 scrollbar-hide"
            style={{ 
              scrollbarWidth: 'none', 
              msOverflowStyle: 'none'
            }}
          >
            {products.map((product) => (
              <div key={product.id} className="flex-shrink-0 w-64">
                <ProductCard
                  productVariants={[]}
                  item={product}
                  onWishlist={() => {}}
                  inWishlist={false}
                  haveAccessToken={false}
                  isInteractive={false}
                  productQuantity={0}
                  productVariant={null}
                  cartId=""
                  relatedCart={null}
                  isAddedToCart={false}
                />
              </div>
            ))}
          </div>
          
          {/* Scroll Buttons */}
          {products.length > 3 && (
            <>
              <Button
                variant="outline"
                size="sm"
                className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-2 bg-white shadow-lg"
                onClick={() => scroll('left')}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-2 bg-white shadow-lg"
                onClick={() => scroll('right')}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </>
          )}
        </div>
      ) : (
        <div className="text-center py-8 text-gray-500">
          <Package className="h-12 w-12 mx-auto mb-2 text-gray-400" />
          <p>{t("this_vendor_has_no_products_available")}</p>
        </div>
      )}
    </div>
  );
};

export default VendorsSection;