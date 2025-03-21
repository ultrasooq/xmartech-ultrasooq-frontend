import React, { useState, useMemo } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { IBrands, ISelectOptions } from "@/utils/types/common.types";
import { useBrands } from "@/apis/queries/masters.queries";
import { debounce } from "lodash";
import { useTranslations } from "next-intl";

const BrandFilterList = () => {
  const t = useTranslations();
  const [selectedBrandIds, setSelectedBrandIds] = useState<number[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const brandsQuery = useBrands({
    term: searchTerm,
  });

  const handleDebounce = debounce((event: any) => {
    setSearchTerm(event.target.value);
  }, 1000);

  const memoizedBrands = useMemo(() => {
    return (
      brandsQuery?.data?.data.map((item: IBrands) => {
        return { label: item.brandName, value: item.id };
      }) || []
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [brandsQuery?.data?.data?.length]);

  const handleBrandChange = (
    checked: boolean | string,
    item: ISelectOptions,
  ) => {
    let tempArr = selectedBrandIds || [];
    if (checked && !tempArr.find((ele: number) => ele === item.value)) {
      tempArr = [...tempArr, item.value];
    }

    if (!checked && tempArr.find((ele: number) => ele === item.value)) {
      tempArr = tempArr.filter((ele: number) => ele !== item.value);
    }
    setSelectedBrandIds(tempArr);
  };

  return (
    <div className="trending-search-sec">
      <div className="container m-auto">
        <div className="left-filter">
          <Accordion
            type="multiple"
            defaultValue={["brand"]}
            className="filter-col"
          >
            <AccordionItem value="brand">
              <AccordionTrigger className="px-3 text-base hover:!no-underline">
                {t("by_brand")}
              </AccordionTrigger>
              <AccordionContent>
                <div className="filter-sub-header">
                  <Input
                    type="text"
                    placeholder={t("search_brand")}
                    className="custom-form-control-s1 searchInput rounded-none"
                    onChange={handleDebounce}
                  />
                </div>
                <div className="filter-body-part">
                  <div className="filter-checklists">
                    {!memoizedBrands.length ? (
                      <p className="text-center text-sm font-medium">
                        {t("no_data_found")}
                      </p>
                    ) : null}
                    {memoizedBrands.map((item: ISelectOptions) => (
                      <div key={item.value} className="div-li">
                        <Checkbox
                          id={item.label}
                          className="border border-solid border-gray-300 data-[state=checked]:!bg-dark-orange"
                          onCheckedChange={(checked) =>
                            handleBrandChange(checked, item)
                          }
                          checked={selectedBrandIds.includes(item.value)}
                        />
                        <div className="grid gap-1.5 leading-none">
                          <label
                            htmlFor={item.label}
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            {item.label}
                          </label>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </div>
  );
};

export default BrandFilterList;
