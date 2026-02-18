"use client";
import React, { useState, useMemo, useEffect, useRef } from "react";
import { useCategory } from "@/apis/queries/category.queries";
import { fetchCategory } from "@/apis/requests/category.requests";
import { PRODUCT_CATEGORY_ID } from "@/utils/constants";
import { useTranslations } from "next-intl";
import { useAuth } from "@/context/AuthContext";
import { useDynamicTranslation } from "@/hooks/useDynamicTranslation";
import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useCategoryStore } from "@/lib/categoryStore";

// Custom scrollbar styles
const scrollbarStyles = `
  .custom-scrollbar {
    scrollbar-width: thin;
    scrollbar-color: transparent transparent;
  }
  
  .custom-scrollbar::-webkit-scrollbar {
    width: 6px;
  }
  
  .custom-scrollbar::-webkit-scrollbar-track {
    background: transparent;
  }
  
  .custom-scrollbar::-webkit-scrollbar-thumb {
    background-color: transparent;
    border-radius: 3px;
    transition: background-color 0.3s ease;
  }
  
  .custom-scrollbar:hover::-webkit-scrollbar-thumb,
  .custom-scrollbar.scrolling::-webkit-scrollbar-thumb {
    background-color: #9ca3af;
  }
  
  .custom-scrollbar:hover::-webkit-scrollbar-thumb:hover,
  .custom-scrollbar.scrolling::-webkit-scrollbar-thumb:hover {
    background-color: #6b7280;
  }
`;

if (typeof document !== "undefined") {
  const styleId = "category-sidebar-scrollbar-styles";
  if (!document.getElementById(styleId)) {
    const style = document.createElement("style");
    style.id = styleId;
    style.textContent = scrollbarStyles;
    document.head.appendChild(style);
  }
}

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
  const { translate } = useDynamicTranslation();
  const router = useRouter();
  const categoryStore = useCategoryStore();
  const containerRef = useRef<HTMLDivElement>(null);

  const [selectedMainCategory, setSelectedMainCategory] = useState<
    number | null
  >(null);
  const [headerHeight, setHeaderHeight] = useState(133);
  const [isHovered, setIsHovered] = useState(false);
  const [hasBeenShown, setHasBeenShown] = useState(false);
  const [categoriesWithSubcategories, setCategoriesWithSubcategories] =
    useState<Array<{ category: any; subcategories: any[] }>>([]);

  // Track selected category ID at each level (up to 6 levels)
  // Level 0: Main category, Level 1-5: Subcategories
  const [selectedLevels, setSelectedLevels] = useState<(number | null)[]>([
    null, // Level 0: Main category
    null, // Level 1: Sub category
    null, // Level 2: Sub sub category
    null, // Level 3: Sub sub sub category
    null, // Level 4
    null, // Level 5
  ]);

  // Mobile navigation stack: tracks the path of selected categories
  // Each item: { level: number, categoryId: number, categoryName: string }
  const [mobileNavStack, setMobileNavStack] = useState<
    Array<{
      level: number;
      categoryId: number;
      categoryName: string;
    }>
  >([]);

  // Store loaded children for each category path
  const [loadedChildren, setLoadedChildren] = useState<Map<string, any[]>>(
    new Map(),
  );

  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Calculate header height
  useEffect(() => {
    const calculateHeaderHeight = () => {
      const header = document.querySelector("header");
      if (header) {
        setHeaderHeight(header.offsetHeight);
      } else {
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

  // Disabled: Handle hover state with delay - removed auto-close on mouse leave
  // useEffect(() => {
  //   if (isHovered) {
  //     if (closeTimeoutRef.current) {
  //       clearTimeout(closeTimeoutRef.current);
  //       closeTimeoutRef.current = null;
  //     }
  //   } else {
  //     closeTimeoutRef.current = setTimeout(() => {
  //       onClose();
  //     }, 300);
  //   }

  //   return () => {
  //     if (closeTimeoutRef.current) {
  //       clearTimeout(closeTimeoutRef.current);
  //     }
  //   };
  // }, [isHovered, onClose]);

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
  const fetchCategoryWithChildren = async (
    category: any,
    level: number = 0,
  ): Promise<any> => {
    try {
      const response = await fetchCategory({
        categoryId: category.id.toString(),
      });
      const children = response?.data?.data?.children || [];

      const childrenWithNested = children.map((child: any) => {
        const hasChildren =
          child.children &&
          Array.isArray(child.children) &&
          child.children.length > 0;
        return {
          ...child,
          children: [],
          hasChildren: hasChildren,
          level: level + 1,
          _originalChildren: child.children || [],
        };
      });

      return {
        ...category,
        children: childrenWithNested,
        level,
      };
    } catch (error) {
      console.error(`Error fetching category ${category.name}:`, error);
      return {
        ...category,
        children: [],
        level,
      };
    }
  };

  // Fetch children for a specific category on-demand
  const fetchCategoryChildren = async (
    categoryId: number,
    originalChildren?: any[],
  ): Promise<any[]> => {
    try {
      if (originalChildren && originalChildren.length > 0) {
        return originalChildren.map((child: any) => {
          const hasChildren =
            child.children &&
            Array.isArray(child.children) &&
            child.children.length > 0;
          return {
            ...child,
            children: [],
            hasChildren: hasChildren,
            _originalChildren: child.children || [],
          };
        });
      }

      const response = await fetchCategory({
        categoryId: categoryId.toString(),
      });
      const children = response?.data?.data?.children || [];

      return children.map((child: any) => {
        const hasChildren =
          child.children &&
          Array.isArray(child.children) &&
          child.children.length > 0;
        return {
          ...child,
          children: [],
          hasChildren: hasChildren,
          _originalChildren: child.children || [],
        };
      });
    } catch (error) {
      console.error(
        `Error fetching children for category ${categoryId}:`,
        error,
      );
      return [];
    }
  };

  // Fetch all subcategories for all main categories
  useEffect(() => {
    const fetchAllSubcategories = async () => {
      if (mainCategories.length === 0) return;

      const categoriesData = await Promise.all(
        mainCategories.map(async (category: any) => {
          const categoryWithChildren = await fetchCategoryWithChildren(
            category,
            0,
          );
          return {
            category: categoryWithChildren,
            subcategories: categoryWithChildren.children || [],
          };
        }),
      );
      setCategoriesWithSubcategories(categoriesData);

      if (!selectedMainCategory && categoriesData.length > 0) {
        const firstCategoryWithSubcategories = categoriesData.find(
          ({ subcategories }) => subcategories.length > 0,
        );
        if (firstCategoryWithSubcategories) {
          setSelectedMainCategory(firstCategoryWithSubcategories.category.id);
          setSelectedLevels([
            firstCategoryWithSubcategories.category.id,
            null,
            null,
            null,
            null,
            null,
          ]);
        }
      }
    };

    fetchAllSubcategories();
  }, [mainCategories]);

  // Get categories for a specific level
  // Level 0 shows subcategories of main category (selectedLevels[0])
  // Level 1 shows children of subcategory (selectedLevels[1])
  // Level 2 shows children of sub-subcategory (selectedLevels[2]), etc.
  const getCategoriesForLevel = (level: number): any[] => {
    // Level 0: Subcategories of selected main category
    if (level === 0) {
      const selectedCategory = categoriesWithSubcategoriesFiltered.find(
        ({ category }) => category.id === selectedLevels[0],
      );
      return selectedCategory?.subcategories || [];
    }

    // For deeper levels, find the category selected at this level and return its children
    const categoryId = selectedLevels[level];
    if (!categoryId) return [];

    // Find the main category
    const selectedCategory = categoriesWithSubcategoriesFiltered.find(
      ({ category }) => category.id === selectedLevels[0],
    );
    if (!selectedCategory) return [];

    // Check cache first
    const path = selectedLevels.slice(0, level + 1);
    const pathKey = path.join("-");
    if (loadedChildren.has(pathKey)) {
      return loadedChildren.get(pathKey) || [];
    }

    // Traverse the tree to find the category at this level
    let currentCategories = selectedCategory.subcategories;

    for (let i = 1; i <= level; i++) {
      const selectedId = selectedLevels[i];
      if (!selectedId) return [];

      const selectedItem = currentCategories.find(
        (cat: any) => cat.id === selectedId,
      );
      if (!selectedItem) {
        // Try cache for this level
        const cachePath = selectedLevels.slice(0, i + 1);
        const cacheKey = cachePath.join("-");
        if (loadedChildren.has(cacheKey)) {
          currentCategories = loadedChildren.get(cacheKey) || [];
          continue;
        }
        return [];
      }

      // If this is the target level, return its children
      if (i === level) {
        if (selectedItem.children && selectedItem.children.length > 0) {
          return selectedItem.children;
        }
        // Check cache
        if (loadedChildren.has(pathKey)) {
          return loadedChildren.get(pathKey) || [];
        }
        return [];
      }

      // Otherwise, continue traversing
      if (selectedItem.children && selectedItem.children.length > 0) {
        currentCategories = selectedItem.children;
      } else {
        // Check cache
        const cachePath = selectedLevels.slice(0, i + 1);
        const cacheKey = cachePath.join("-");
        if (loadedChildren.has(cacheKey)) {
          currentCategories = loadedChildren.get(cacheKey) || [];
        } else {
          return [];
        }
      }
    }

    return [];
  };

  // Handle category hover at a specific level (for categories with children)
  const handleCategoryHover = async (
    categoryId: number,
    level: number,
    category: any,
  ) => {
    const hasChildren =
      (category.children &&
        Array.isArray(category.children) &&
        category.children.length > 0) ||
      category.hasChildren ||
      (category._originalChildren &&
        Array.isArray(category._originalChildren) &&
        category._originalChildren.length > 0);

    if (!hasChildren) return;

    // Update selected levels - set this level and clear deeper levels
    const newSelectedLevels = [...selectedLevels];
    newSelectedLevels[level] = categoryId;
    // Clear all deeper levels
    for (let i = level + 1; i < 6; i++) {
      newSelectedLevels[i] = null;
    }
    setSelectedLevels(newSelectedLevels);

    // Fetch children if not already loaded
    const path = newSelectedLevels.slice(0, level + 1);
    const pathKey = path.join("-");

    if (!loadedChildren.has(pathKey)) {
      const originalChildren = category._originalChildren || [];
      const children = await fetchCategoryChildren(
        categoryId,
        originalChildren,
      );

      // Store loaded children
      setLoadedChildren((prev) => {
        const newMap = new Map(prev);
        newMap.set(pathKey, children);
        return newMap;
      });

      // Update the category tree structure
      setCategoriesWithSubcategories((prev) =>
        prev.map((catItem) => {
          if (catItem.category.id === selectedLevels[0]) {
            const updateCategoryTree = (
              categories: any[],
              targetId: number,
              newChildren: any[],
              currentLevel: number,
              targetLevel: number,
              pathIds: number[],
            ): any[] => {
              if (currentLevel === targetLevel) {
                return categories.map((cat) =>
                  cat.id === targetId ? { ...cat, children: newChildren } : cat,
                );
              }
              const nextId = pathIds[currentLevel];
              if (!nextId) return categories;

              return categories.map((cat) => ({
                ...cat,
                children: updateCategoryTree(
                  cat.children || [],
                  targetId,
                  newChildren,
                  currentLevel + 1,
                  targetLevel,
                  pathIds,
                ),
              }));
            };

            const updatedSubcategories = updateCategoryTree(
              catItem.subcategories,
              categoryId,
              children,
              1,
              level,
              newSelectedLevels.slice(1, level + 1),
            );
            return { ...catItem, subcategories: updatedSubcategories };
          }
          return catItem;
        }),
      );
    }
  };

  // Handle category click (only for leaf categories)
  const handleCategoryClick = (categoryId: number) => {
    // Navigate to category page
    const url = `/trending?category=${categoryId}`;
    if (onCategorySelect) {
      onCategorySelect(categoryId);
    } else {
      router.push(url);
    }
  };

  // Handle main category click (level 0)
  const handleMainCategoryClick = (categoryId: number) => {
    setSelectedMainCategory(categoryId);
    setSelectedLevels([categoryId, null, null, null, null, null]);
    setLoadedChildren(new Map());
  };

  // Mobile: Get current categories to display based on nav stack
  const getMobileCurrentCategories = (): {
    categories: any[];
    level: number;
    title: string;
  } => {
    const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

    if (!isMobile) {
      return { categories: [], level: -1, title: "" };
    }

    // If stack is empty, show main categories
    if (mobileNavStack.length === 0) {
      return {
        categories: categoriesWithSubcategoriesFiltered.map(
          ({ category }) => category,
        ),
        level: 0,
        title: "Categories",
      };
    }

    // Get the last item in the stack
    const lastItem = mobileNavStack[mobileNavStack.length - 1];

    // Get categories for the next level (children of the last selected category)
    // The level parameter in getCategoriesForLevel represents which level's children to show
    // So if lastItem.level is 0, we want level 0's children (which are at level 1)
    // If lastItem.level is 1, we want level 1's children (which are at level 2)
    const categories = getCategoriesForLevel(lastItem.level);

    return {
      categories: categories || [],
      level: lastItem.level,
      title: lastItem.categoryName,
    };
  };

  // Mobile: Handle category selection (push to stack or navigate)
  const handleMobileCategoryClick = async (category: any, level: number) => {
    const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
    if (!isMobile) return;

    // For main categories (level 0), we need to check if they have subcategories
    if (level === 0) {
      // Find the category in categoriesWithSubcategoriesFiltered
      const categoryWithSubs = categoriesWithSubcategoriesFiltered.find(
        ({ category: cat }) => cat.id === category.id,
      );

      if (categoryWithSubs && categoryWithSubs.subcategories.length > 0) {
        // Set as selected main category and load its children
        setSelectedMainCategory(category.id);
        setSelectedLevels([category.id, null, null, null, null, null]);
        setLoadedChildren(new Map());

        // Load first level children
        await handleCategoryHover(category.id, 0, category);

        // Push to navigation stack
        setMobileNavStack([
          {
            level: 0,
            categoryId: category.id,
            categoryName: category.name,
          },
        ]);
      } else {
        // No subcategories - navigate directly
        handleCategoryClick(category.id);
      }
      return;
    }

    // For subcategories (level > 0)
    const hasChildren =
      (category.children &&
        Array.isArray(category.children) &&
        category.children.length > 0) ||
      category.hasChildren ||
      (category._originalChildren &&
        Array.isArray(category._originalChildren) &&
        category._originalChildren.length > 0);

    if (hasChildren) {
      // Update selectedLevels to include this category
      const newSelectedLevels = [...selectedLevels];
      newSelectedLevels[level] = category.id;
      // Clear levels after this one
      for (let i = level + 1; i < newSelectedLevels.length; i++) {
        newSelectedLevels[i] = null;
      }
      setSelectedLevels(newSelectedLevels);

      // Load children if not already loaded
      await handleCategoryHover(category.id, level, category);

      // Push to navigation stack
      setMobileNavStack((prev) => [
        ...prev,
        {
          level: level,
          categoryId: category.id,
          categoryName: category.name,
        },
      ]);
    } else {
      // Leaf category - navigate
      handleCategoryClick(category.id);
    }
  };

  // Mobile: Handle back button
  const handleMobileBack = () => {
    setMobileNavStack((prev) => {
      const newStack = prev.slice(0, -1);

      // Update selectedLevels to match the new stack
      if (newStack.length === 0) {
        // Back to main categories - reset to initial state
        setSelectedMainCategory(null);
        setSelectedLevels([null, null, null, null, null, null]);
        setLoadedChildren(new Map());
      } else {
        // Update to the level before the last
        const lastItem = newStack[newStack.length - 1];
        const newSelectedLevels = [...selectedLevels];
        // Clear levels after the current one
        for (let i = lastItem.level + 2; i < newSelectedLevels.length; i++) {
          newSelectedLevels[i] = null;
        }
        setSelectedLevels(newSelectedLevels);
      }

      return newStack;
    });
  };

  // Listen for open/close events from header (for hover-based opening)
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

  // Show sidebar when hovered or explicitly opened
  const shouldShow = isOpen || isHovered;

  // Reset isHovered when drawer closes (from any source)
  useEffect(() => {
    if (!shouldShow) {
      setIsHovered(false);
    }
  }, [shouldShow]);

  // Dispatch close event when isOpen becomes false (to sync header button state)
  useEffect(() => {
    if (!isOpen && typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("closeCategorySidebar"));
    }
  }, [isOpen]);

  // Reset mobile nav stack when sidebar closes
  useEffect(() => {
    if (!shouldShow) {
      setMobileNavStack([]);
    }
  }, [shouldShow]);

  useEffect(() => {
    if (shouldShow) {
      setHasBeenShown(true);
    }
  }, [shouldShow]);

  // Prevent body scroll when sidebar is open
  useEffect(() => {
    if (shouldShow) {
      // Prevent body scroll
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";

      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [shouldShow]);

  if (!hasBeenShown && !shouldShow) return null;

  // === DESKTOP: Build breadcrumb trail from selectedLevels ===
  const getBreadcrumbTrail = (): Array<{ id: number; name: string; level: number }> => {
    const trail: Array<{ id: number; name: string; level: number }> = [];

    // Main category (level 0)
    if (selectedLevels[0]) {
      const mainCat = categoriesWithSubcategoriesFiltered.find(
        ({ category }) => category.id === selectedLevels[0],
      );
      if (mainCat) {
        trail.push({ id: mainCat.category.id, name: mainCat.category.name, level: 0 });
      }
    }

    // Deeper levels
    for (let i = 1; i < 6; i++) {
      if (!selectedLevels[i]) break;
      const cats = getCategoriesForLevel(i - 1);
      const found = cats.find((c: any) => c.id === selectedLevels[i]);
      if (found) {
        trail.push({ id: found.id, name: found.name, level: i });
      }
    }

    return trail;
  };

  // === DESKTOP: Get the deepest active subcategories to display in grid ===
  const getActiveGridCategories = (): { categories: any[]; level: number } => {
    // Find the deepest level that has a selection, and show its children
    for (let i = 5; i >= 0; i--) {
      if (selectedLevels[i]) {
        const cats = getCategoriesForLevel(i);
        if (cats.length > 0) {
          return { categories: cats, level: i };
        }
      }
    }
    // Fallback: show level 0 subcategories
    const cats = getCategoriesForLevel(0);
    return { categories: cats, level: 0 };
  };

  // Get title for a column based on selected category
  const getColumnTitle = (level: number): string => {
    if (level === 0) {
      const selectedCategory = categoriesWithSubcategoriesFiltered.find(
        ({ category }) => category.id === selectedLevels[0],
      );
      return translate(selectedCategory?.category.name) || t("categories");
    }

    const prevLevel = level - 1;
    const selectedId = selectedLevels[prevLevel + 1];
    if (!selectedId) return `Level ${level + 1}`;

    const categories = getCategoriesForLevel(prevLevel);
    const selectedCategory = categories.find((c: any) => c.id === selectedId);
    return translate(selectedCategory?.name) || `Level ${level + 1}`;
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className={cn(
          "fixed inset-0 z-[90] bg-black/20 backdrop-blur-[2px] transition-all duration-300",
          shouldShow
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0",
        )}
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            onClose();
          }
        }}
        onTouchStart={(e) => {
          if (window.innerWidth < 768) {
            onClose();
          }
        }}
      />

      {/* Category Dropdown Panel */}
      <div
        ref={containerRef}
        className={cn(
          "fixed left-0 right-0 z-[100] overflow-hidden",
          "bg-white shadow-[0_8px_30px_rgba(0,0,0,0.12)]",
          "transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
          // Mobile: full screen, Desktop: compact height
          "h-[calc(100vh-var(--header-height,116px))] md:h-[420px]",
          shouldShow
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-3 opacity-0",
        )}
        style={
          {
            top: `${headerHeight}px`,
            transformOrigin: "top center",
            "--header-height": `${headerHeight}px`,
          } as React.CSSProperties & { "--header-height": string }
        }
        onClick={(e) => e.stopPropagation()}
        onWheel={(e) => {
          const scrollableElement = (e.target as HTMLElement).closest(
            ".custom-scrollbar",
          ) as HTMLElement;

          if (scrollableElement) {
            const { scrollTop, scrollHeight, clientHeight } = scrollableElement;
            const canScrollUp = scrollTop > 0;
            const canScrollDown = scrollTop < scrollHeight - clientHeight;

            if (e.deltaY < 0 && !canScrollUp) {
              e.preventDefault();
              e.stopPropagation();
            } else if (e.deltaY > 0 && !canScrollDown) {
              e.preventDefault();
              e.stopPropagation();
            } else {
              e.stopPropagation();
            }
          } else {
            e.stopPropagation();
          }
        }}
        onTouchMove={(e) => e.stopPropagation()}
        dir={langDir}
      >
        {/* ============ MOBILE VIEW ============ */}
        <div className="flex h-full w-full flex-col md:hidden">
          {/* Mobile Header */}
          <div className="flex items-center justify-between border-b border-gray-100 bg-gradient-to-r from-slate-50 to-white px-4 py-3">
            {mobileNavStack.length > 0 ? (
              <button
                onClick={handleMobileBack}
                className={cn(
                  "flex items-center gap-2 text-gray-700 transition-colors hover:text-gray-900",
                  langDir === "rtl" ? "flex-row-reverse" : "",
                )}
              >
                <ChevronLeft
                  className={cn(
                    "h-5 w-5",
                    langDir === "rtl" ? "rotate-180" : "",
                  )}
                />
                <span className="text-sm font-medium">
                  {mobileNavStack.length > 1
                    ? translate(
                        mobileNavStack[mobileNavStack.length - 2].categoryName,
                      )
                    : t("all_categories")}
                </span>
              </button>
            ) : (
              <div></div>
            )}
          </div>

          {/* Mobile Category Name Section */}
          {mobileNavStack.length > 0 && (
            <div className="border-b border-gray-100 bg-white px-4 py-2.5">
              <span className="text-[15px] font-semibold text-gray-900">
                {translate(
                  mobileNavStack[mobileNavStack.length - 1].categoryName,
                )}
              </span>
            </div>
          )}

          {/* Mobile Category List */}
          <div className="custom-scrollbar flex-1 overflow-y-auto bg-white">
            <div className="py-1">
              {(() => {
                const { categories, title } = getMobileCurrentCategories();

                return categories.map((category: any) => {
                  const hasChildren =
                    (category.children &&
                      Array.isArray(category.children) &&
                      category.children.length > 0) ||
                    category.hasChildren ||
                    (category._originalChildren &&
                      Array.isArray(category._originalChildren) &&
                      category._originalChildren.length > 0);

                  return (
                    <div
                      key={category.id}
                      className={cn(
                        "mx-2 flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 transition-all duration-200",
                        "hover:bg-slate-50 active:bg-slate-100",
                      )}
                      onClick={() => {
                        const categoryLevel =
                          mobileNavStack.length === 0
                            ? 0
                            : mobileNavStack[mobileNavStack.length - 1].level + 1;
                        handleMobileCategoryClick(category, categoryLevel);
                      }}
                    >
                      {category.icon ? (
                        <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-slate-100">
                          <img
                            src={category.icon}
                            alt={category.name}
                            height={20}
                            width={20}
                            className="object-contain"
                          />
                        </div>
                      ) : (
                        <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-slate-100 to-slate-200">
                          <div className="h-4 w-4 rounded bg-slate-300" />
                        </div>
                      )}
                      <span className="flex-1 text-left text-[14px] font-medium text-gray-800">
                        {translate(category.name)}
                      </span>
                      {hasChildren && (
                        <ChevronLeft
                          className={cn(
                            "h-4 w-4 flex-shrink-0 text-gray-400",
                            langDir === "rtl" ? "" : "rotate-180",
                          )}
                        />
                      )}
                    </div>
                  );
                });
              })()}
            </div>
          </div>
        </div>

        {/* ============ DESKTOP VIEW — MEGA MENU ============ */}
        <div className="relative hidden h-full w-full md:flex">
          {/* LEFT SIDEBAR — Main Categories (narrow, dark-themed) */}
          {categoriesWithSubcategoriesFiltered.length > 0 && (
            <div
              className="custom-scrollbar h-full w-[220px] flex-shrink-0 overflow-y-auto border-r border-gray-100 bg-gradient-to-b from-slate-50 to-white"
              style={{
                scrollbarWidth: "thin",
                scrollbarColor: "transparent transparent",
              }}
            >
              <div className="py-1.5">
                {categoriesWithSubcategoriesFiltered.map(({ category }) => {
                  const isMainActive = selectedLevels[0] === category.id;

                  return (
                    <div
                      key={category.id}
                      className={cn(
                        "group relative mx-1.5 my-0.5 flex cursor-pointer items-center gap-2.5 rounded-lg px-3 py-2 transition-all duration-200",
                        isMainActive
                          ? "bg-blue-600 text-white shadow-sm shadow-blue-200"
                          : "text-gray-700 hover:bg-slate-100",
                      )}
                      onClick={() => {
                        handleMainCategoryClick(category.id);
                      }}
                    >
                      {category.icon ? (
                        <div className={cn(
                          "flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-md transition-colors",
                          isMainActive ? "bg-white/20" : "bg-white shadow-sm",
                        )}>
                          <img
                            src={category.icon}
                            alt={category.name}
                            height={18}
                            width={18}
                            className={cn(
                              "object-contain",
                              isMainActive && "brightness-0 invert",
                            )}
                          />
                        </div>
                      ) : (
                        <div className={cn(
                          "flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-md",
                          isMainActive ? "bg-white/20" : "bg-slate-200",
                        )}>
                          <div className={cn(
                            "h-3.5 w-3.5 rounded-sm",
                            isMainActive ? "bg-white/50" : "bg-slate-400",
                          )} />
                        </div>
                      )}
                      <span
                        className={cn(
                          "line-clamp-1 flex-1 text-left text-[13px] leading-tight",
                          isMainActive
                            ? "font-semibold"
                            : "font-medium group-hover:text-gray-900",
                        )}
                      >
                        {translate(category.name)}
                      </span>
                      {/* Active arrow indicator */}
                      <svg
                        className={cn(
                          "h-3.5 w-3.5 flex-shrink-0 transition-all",
                          isMainActive ? "text-white/70" : "text-gray-300 group-hover:text-gray-500",
                        )}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* RIGHT PANEL — Subcategories Grid */}
          <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
            {/* Breadcrumb Header */}
            {(() => {
              const trail = getBreadcrumbTrail();
              if (trail.length === 0) return null;

              return (
                <div className="flex items-center gap-1.5 border-b border-gray-100 bg-gradient-to-r from-slate-50/80 to-transparent px-5 py-2.5">
                  <span className="text-xs font-medium text-gray-400">{t("categories")}</span>
                  {trail.map((crumb, idx) => (
                    <React.Fragment key={crumb.id}>
                      <svg className="h-3 w-3 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                      <button
                        onClick={() => {
                          if (crumb.level === 0) {
                            handleMainCategoryClick(crumb.id);
                          } else {
                            // Reset levels below this one
                            const newLevels = [...selectedLevels];
                            for (let j = crumb.level + 1; j < 6; j++) {
                              newLevels[j] = null;
                            }
                            setSelectedLevels(newLevels);
                          }
                        }}
                        className={cn(
                          "text-xs font-medium transition-colors",
                          idx === trail.length - 1
                            ? "text-blue-600"
                            : "text-gray-500 hover:text-blue-600",
                        )}
                      >
                        {translate(crumb.name)}
                      </button>
                    </React.Fragment>
                  ))}
                </div>
              );
            })()}

            {/* Subcategories Grid Content */}
            <div className="custom-scrollbar flex-1 overflow-y-auto px-5 py-4"
              style={{
                scrollbarWidth: "thin",
                scrollbarColor: "transparent transparent",
              }}
            >
              {(() => {
                const { categories: gridCategories, level: gridLevel } = getActiveGridCategories();

                if (gridCategories.length === 0) {
                  return (
                    <div className="flex h-full items-center justify-center">
                      <p className="text-sm text-gray-400">{t("categories")}</p>
                    </div>
                  );
                }

                return (
                  <div className="grid grid-cols-3 gap-2 lg:grid-cols-4 xl:grid-cols-5">
                    {gridCategories.map((item: any) => {
                      const hasChildren =
                        (item.children &&
                          Array.isArray(item.children) &&
                          item.children.length > 0) ||
                        item.hasChildren ||
                        (item._originalChildren &&
                          Array.isArray(item._originalChildren) &&
                          item._originalChildren.length > 0);

                      const isSelected = selectedLevels[gridLevel + 1] === item.id;

                      return (
                        <div
                          key={item.id}
                          className={cn(
                            "group relative flex cursor-pointer items-center gap-2.5 rounded-xl border px-3 py-2.5 transition-all duration-200",
                            isSelected
                              ? "border-blue-200 bg-blue-50 shadow-sm shadow-blue-100"
                              : "border-gray-100 bg-white hover:border-blue-100 hover:bg-blue-50/50 hover:shadow-sm",
                          )}
                          onClick={() => {
                            if (hasChildren) {
                              handleCategoryHover(item.id, gridLevel + 1, item);
                            } else {
                              handleCategoryClick(item.id);
                            }
                          }}
                        >
                          {item.icon ? (
                            <div className={cn(
                              "flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg transition-colors",
                              isSelected ? "bg-blue-100" : "bg-slate-100 group-hover:bg-blue-100",
                            )}>
                              <img
                                src={item.icon}
                                alt={item.name}
                                height={18}
                                width={18}
                                className="object-contain"
                              />
                            </div>
                          ) : (
                            <div className={cn(
                              "flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg transition-colors",
                              isSelected ? "bg-blue-100" : "bg-slate-100 group-hover:bg-blue-100",
                            )}>
                              <div className="h-3.5 w-3.5 rounded-sm bg-slate-300" />
                            </div>
                          )}
                          <span className={cn(
                            "line-clamp-2 flex-1 text-left text-[13px] leading-tight",
                            isSelected
                              ? "font-semibold text-blue-700"
                              : "font-medium text-gray-700 group-hover:text-gray-900",
                          )}>
                            {translate(item.name)}
                          </span>
                          {hasChildren && (
                            <svg
                              className={cn(
                                "h-3.5 w-3.5 flex-shrink-0 transition-colors",
                                isSelected ? "text-blue-400" : "text-gray-300 group-hover:text-blue-400",
                              )}
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 5l7 7-7 7"
                              />
                            </svg>
                          )}
                        </div>
                      );
                    })}
                  </div>
                );
              })()}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CategorySidebar;
