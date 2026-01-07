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

if (typeof document !== 'undefined') {
  const styleId = 'category-sidebar-scrollbar-styles';
  if (!document.getElementById(styleId)) {
    const style = document.createElement('style');
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

  // Handle hover state with delay
  useEffect(() => {
    if (isHovered) {
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current);
        closeTimeoutRef.current = null;
      }
    } else {
      closeTimeoutRef.current = setTimeout(() => {
        onClose();
      }, 300);
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
      
      const childrenWithNested = children.map((child: any) => {
        const hasChildren = child.children && Array.isArray(child.children) && child.children.length > 0;
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
  const fetchCategoryChildren = async (categoryId: number, originalChildren?: any[]): Promise<any[]> => {
    try {
      if (originalChildren && originalChildren.length > 0) {
        return originalChildren.map((child: any) => {
          const hasChildren = child.children && Array.isArray(child.children) && child.children.length > 0;
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
        const hasChildren = child.children && Array.isArray(child.children) && child.children.length > 0;
        return {
          ...child,
          children: [],
          hasChildren: hasChildren,
          _originalChildren: child.children || [],
        };
      });
    } catch (error) {
      console.error(`Error fetching children for category ${categoryId}:`, error);
      return [];
    }
  };

  // Fetch all subcategories for all main categories
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

      if (!selectedMainCategory && categoriesData.length > 0) {
        const firstCategoryWithSubcategories = categoriesData.find(
          ({ subcategories }) => subcategories.length > 0,
        );
        if (firstCategoryWithSubcategories) {
          setSelectedMainCategory(firstCategoryWithSubcategories.category.id);
          setSelectedLevels([firstCategoryWithSubcategories.category.id, null, null, null, null, null]);
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
    const pathKey = path.join('-');
    if (loadedChildren.has(pathKey)) {
      return loadedChildren.get(pathKey) || [];
    }

    // Traverse the tree to find the category at this level
    let currentCategories = selectedCategory.subcategories;
    
    for (let i = 1; i <= level; i++) {
      const selectedId = selectedLevels[i];
      if (!selectedId) return [];
      
      const selectedItem = currentCategories.find((cat: any) => cat.id === selectedId);
      if (!selectedItem) {
        // Try cache for this level
        const cachePath = selectedLevels.slice(0, i + 1);
        const cacheKey = cachePath.join('-');
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
        const cacheKey = cachePath.join('-');
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
  const handleCategoryHover = async (categoryId: number, level: number, category: any) => {
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
    const pathKey = path.join('-');
    
    if (!loadedChildren.has(pathKey)) {
      const originalChildren = category._originalChildren || [];
      const children = await fetchCategoryChildren(categoryId, originalChildren);
      
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
    window.open(url, "_blank", "noopener,noreferrer");
  };

  // Handle main category hover (level 0)
  const handleMainCategoryHover = (categoryId: number) => {
    setSelectedMainCategory(categoryId);
    setSelectedLevels([categoryId, null, null, null, null, null]);
    setLoadedChildren(new Map());
  };

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
      window.removeEventListener("openCategorySidebar", handleOpenCategorySidebar);
      window.removeEventListener("closeCategorySidebar", handleCloseCategorySidebar);
    };
  }, []);

  // Show sidebar when hovered or explicitly opened
  const shouldShow = isOpen || isHovered;

  useEffect(() => {
    if (shouldShow) {
      setHasBeenShown(true);
    }
  }, [shouldShow]);

  if (!hasBeenShown && !shouldShow) return null;

  // Scrollable main category column component
  const ScrollableMainColumn: React.FC<{
    children: React.ReactNode;
  }> = ({ children }) => {
    const [isScrolling, setIsScrolling] = useState(false);
    const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const columnRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      const column = columnRef.current;
      if (!column) return;

      const handleScroll = () => {
        setIsScrolling(true);
        if (scrollTimeoutRef.current) {
          clearTimeout(scrollTimeoutRef.current);
        }
        scrollTimeoutRef.current = setTimeout(() => {
          setIsScrolling(false);
        }, 1000);
      };

      column.addEventListener('scroll', handleScroll);
      return () => {
        column.removeEventListener('scroll', handleScroll);
        if (scrollTimeoutRef.current) {
          clearTimeout(scrollTimeoutRef.current);
        }
      };
    }, []);

    return (
      <div
        ref={columnRef}
        className={cn(
          "flex-shrink-0 w-[240px] h-full overflow-y-auto bg-gray-50 border-r border-gray-200 custom-scrollbar",
          isScrolling && "scrolling"
        )}
        style={{
          scrollbarWidth: 'thin',
          scrollbarColor: 'transparent transparent',
        }}
      >
        {children}
      </div>
    );
  };

  // Scrollable horizontal container component
  const ScrollableHorizontalContainer: React.FC<{
    children: React.ReactNode;
  }> = ({ children }) => {
    const [isScrolling, setIsScrolling] = useState(false);
    const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      const container = containerRef.current;
      if (!container) return;

      const handleScroll = () => {
        setIsScrolling(true);
        if (scrollTimeoutRef.current) {
          clearTimeout(scrollTimeoutRef.current);
        }
        scrollTimeoutRef.current = setTimeout(() => {
          setIsScrolling(false);
        }, 1000);
      };

      container.addEventListener('scroll', handleScroll);
      return () => {
        container.removeEventListener('scroll', handleScroll);
        if (scrollTimeoutRef.current) {
          clearTimeout(scrollTimeoutRef.current);
        }
      };
    }, []);

    return (
      <div
        ref={containerRef}
        className={cn(
          "flex-1 flex overflow-x-auto min-w-0 h-full custom-scrollbar",
          isScrolling && "scrolling"
        )}
        style={{
          scrollbarWidth: 'thin',
          scrollbarColor: 'transparent transparent',
        }}
      >
        {children}
      </div>
    );
  };

  // Scrollable column component
  const ScrollableColumn: React.FC<{
    level: number;
    title: string;
    categories: any[];
    selectedId: number | null;
    onCategoryHover: (categoryId: number, category: any) => void;
    onCategoryClick: (categoryId: number) => void;
  }> = ({ level, title, categories, selectedId, onCategoryHover, onCategoryClick }) => {
    const [isScrolling, setIsScrolling] = useState(false);
    const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const columnRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      const column = columnRef.current;
      if (!column) return;

      const handleScroll = () => {
        setIsScrolling(true);
        if (scrollTimeoutRef.current) {
          clearTimeout(scrollTimeoutRef.current);
        }
        scrollTimeoutRef.current = setTimeout(() => {
          setIsScrolling(false);
        }, 1000);
      };

      column.addEventListener('scroll', handleScroll);
      return () => {
        column.removeEventListener('scroll', handleScroll);
        if (scrollTimeoutRef.current) {
          clearTimeout(scrollTimeoutRef.current);
        }
      };
    }, []);

    return (
      <div
        ref={columnRef}
        className={cn(
          "flex-shrink-0 w-[240px] h-full overflow-y-auto border-r border-gray-200 bg-white custom-scrollbar",
          isScrolling && "scrolling"
        )}
        style={{
          scrollbarWidth: 'thin',
          scrollbarColor: 'transparent transparent',
        }}
      >
        <div className="p-4">
          <h3 className="text-sm font-semibold text-gray-900 mb-3 sticky top-0 bg-white pb-2 border-b border-gray-200 z-10">
            {title}
          </h3>
          <div className="space-y-1">
            {categories.map((item: any) => {
              const isSelected = selectedId === item.id;
              const hasChildren =
                (item.children &&
                  Array.isArray(item.children) &&
                  item.children.length > 0) ||
                item.hasChildren ||
                (item._originalChildren &&
                  Array.isArray(item._originalChildren) &&
                  item._originalChildren.length > 0);

              return (
                <div
                  key={item.id}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 rounded-md transition-colors",
                    hasChildren ? "cursor-default" : "cursor-pointer",
                    isSelected
                      ? "bg-blue-50 text-blue-700 font-medium border border-blue-200"
                      : "hover:bg-gray-50 text-gray-700",
                  )}
                  onMouseEnter={() => {
                    if (hasChildren) {
                      onCategoryHover(item.id, item);
                    }
                  }}
                  onClick={() => {
                    if (!hasChildren) {
                      onCategoryClick(item.id);
                    }
                  }}
                >
                  {item.icon ? (
                    <img
                      src={item.icon}
                      alt={item.name}
                      height={20}
                      width={20}
                      className="object-contain flex-shrink-0"
                    />
                  ) : (
                    <div className="h-5 w-5 flex-shrink-0 rounded bg-gray-200" />
                  )}
                  <span className="text-sm flex-1 text-left line-clamp-1">
                    {item.name}
                  </span>
                  {hasChildren && (
                    <svg
                      className="w-4 h-4 text-gray-400 flex-shrink-0"
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
        </div>
      </div>
    );
  };

  // Render a category column
  const renderCategoryColumn = (level: number, title: string) => {
    const categories = getCategoriesForLevel(level);
    if (categories.length === 0) return null;

    const selectedId = selectedLevels[level + 1];

    return (
      <ScrollableColumn
        key={level}
        level={level}
        title={title}
        categories={categories}
        selectedId={selectedId}
        onCategoryHover={(categoryId, category) => handleCategoryHover(categoryId, level + 1, category)}
        onCategoryClick={handleCategoryClick}
      />
    );
  };

  // Get title for a column based on selected category
  const getColumnTitle = (level: number): string => {
    if (level === 0) {
      // Show the main category name for level 0
      const selectedCategory = categoriesWithSubcategoriesFiltered.find(
        ({ category }) => category.id === selectedLevels[0],
      );
      return selectedCategory?.category.name || "Categories";
    }
    
    // For deeper levels, show the parent category name (the one selected at the previous level)
    const prevLevel = level - 1;
    const selectedId = selectedLevels[prevLevel + 1];
    if (!selectedId) return `Level ${level + 1}`;
    
    const categories = getCategoriesForLevel(prevLevel);
    const selectedCategory = categories.find((c: any) => c.id === selectedId);
    return selectedCategory?.name || `Level ${level + 1}`;
  };

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
          "fixed right-0 left-0 z-[100] h-[400px] bg-white shadow-2xl",
          "transition-all duration-500 ease-out",
          shouldShow
            ? "pointer-events-auto translate-y-0 scale-y-100 opacity-100"
            : "pointer-events-none -translate-y-8 scale-y-95 opacity-0",
        )}
        style={{
          top: `${headerHeight}px`,
          transformOrigin: "top center",
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        dir={langDir}
      >
        <div className="relative flex h-full w-full items-start justify-start bg-white">
          {/* Column 1: Main Categories (Left Sidebar) */}
          {categoriesWithSubcategoriesFiltered.length > 0 && (
            <ScrollableMainColumn>
              <div className="py-2">
                {categoriesWithSubcategoriesFiltered.map(
                  ({ category }) => {
                    const isMainActive = selectedLevels[0] === category.id;

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
                        onMouseEnter={() => handleMainCategoryHover(category.id)}
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
            </ScrollableMainColumn>
          )}

          {/* Columns 2-6: Subcategories (Dynamic Columns) */}
          <ScrollableHorizontalContainer>
            {selectedLevels[0] && renderCategoryColumn(0, getColumnTitle(0))}
            {selectedLevels[1] && renderCategoryColumn(1, getColumnTitle(1))}
            {selectedLevels[2] && renderCategoryColumn(2, getColumnTitle(2))}
            {selectedLevels[3] && renderCategoryColumn(3, getColumnTitle(3))}
            {selectedLevels[4] && renderCategoryColumn(4, getColumnTitle(4))}
            {selectedLevels[5] && renderCategoryColumn(5, getColumnTitle(5))}
          </ScrollableHorizontalContainer>
        </div>
      </div>
    </>
  );
};

export default CategorySidebar;
