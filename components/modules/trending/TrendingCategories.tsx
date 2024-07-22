import { useCategoryStore } from "@/lib/categoryStore";
import React, { useEffect, useState } from "react";
import TrendingOptionCard from "../home/TrendingOptionCard";
import TrendingCard from "../home/TrendingCard";

const TrendingCategories = () => {
  const category = useCategoryStore();
  const [activeSecondLevelCategoryIndex, setActiveSecondLevelCategoryIndex] =
    useState(0);
  const [activeThirdLevelCategoryIndex, setActiveThirdLevelCategoryIndex] =
    useState(0);

  //   console.log(category.subCategories);
  //   console.log(category.subSubCategories);
  // console.log(category.secondLevelCategoryIndex);
  //   console.log(activeSecondLevelCategoryIndex);

  useEffect(() => {
    setActiveSecondLevelCategoryIndex(category.secondLevelCategoryIndex || 0);
  }, [category.secondLevelCategoryIndex]);

  return category.subCategories?.length || category.subSubCategories?.length ? (
    <div className="container m-auto mb-4 px-3">
      <div className="flex flex-wrap">
        <div className="mb-5 w-full">
          <h3 className="text-2xl font-normal capitalize text-color-dark">
            Search Trending
          </h3>
        </div>
        <div className="w-full">
          <div className="bg-neutral-100 p-4 lg:p-8">
            <div className="block w-full">
              {category.subCategoryParentName ? (
                <h3 className="mb-3 text-base font-semibold text-dark-orange">
                  {category.subCategoryParentName}
                </h3>
              ) : null}
              <ul className="mb-2 grid grid-cols-8 gap-3 border-b border-solid border-gray-300">
                {category.subCategories.map((item: any, index: number) => (
                  <TrendingOptionCard
                    key={item?.id}
                    item={{ name: item?.name, path: item?.icon }}
                    isActiveIndex={activeSecondLevelCategoryIndex === index}
                    onActiveCategory={() => {
                      category.setSubSubCategories(item?.children || []);
                      setActiveSecondLevelCategoryIndex(index);
                    }}
                  />
                ))}
              </ul>
            </div>

            {category.subSubCategories.length ? (
              <div className="block w-full pt-3">
                {category.subSubCategoryParentName ? (
                  <h3 className="mb-3 text-base font-semibold text-dark-orange">
                    {category.subSubCategoryParentName}
                  </h3>
                ) : null}
                <div className="grid w-full grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-6 lg:grid-cols-8">
                  {category.subSubCategories.map((item, index: number) => (
                    <TrendingCard
                      key={item?.id}
                      item={{ name: item?.name, path: item?.icon }}
                      isActiveIndex={activeThirdLevelCategoryIndex === index}
                      onActiveCategory={() => {
                        console.log(item);
                        setActiveThirdLevelCategoryIndex(index);
                      }}
                    />
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  ) : null;
};

export default TrendingCategories;
