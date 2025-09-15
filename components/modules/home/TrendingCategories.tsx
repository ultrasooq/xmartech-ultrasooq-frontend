import React, { useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { MdOutlineImageNotSupported } from "react-icons/md";
import { useCategory } from "@/apis/queries/category.queries";
import { useTranslations } from "next-intl";
import { useAuth } from "@/context/AuthContext";
import { PRODUCT_CATEGORY_ID } from "@/utils/constants";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useCategoryStore } from "@/lib/categoryStore";
import { ChevronRight, ChevronDown, Sparkles, ArrowRight, Grid3X3, Layers, ShoppingBag, Star, TrendingUp, Zap, Heart } from "lucide-react";

type CategoryProps = {
  id: number;
  parentId: number;
  name: string;
  icon: string;
  children: any;
};

type TrendingCategoriesProps = {
  onCategorySelect?: (categoryId: number, categoryName: string) => void;
};

const TrendingCategories: React.FC<TrendingCategoriesProps> = ({
  onCategorySelect,
}) => {
  const t = useTranslations();
  const { langDir } = useAuth();
  const router = useRouter();
  const categoryStore = useCategoryStore();
  
  // State for managing expanded categories
  const [expandedMainCategory, setExpandedMainCategory] = useState<number | null>(null);
  const [expandedSubCategory, setExpandedSubCategory] = useState<number | null>(null);

  // Fetch main categories
  const mainCategoriesQuery = useCategory(PRODUCT_CATEGORY_ID.toString());
  
  const mainCategories = useMemo(() => {
    return mainCategoriesQuery?.data?.data?.children || [];
  }, [mainCategoriesQuery?.data?.data]);

  // Handle main category click
  const handleMainCategoryClick = (category: CategoryProps) => {
    // Only expand if category has children
    if (!category.children || category.children.length === 0) {
      return;
    }
    
    if (expandedMainCategory === category.id) {
      setExpandedMainCategory(null);
      setExpandedSubCategory(null);
    } else {
      setExpandedMainCategory(category.id);
      setExpandedSubCategory(null);
    }
  };

  // Handle sub category click
  const handleSubCategoryClick = (subCategory: CategoryProps, mainCategory: CategoryProps) => {
    // Only expand if subcategory has children
    if (!subCategory.children || subCategory.children.length === 0) {
      return;
    }
    
    if (expandedSubCategory === subCategory.id) {
      setExpandedSubCategory(null);
    } else {
      setExpandedSubCategory(subCategory.id);
    }
  };

  // Handle category selection and navigation
  const handleCategorySelect = (category: CategoryProps, level: 'main' | 'sub' | 'subsub', parentCategory?: CategoryProps) => {
    if (onCategorySelect) {
      onCategorySelect(category.id, category.name);
      return;
    }

    // Navigate to trending page with category selection
    const subCategoryIndex = mainCategories.findIndex(
      (item: any) => item.id === (level === 'main' ? category.id : parentCategory?.id)
    );
    
    const mainCategoryItem = mainCategories.find(
      (item: any) => item.id === (level === 'main' ? category.id : parentCategory?.id)
    );

    if (level === 'main') {
      // Main category selected
      categoryStore.setSubCategories(mainCategoryItem?.children || []);
      categoryStore.setCategoryId(category.id.toString());
      categoryStore.setSubCategoryIndex(subCategoryIndex);
      categoryStore.setSubCategoryParentName(category.name);
      categoryStore.setSubSubCategoryParentName(mainCategoryItem?.children?.[0]?.name || '');
      categoryStore.setSubSubCategories(mainCategoryItem?.children?.[0]?.children || []);
      categoryStore.setSecondLevelCategoryIndex(0);
      categoryStore.setCategoryIds(category.id.toString());
    } else if (level === 'sub') {
      // Sub category selected
      categoryStore.setSubCategories(mainCategoryItem?.children || []);
      categoryStore.setCategoryId(category.id.toString());
      categoryStore.setSubCategoryIndex(subCategoryIndex);
      categoryStore.setSubCategoryParentName(mainCategoryItem?.name || '');
      categoryStore.setSubSubCategoryParentName(category.name);
      categoryStore.setSubSubCategories(category.children || []);
      categoryStore.setSecondLevelCategoryIndex(
        mainCategoryItem?.children?.findIndex((item: any) => item.id === category.id) || 0
      );
      categoryStore.setCategoryIds(category.id.toString());
    } else if (level === 'subsub') {
      // Sub-sub category selected
      const subCategoryItem = mainCategoryItem?.children?.find((item: any) => item.id === parentCategory?.id);
      categoryStore.setSubCategories(mainCategoryItem?.children || []);
      categoryStore.setCategoryId(category.id.toString());
      categoryStore.setSubCategoryIndex(subCategoryIndex);
      categoryStore.setSubCategoryParentName(mainCategoryItem?.name || '');
      categoryStore.setSubSubCategoryParentName(subCategoryItem?.name || '');
      categoryStore.setSubSubCategories(subCategoryItem?.children || []);
      categoryStore.setSecondLevelCategoryIndex(
        mainCategoryItem?.children?.findIndex((item: any) => item.id === parentCategory?.id) || 0
      );
      categoryStore.setCategoryIds(category.id.toString());
    }

    router.push("/trending");
  };

  // Render category background image
  const renderCategoryBackground = (category: CategoryProps) => {
    if (category.icon) {
      return (
        <Image
          src={category.icon}
          alt={category.name}
          fill
          className="object-cover transition-all duration-500 group-hover:scale-110"
        />
      );
    }
    return null;
  };

  // Render category icon for smaller cards
  const renderCategoryIcon = (category: CategoryProps) => {
    if (category.icon) {
      return (
        <Image
          src={category.icon}
          alt={category.name}
          width={32}
          height={32}
          className="h-8 w-8 object-contain"
        />
      );
    }
    return (
      <MdOutlineImageNotSupported className="h-8 w-8 text-gray-400" />
    );
  };

  if (mainCategoriesQuery.isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-blue-600"></div>
      </div>
    );
  }

  if (mainCategoriesQuery.isError || !mainCategories.length) {
    return (
      <div className="text-center py-8 text-gray-500">
        {t("no_categories_available")}
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Custom CSS for hiding scrollbars */}
      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

      {/* Main Categories */}
      <div className="space-y-8">
        {/* <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            {t("explore_categories")}
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            {t("choose_from_wide_range_of_categories")}
          </p>
        </div> */}

        <div className="relative">
          {/* Scroll Buttons - Show only if more than 5 categories */}
          {mainCategories.length > 5 && (
            <>
              <div className="absolute left-0 top-1/2 -translate-y-1/2 z-20">
                <button
                  onClick={() => {
                    const container = document.getElementById('main-categories-scroll');
                    if (container) container.scrollBy({ left: -300, behavior: 'smooth' });
                  }}
                  className="hidden md:flex items-center justify-center w-12 h-12 rounded-full bg-white/90 backdrop-blur-xs shadow-lg hover:bg-white transition-all duration-300 hover:scale-110"
                >
                  <ChevronRight className="h-5 w-5 text-gray-600 rotate-180" />
                </button>
              </div>
              <div className="absolute right-0 top-1/2 -translate-y-1/2 z-20">
                <button
                  onClick={() => {
                    const container = document.getElementById('main-categories-scroll');
                    if (container) container.scrollBy({ left: 300, behavior: 'smooth' });
                  }}
                  className="hidden md:flex items-center justify-center w-12 h-12 rounded-full bg-white/90 backdrop-blur-xs shadow-lg hover:bg-white transition-all duration-300 hover:scale-110"
                >
                  <ChevronRight className="h-5 w-5 text-gray-600" />
                </button>
              </div>
            </>
          )}

          {/* Scrollable Container */}
          <div 
            id="main-categories-scroll"
            className="flex gap-4 overflow-x-auto pb-4 scroll-smooth scrollbar-hide justify-center"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {mainCategories.map((category: CategoryProps, index: number) => (
              <div 
                key={category.id} 
                className="group relative shrink-0"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <button
                  onClick={() => handleMainCategoryClick(category)}
                  className={cn(
                    "relative overflow-hidden rounded-2xl border-0 bg-white text-center transition-all duration-300 w-48 h-32 shadow-md",
                    category.children && category.children.length > 0 
                      ? "hover:shadow-lg cursor-pointer" 
                      : "cursor-default opacity-75"
                  )}
                >
                  {/* Background Image */}
                  <div className="absolute inset-0 rounded-2xl overflow-hidden">
                    {renderCategoryBackground(category)}
                    {/* Dark Overlay */}
                    <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/30 to-black/10" />
                  </div>
                  
                  
                  {/* Content */}
                  <div className="relative z-10 h-full flex flex-col justify-end p-4 text-white">
                    {/* Category Name */}
                    <h3 className="text-sm font-bold mb-1 drop-shadow-lg text-white">
                      {category.name}
                    </h3>
                    
                    {/* Subtitle */}
                    <p className="text-xs text-gray-200 mb-2 drop-shadow-sm">
                      {category.children?.length || 0} {t("subcategories")}
                    </p>
                    
                    {/* Expand Indicator */}
                    {category.children && category.children.length > 0 && (
                      <div className="flex justify-center">
                        <div className="rounded-full p-1 bg-white/20 text-white backdrop-blur-xs">
                          {expandedMainCategory === category.id ? (
                            <ChevronDown className="h-3 w-3" />
                          ) : (
                            <ChevronRight className="h-3 w-3" />
                          )}
                        </div>
                      </div>
                    )}
                  </div>

                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Sub Categories - Show when main category is expanded */}
      {expandedMainCategory && (
        <div className="mt-12 animate-in slide-in-from-top-4 duration-700">
          <div className="mb-8 text-center">
            <div className="inline-flex items-center gap-3 rounded-md bg-gray-100 px-6 py-3">
              <div className="rounded-full bg-blue-600 p-2">
                <Grid3X3 className="h-5 w-5 text-white" />
              </div>
              <div className="text-left">
                <h4 className="text-lg font-bold text-gray-800">
                  {mainCategories.find((cat: any) => cat.id === expandedMainCategory)?.name}
                </h4>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setExpandedMainCategory(null)}
                className="ml-2 rounded-full bg-white/50 text-gray-600 hover:bg-white hover:text-gray-800 h-6 w-6 p-1"
              >
                <ChevronDown className="h-3 w-3" />
              </Button>
            </div>
          </div>
          
          <div className="relative">
            {/* Scroll Buttons for Sub Categories - Show only if more than 5 subcategories */}
            {(() => {
              const subCategories = mainCategories.find((cat: any) => cat.id === expandedMainCategory)?.children || [];
              return subCategories.length > 5 && (
                <>
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 z-20">
                    <button
                      onClick={() => {
                        const container = document.getElementById('sub-categories-scroll');
                        if (container) container.scrollBy({ left: -250, behavior: 'smooth' });
                      }}
                      className="hidden md:flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 shadow-md hover:bg-gray-200 transition-all duration-300"
                    >
                      <ChevronRight className="h-4 w-4 text-gray-600 rotate-180" />
                    </button>
                  </div>
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 z-20">
                    <button
                      onClick={() => {
                        const container = document.getElementById('sub-categories-scroll');
                        if (container) container.scrollBy({ left: 250, behavior: 'smooth' });
                      }}
                      className="hidden md:flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 shadow-md hover:bg-gray-200 transition-all duration-300"
                    >
                      <ChevronRight className="h-4 w-4 text-gray-600" />
                    </button>
                  </div>
                </>
              );
            })()}

            {/* Scrollable Container */}
            <div 
              id="sub-categories-scroll"
              className="flex gap-3 overflow-x-auto pb-4 scroll-smooth scrollbar-hide justify-center"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {mainCategories
                .find((cat: any) => cat.id === expandedMainCategory)
                ?.children?.map((subCategory: CategoryProps, index: number) => (
                  <div 
                    key={subCategory.id} 
                    className="group shrink-0"
                    style={{ animationDelay: `${index * 30}ms` }}
                  >
                    <button
                      onClick={() => handleSubCategoryClick(subCategory, mainCategories.find((cat: any) => cat.id === expandedMainCategory)!)}
                      className={cn(
                        "relative overflow-hidden rounded-xl border-0 bg-white text-center transition-all duration-300 w-36 h-24 shadow-md",
                        subCategory.children && subCategory.children.length > 0 
                          ? "hover:shadow-lg cursor-pointer" 
                          : "cursor-default opacity-75"
                      )}
                    >
                      {/* Background Image */}
                      <div className="absolute inset-0 rounded-xl overflow-hidden">
                        {renderCategoryBackground(subCategory)}
                        {/* Dark Overlay */}
                        <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/40 to-black/20" />
                      </div>
                      
                      {/* Content */}
                      <div className="relative z-10 h-full flex flex-col justify-end p-3 text-white">
                        {/* Category Name */}
                        <h4 className="relative text-xs font-semibold mb-1 drop-shadow-lg text-white">
                          {subCategory.name}
                        </h4>
                        
                        {/* Expand Indicator */}
                        {subCategory.children && subCategory.children.length > 0 && (
                          <div className="relative flex justify-center">
                            <div className="rounded-full p-0.5 bg-white/20 text-white backdrop-blur-xs">
                              {expandedSubCategory === subCategory.id ? (
                                <ChevronDown className="h-2 w-2" />
                              ) : (
                                <ChevronRight className="h-2 w-2" />
                              )}
                            </div>
                          </div>
                        )}
                      </div>

                    </button>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}

      {/* Sub-Sub Categories - Show when sub category is expanded */}
      {expandedSubCategory && (
        <div className="mt-8 animate-in slide-in-from-top-4 duration-500">
          <div className="mb-6 text-center">
            <div className="inline-flex items-center gap-3 rounded-md bg-gray-100 px-6 py-3">
              <div className="rounded-full bg-indigo-600 p-2">
                <Layers className="h-5 w-5 text-white" />
              </div>
              <div className="text-left">
                <h4 className="text-lg font-bold text-gray-800">
                  {mainCategories
                    .find((cat: any) => cat.id === expandedMainCategory)
                    ?.children?.find((sub: any) => sub.id === expandedSubCategory)?.name}
                </h4>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setExpandedSubCategory(null)}
                className="ml-2 rounded-full bg-white/50 text-gray-600 hover:bg-white hover:text-gray-800 h-6 w-6 p-1"
              >
                <ChevronDown className="h-3 w-3" />
              </Button>
            </div>
          </div>
          
          <div className="relative">
            {/* Scroll Buttons for Sub-Sub Categories - Show only if more than 5 sub-subcategories */}
            {(() => {
              const subSubCategories = mainCategories
                .find((cat: any) => cat.id === expandedMainCategory)
                ?.children?.find((sub: any) => sub.id === expandedSubCategory)
                ?.children || [];
              return subSubCategories.length > 5 && (
                <>
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 z-20">
                    <button
                      onClick={() => {
                        const container = document.getElementById('sub-sub-categories-scroll');
                        if (container) container.scrollBy({ left: -200, behavior: 'smooth' });
                      }}
                      className="hidden md:flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 shadow-md hover:bg-gray-200 transition-all duration-300"
                    >
                      <ChevronRight className="h-3 w-3 text-gray-600 rotate-180" />
                    </button>
                  </div>
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 z-20">
                    <button
                      onClick={() => {
                        const container = document.getElementById('sub-sub-categories-scroll');
                        if (container) container.scrollBy({ left: 200, behavior: 'smooth' });
                      }}
                      className="hidden md:flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 shadow-md hover:bg-gray-200 transition-all duration-300"
                    >
                      <ChevronRight className="h-3 w-3 text-gray-600" />
                    </button>
                  </div>
                </>
              );
            })()}

            {/* Scrollable Container */}
            <div 
              id="sub-sub-categories-scroll"
              className="flex gap-2 overflow-x-auto pb-4 scroll-smooth scrollbar-hide justify-center"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {mainCategories
                .find((cat: any) => cat.id === expandedMainCategory)
                ?.children?.find((sub: any) => sub.id === expandedSubCategory)
                ?.children?.map((subSubCategory: CategoryProps, index: number) => (
                  <div 
                    key={subSubCategory.id} 
                    className="group shrink-0"
                    style={{ animationDelay: `${index * 20}ms` }}
                  >
                    <button
                      onClick={() => handleCategorySelect(
                        subSubCategory, 
                        'subsub', 
                        mainCategories
                          .find((cat: any) => cat.id === expandedMainCategory)
                          ?.children?.find((sub: any) => sub.id === expandedSubCategory)
                      )}
                      className="relative overflow-hidden rounded-lg border-0 bg-white text-center shadow-md transition-all duration-300 hover:scale-105 hover:shadow-lg w-28 h-20"
                    >
                      {/* Background Image */}
                      <div className="absolute inset-0 rounded-lg overflow-hidden">
                        {renderCategoryBackground(subSubCategory)}
                        {/* Dark Overlay */}
                        <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/40 to-black/20" />
                      </div>
                      
                      {/* Content */}
                      <div className="relative z-10 h-full flex flex-col justify-end p-2 text-white">
                        {/* Category Name */}
                        <h5 className="relative text-xs font-medium text-white drop-shadow-lg">
                          {subSubCategory.name}
                        </h5>
                      </div>

                    </button>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TrendingCategories;
