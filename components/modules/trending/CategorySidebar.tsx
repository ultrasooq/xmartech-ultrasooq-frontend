"use client";
import React, { useState, useMemo, useEffect, useRef } from "react";
import { useCategory } from "@/apis/queries/category.queries";
import { fetchCategory } from "@/apis/requests/category.requests";
import { PRODUCT_CATEGORY_ID } from "@/utils/constants";
import { useTranslations } from "next-intl";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useCategoryStore } from "@/lib/categoryStore";

interface CategorySidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onCategorySelect?: (categoryId: number) => void;
}

const CategorySidebar: React.FC<CategorySidebarProps> = ({
  isOpen,
  onClose,
  onCategorySelect,
}) => {
  const t = useTranslations();
  const { langDir } = useAuth();
  const router = useRouter();
  const categoryStore = useCategoryStore();
  const containerRef = useRef<HTMLDivElement>(null);

  const [selectedMainCategory, setSelectedMainCategory] = useState<
    number | null
  >(null);
  const [headerHeight, setHeaderHeight] = useState(133);
  const [isHovered, setIsHovered] = useState(false);
  const [hasBeenShown, setHasBeenShown] = useState(false);
  const [isManualSelection, setIsManualSelection] = useState(false);
  const [categoriesWithSubcategories, setCategoriesWithSubcategories] =
    useState<Array<{ category: any; subcategories: any[] }>>([]);
  const [subCategoryIndex, setSubCategoryIndex] = useState(0);
  const [subSubCategoryIndex, setSubSubCategoryIndex] = useState(0);
  const [subSubSubCategoryIndex, setSubSubSubCategoryIndex] = useState(0);
  const rightContentRef = useRef<HTMLDivElement>(null);
  const categorySectionRefs = useRef<Map<number, HTMLDivElement>>(new Map());
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const manualSelectionTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Calculate header height
  useEffect(() => {
    const calculateHeaderHeight = () => {
      const header = document.querySelector("header");
      if (header) {
        setHeaderHeight(header.offsetHeight);
      } else {
        // Fallback to responsive heights
        if (window.innerWidth >= 1024) {
          setHeaderHeight(146);
        } else if (window.innerWidth >= 768) {
          setHeaderHeight(133);
        } else {
          setHeaderHeight(116);
        }
      }
    };

    calculateHeaderHeight();
    window.addEventListener("resize", calculateHeaderHeight);
    return () => window.removeEventListener("resize", calculateHeaderHeight);
  }, []);

  // Handle hover state with delay
  useEffect(() => {
    if (isHovered) {
      // Clear any pending close timeout
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current);
        closeTimeoutRef.current = null;
      }
    } else {
      // Set timeout to close after mouse leaves
      closeTimeoutRef.current = setTimeout(() => {
        onClose();
      }, 300); // 300ms delay before closing
    }

    return () => {
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current);
      }
    };
  }, [isHovered, onClose]);

  // Fetch main categories
  const mainCategoriesQuery = useCategory(PRODUCT_CATEGORY_ID.toString());

  const mainCategories = useMemo(() => {
    return mainCategoriesQuery?.data?.data?.children || [];
  }, [mainCategoriesQuery?.data?.data]);

  // Filter categories to only show those with subcategories
  const categoriesWithSubcategoriesFiltered = useMemo(() => {
    return categoriesWithSubcategories.filter(
      ({ subcategories }) => subcategories.length > 0,
    );
  }, [categoriesWithSubcategories]);

  // Get main category IDs that have subcategories
  const mainCategoryIdsWithSubcategories = useMemo(() => {
    return new Set(
      categoriesWithSubcategoriesFiltered.map(({ category }) => category.id),
    );
  }, [categoriesWithSubcategoriesFiltered]);

  // Filter main categories to only show those with subcategories
  const mainCategoriesFiltered = useMemo(() => {
    return mainCategories.filter((category: any) =>
      mainCategoryIdsWithSubcategories.has(category.id),
    );
  }, [mainCategories, mainCategoryIdsWithSubcategories]);

  // Recursive function to fetch all category levels
  const fetchCategoryWithChildren = async (category: any, level: number = 0): Promise<any> => {
    try {
      const response = await fetchCategory({
        categoryId: category.id.toString(),
      });
      const children = response?.data?.data?.children || [];
      
      // Process children - check if they have children from the response
      // The API response might include nested children, so we check that
      const childrenWithNested = children.map((child: any) => {
        // Check if child has children from the API response
        // The child object from API might have a children property
        const hasChildren = child.children && Array.isArray(child.children) && child.children.length > 0;
        return {
          ...child,
          children: [], // Will be populated on-demand when expanded (or from API if available)
          hasChildren: hasChildren,
          level: level + 1,
          // Store original children from API if they exist (for later use)
          _originalChildren: child.children || [],
        };
      });

      return {
        ...category,
        children: childrenWithNested,
        level,
      };
    } catch (error) {
      console.error(
        `Error fetching category ${category.name}:`,
        error,
      );
      return {
        ...category,
        children: [],
        level,
      };
    }
  };

  // Fetch children for a specific category on-demand
  const fetchCategoryChildren = async (categoryId: number, originalChildren?: any[]): Promise<any[]> => {
    try {
      // If we have original children from the initial fetch, use those first
      if (originalChildren && originalChildren.length > 0) {
        return originalChildren.map((child: any) => {
          const hasChildren = child.children && Array.isArray(child.children) && child.children.length > 0;
          return {
            ...child,
            children: [], // Will be populated on-demand when expanded
            hasChildren: hasChildren,
            _originalChildren: child.children || [],
          };
        });
      }

      // Otherwise, fetch from API
      const response = await fetchCategory({
        categoryId: categoryId.toString(),
      });
      const children = response?.data?.data?.children || [];
      
      // Process children - check if they have children from the response
      return children.map((child: any) => {
        const hasChildren = child.children && Array.isArray(child.children) && child.children.length > 0;
        return {
          ...child,
          children: [], // Will be populated on-demand when expanded
          hasChildren: hasChildren,
          _originalChildren: child.children || [],
        };
      });
    } catch (error) {
      console.error(`Error fetching children for category ${categoryId}:`, error);
      return [];
    }
  };

  // Fetch all subcategories for all main categories (recursively)
  useEffect(() => {
    const fetchAllSubcategories = async () => {
      if (mainCategories.length === 0) return;

      const categoriesData = await Promise.all(
        mainCategories.map(async (category: any) => {
          const categoryWithChildren = await fetchCategoryWithChildren(category, 0);
          return { 
            category: categoryWithChildren, 
            subcategories: categoryWithChildren.children || [] 
          };
        }),
      );
      setCategoriesWithSubcategories(categoriesData);

      // Set first category with subcategories as selected by default
      const firstCategoryWithSubcategories = categoriesData.find(
        ({ subcategories }) => subcategories.length > 0,
      );
      if (!selectedMainCategory && firstCategoryWithSubcategories) {
        setSelectedMainCategory(firstCategoryWithSubcategories.category.id);
      }
    };

    fetchAllSubcategories();
  }, [mainCategories, selectedMainCategory]);

  // Fetch children for subcategories when they are selected
  useEffect(() => {
    if (
      selectedMainCategory !== null &&
      categoriesWithSubcategoriesFiltered.length > 0
    ) {
      const selectedCategory = categoriesWithSubcategoriesFiltered.find(
        ({ category }) => category.id === selectedMainCategory,
      );
      const subCategory = selectedCategory?.subcategories?.[subCategoryIndex];
      
      // Check if we need to fetch children
      if (
        subCategory &&
        (!subCategory.children || subCategory.children.length === 0) &&
        subCategory.hasChildren &&
        subCategory._originalChildren &&
        subCategory._originalChildren.length > 0
      ) {
        fetchCategoryChildren(
          subCategory.id,
          subCategory._originalChildren,
        ).then((children) => {
          setCategoriesWithSubcategories((prev) =>
            prev.map((item) => {
              if (item.category.id === selectedMainCategory) {
                const updatedSubcategories = item.subcategories.map(
                  (sub: any, idx: number) => {
                    if (idx === subCategoryIndex) {
                      return { ...sub, children };
                    }
                    return sub;
                  },
                );
                return { ...item, subcategories: updatedSubcategories };
              }
              return item;
            }),
          );
        });
      }
    }
  }, [selectedMainCategory, subCategoryIndex, categoriesWithSubcategoriesFiltered]);

  // Scroll spy: Update active category based on scroll position
  useEffect(() => {
    const rightContent = rightContentRef.current;
    if (!rightContent || categoriesWithSubcategoriesFiltered.length === 0)
      return;

    // Don't run scroll spy if user just manually selected a category
    if (isManualSelection) return;

    const handleScroll = () => {
      // Don't update if user just manually selected
      if (isManualSelection) return;

      const container = rightContent;
      if (!container) return;

      const containerTop = container.scrollTop;
      const containerHeight = container.clientHeight;
      const viewportTop = containerTop;
      const viewportBottom = containerTop + containerHeight;

      let activeCategoryId: number | null = null;
      let minDistance = Infinity;

      // Find the category section that is closest to the top of the viewport
      categorySectionRefs.current.forEach((element, categoryId) => {
        if (!element) return;

        const elementTop = element.offsetTop;
        const elementBottom = elementTop + element.offsetHeight;

        // Check if element is in viewport
        if (elementBottom >= viewportTop && elementTop <= viewportBottom) {
          // Calculate distance from top of viewport
          const distance = Math.abs(elementTop - viewportTop - 20); // 20px offset for padding

          if (distance < minDistance) {
            minDistance = distance;
            activeCategoryId = categoryId;
          }
        }
      });

      // If we found an active category and it's different from current, update it
      if (
        activeCategoryId !== null &&
        activeCategoryId !== selectedMainCategory
      ) {
        setSelectedMainCategory(activeCategoryId);
      }
    };

    // Initial check
    handleScroll();

    // Listen to scroll events
    rightContent.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      rightContent.removeEventListener("scroll", handleScroll);
      if (manualSelectionTimeoutRef.current) {
        clearTimeout(manualSelectionTimeoutRef.current);
      }
    };
  }, [
    categoriesWithSubcategoriesFiltered,
    selectedMainCategory,
    isManualSelection,
  ]);

  // Listen for open/close events from header
  useEffect(() => {
    const handleOpenCategorySidebar = () => {
      setIsHovered(true);
    };

    const handleCloseCategorySidebar = () => {
      setIsHovered(false);
    };

    window.addEventListener("openCategorySidebar", handleOpenCategorySidebar);
    window.addEventListener("closeCategorySidebar", handleCloseCategorySidebar);

    return () => {
      window.removeEventListener(
        "openCategorySidebar",
        handleOpenCategorySidebar,
      );
      window.removeEventListener(
        "closeCategorySidebar",
        handleCloseCategorySidebar,
      );
    };
  }, []);

  const handleCategoryClick = (categoryId: number, categoryName: string) => {
    setSelectedMainCategory(categoryId);
    setIsManualSelection(true);

    // Clear any existing timeout
    if (manualSelectionTimeoutRef.current) {
      clearTimeout(manualSelectionTimeoutRef.current);
    }

    // Scroll to the category section on the right
    const categoryElement = categorySectionRefs.current.get(categoryId);
    if (categoryElement && rightContentRef.current) {
      const container = rightContentRef.current;
      const elementTop = categoryElement.offsetTop;
      container.scrollTo({
        top: elementTop - 20, // Add some padding from top
        behavior: "smooth",
      });
    }

    // Re-enable scroll spy after scroll completes (2 seconds should be enough)
    manualSelectionTimeoutRef.current = setTimeout(() => {
      setIsManualSelection(false);
    }, 2000);
  };

  const handleSubCategoryClick = (categoryId: number) => {
    const url = `/trending?category=${categoryId}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  // Show sidebar when hovered or explicitly opened
  const shouldShow = isOpen || isHovered;

  // Track if sidebar has been shown at least once (for transitions)
  useEffect(() => {
    if (shouldShow) {
      setHasBeenShown(true);
    }
  }, [shouldShow]);

  // Don't render if never shown (initial state)
  if (!hasBeenShown && !shouldShow) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className={cn(
          "fixed inset-0 z-[90] bg-black/30 transition-opacity duration-500",
          shouldShow
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0",
        )}
        onClick={onClose}
        onMouseEnter={() => setIsHovered(false)}
      />

      {/* Category Dropdown Panel */}
      <div
        ref={containerRef}
        className={cn(
          "fixed right-0 left-0 z-[100] h-[600px] bg-white shadow-2xl",
          "transition-all duration-500 ease-out",
          shouldShow
            ? "pointer-events-auto translate-y-0 scale-y-100 opacity-100"
            : "pointer-events-none -translate-y-8 scale-y-95 opacity-0",
        )}
        style={{
          top: `${headerHeight}px`,
          transformOrigin: "top center",
          overflow: shouldShow ? "visible" : "hidden",
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        dir={langDir}
      >
        <div className="relative flex h-full w-full items-start justify-start bg-white">
          {/* Left Sidebar - Main Categories (Alibaba Style) */}
          {categoriesWithSubcategoriesFiltered.length > 0 && (
            <div className="absolute left-0 top-0 z-[100] h-full w-[240px] overflow-y-auto bg-gray-50 border-r border-gray-200">
              <div className="py-2">
                {categoriesWithSubcategoriesFiltered.map(
                  ({ category, subcategories }, mainIndex) => {
                    const isMainActive = selectedMainCategory === category.id;

                    return (
                      <div
                        key={category.id}
                        className={cn(
                          "flex cursor-pointer items-center gap-x-3 px-4 py-3 transition-colors",
                          {
                            "bg-white border-r-2 border-blue-600": isMainActive,
                            "hover:bg-gray-100": !isMainActive,
                          },
                        )}
                        onMouseEnter={() => {
                          setSelectedMainCategory(category.id);
                          setSubCategoryIndex(0);
                          setSubSubCategoryIndex(0);
                          setSubSubSubCategoryIndex(0);
                        }}
                        onClick={() => {
                          setSelectedMainCategory(category.id);
                          setSubCategoryIndex(0);
                          setSubSubCategoryIndex(0);
                          setSubSubSubCategoryIndex(0);
                        }}
                      >
                        {category.icon ? (
                          <img
                            src={category.icon}
                            alt={category.name}
                            height={20}
                            width={20}
                            className="object-contain flex-shrink-0"
                          />
                        ) : (
                          <div className="h-5 w-5 flex-shrink-0 rounded bg-gray-200" />
                        )}
                        <span
                          className={cn(
                            "text-sm flex-1 text-left",
                            isMainActive
                              ? "text-gray-900 font-medium"
                              : "text-gray-700",
                          )}
                        >
                          {category.name}
                        </span>
                      </div>
                    );
                  },
                )}
              </div>
            </div>
          )}

          {/* Right Content Area - Subcategories Grid (Alibaba Style) */}
          {categoriesWithSubcategoriesFiltered.length > 0 &&
            categoriesWithSubcategoriesFiltered.find(
              ({ category }) => category.id === selectedMainCategory,
            )?.subcategories?.length > 0 && (
              <div className="absolute left-[240px] top-0 z-[100] h-full w-[calc(100%-240px)] overflow-y-auto bg-white p-6">
                <div className="mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {categoriesWithSubcategoriesFiltered.find(
                      ({ category }) => category.id === selectedMainCategory,
                    )?.category.name || "Categories"}
                  </h3>
                </div>

                {/* Subcategories Grid */}
                <div className="grid grid-cols-7 gap-4">
                  {categoriesWithSubcategoriesFiltered
                    .find(({ category }) => category.id === selectedMainCategory)
                    ?.subcategories?.map((item: any, index: number) => {
                      const isSubActive = index === subCategoryIndex;
                      const hasChildren =
                        item.children &&
                        Array.isArray(item.children) &&
                        item.children.length > 0;

                      return (
                        <div
                          key={item.id}
                          className={cn(
                            "flex flex-col items-center cursor-pointer group transition-all",
                            {
                              "opacity-100": true,
                            },
                          )}
                          onMouseEnter={() => {
                            setSubCategoryIndex(index);
                            setSubSubCategoryIndex(0);
                            setSubSubSubCategoryIndex(0);
                          }}
                          onClick={() => {
                            if (!hasChildren) {
                              handleSubCategoryClick(item.id);
                            }
                          }}
                        >
                          {/* Circular Icon Container */}
                          <div
                            className={cn(
                              "relative w-20 h-20 rounded-full flex items-center justify-center mb-2 transition-all border-2",
                              isSubActive
                                ? "border-blue-500 bg-blue-50 shadow-md scale-105"
                                : "border-gray-200 bg-white hover:border-blue-300 hover:bg-gray-50",
                            )}
                          >
                            {item.icon ? (
                              <Image
                                src={item.icon}
                                alt={item.name}
                                width={48}
                                height={48}
                                className="object-contain"
                              />
                            ) : (
                              <div className="w-12 h-12 rounded-full bg-gray-100" />
                            )}
                            {/* Active indicator dot */}
                            {isSubActive && (
                              <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-blue-600 border-2 border-white" />
                            )}
                          </div>
                          {/* Category Name */}
                          <span
                            className={cn(
                              "text-xs text-center line-clamp-2 max-w-[100px]",
                              isSubActive
                                ? "text-blue-600 font-medium"
                                : "text-gray-700 group-hover:text-blue-600",
                            )}
                          >
                            {item.name}
                          </span>
                        </div>
                      );
                    })}
                </div>

                {/* Third Level - Sub-subcategories (if available) */}
                {(() => {
                  const selectedCategory = categoriesWithSubcategoriesFiltered.find(
                    ({ category }) => category.id === selectedMainCategory,
                  );
                  const subCategory =
                    selectedCategory?.subcategories?.[subCategoryIndex];
                  const subSubCategories = subCategory?.children || [];

                  return subSubCategories.length > 0 ? (
                    <div className="mt-8 pt-6 border-t border-gray-200">
                      <h4 className="text-base font-semibold text-gray-900 mb-4">
                        {subCategory?.name || ""}
                      </h4>
                      <div className="grid grid-cols-7 gap-4">
                        {subSubCategories.map((item: any, index: number) => {
                          const isSubSubActive = index === subSubSubCategoryIndex;
                          const hasChildren =
                            item.children &&
                            Array.isArray(item.children) &&
                            item.children.length > 0;

                          return (
                            <div
                              key={item.id}
                              className="flex flex-col items-center cursor-pointer group transition-all"
                              onMouseEnter={() => setSubSubSubCategoryIndex(index)}
                              onClick={() => {
                                if (!hasChildren) {
                                  handleSubCategoryClick(item.id);
                                }
                              }}
                            >
                              {/* Circular Icon Container */}
                              <div
                                className={cn(
                                  "relative w-20 h-20 rounded-full flex items-center justify-center mb-2 transition-all border-2",
                                  isSubSubActive
                                    ? "border-blue-500 bg-blue-50 shadow-md scale-105"
                                    : "border-gray-200 bg-white hover:border-blue-300 hover:bg-gray-50",
                                )}
                              >
                                {item.icon ? (
                                  <Image
                                    src={item.icon}
                                    alt={item.name}
                                    width={48}
                                    height={48}
                                    className="object-contain"
                                  />
                                ) : (
                                  <div className="w-12 h-12 rounded-full bg-gray-100" />
                                )}
                                {/* Active indicator dot */}
                                {isSubSubActive && (
                                  <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-blue-600 border-2 border-white" />
                                )}
                              </div>
                              {/* Category Name */}
                              <span
                                className={cn(
                                  "text-xs text-center line-clamp-2 max-w-[100px]",
                                  isSubSubActive
                                    ? "text-blue-600 font-medium"
                                    : "text-gray-700 group-hover:text-blue-600",
                                )}
                              >
                                {item.name}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ) : null;
                })()}
              </div>
            )}
        </div>
      </div>
    </>
  );
};

export default CategorySidebar;
