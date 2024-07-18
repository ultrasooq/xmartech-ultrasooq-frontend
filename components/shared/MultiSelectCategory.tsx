import React, { useEffect, useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { MdOutlineImageNotSupported } from "react-icons/md";
import { useCategory } from "@/apis/queries/category.queries";
import { Button } from "../ui/button";
import { menuBarIconList } from "@/utils/constants";
import { Checkbox } from "../ui/checkbox";
import { useFormContext } from "react-hook-form";

type CategoryProps = {
  id: number;
  parentId: number;
  name: string;
  icon: string;
  children: any;
};

type FormCategoryProps = {
  categoryId: number;
  categoryLocation: string;
};

type MultiSelectCategoryProps = {
  name: string;
  branchId?: string | undefined | null;
};

const MultiSelectCategory: React.FC<MultiSelectCategoryProps> = ({
  name,
  branchId,
}) => {
  const formContext = useFormContext();
  const [menuId, setMenuId] = useState<number | undefined>();
  const [categoryId, setCategoryId] = useState<number | undefined>();
  const [assignedToId, setAssignedToId] = useState();
  const [subCategoryIndex, setSubCategoryIndex] = useState(0);
  const [subSubCategoryIndex, setSubSubCategoryIndex] = useState(0);
  const [subSubSubCategoryIndex, setSubSubSubCategoryIndex] = useState(0);
  const [multiSubCategoryList, setMultiSubCategoryList] = useState([]);
  const [multiSubSubCategoryList, setMultiSubSubCategoryList] = useState([]);
  const [multiSubSubSubCategoryList, setMultiSubSubSubCategoryList] = useState(
    [],
  );

  const watcher = formContext.watch(name);

  const categoryQuery = useCategory("187");
  const subCategoryQuery = useCategory(
    categoryId ? String(categoryId) : "",
    !!categoryId,
  );

  const memoizedMenu = useMemo(() => {
    let tempArr: any = [];
    if (categoryQuery.data?.data) {
      tempArr = categoryQuery.data.data?.children?.map(
        (item: any, index: number) => {
          return {
            name: item.name,
            id: item.id,
            icon: menuBarIconList[index + 1],
          };
        },
      );
    }

    return tempArr || [];
  }, [categoryQuery.data?.data]);

  const memoizedCategory = useMemo(() => {
    let tempArr: any = [];
    if (categoryQuery.data?.data) {
      tempArr = categoryQuery.data.data?.children?.find(
        (item: { id: number }) => item.id === menuId,
      )?.children;
    }
    return tempArr || [];
  }, [categoryQuery.data?.data, menuId]);

  const memoizedSubCategory = useMemo(() => {
    let tempArr: any = [];
    if (subCategoryQuery.data?.data) {
      tempArr = subCategoryQuery.data.data?.children;
    }
    return tempArr || [];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subCategoryQuery.data?.data, categoryId]);

  useEffect(() => {
    if (branchId && (watcher ?? []).length) {
      const id = watcher[0]?.categoryLocation?.split(",")[0];
      if (id) setMenuId(Number(id));
    }
  }, [branchId, watcher]);

  useEffect(() => {
    if (branchId && (watcher ?? []).length && menuId) {
      const id = watcher[0]?.categoryLocation?.split(",")[1];
      if (id) setCategoryId(Number(id));
    }
  }, [branchId, watcher, menuId]);

  useEffect(() => {
    if (branchId && (watcher ?? []).length && menuId && categoryId) {
      const tempArr: any = [];
      memoizedSubCategory.forEach((item: any) => {
        if (watcher.find((ele: any) => ele.categoryId === item.id))
          tempArr.push(item);
      });

      setMultiSubCategoryList(tempArr);
    }
  }, [branchId, watcher, menuId, categoryId, memoizedSubCategory]);

  useEffect(() => {
    if (
      branchId &&
      (watcher ?? []).length &&
      menuId &&
      categoryId &&
      multiSubCategoryList.length
    ) {
      const tempArr: any = [];
      const tempArr2: any = multiSubCategoryList
        .map((item: any) => item.children)
        .flat();
      tempArr2.forEach((item: any) => {
        if (watcher.find((ele: any) => ele.categoryId === item.id))
          tempArr.push(item);
      });

      setMultiSubSubCategoryList(tempArr);
    }
  }, [branchId, watcher, menuId, categoryId, multiSubCategoryList]);

  useEffect(() => {
    if (
      branchId &&
      (watcher ?? []).length &&
      menuId &&
      categoryId &&
      multiSubCategoryList.length &&
      multiSubSubCategoryList.length
    ) {
      const tempArr: any = [];
      const tempArr2: any = multiSubSubCategoryList
        .map((item: any) => item.children)
        .flat();
      tempArr2.forEach((item: any) => {
        if (watcher.find((ele: any) => ele.categoryId === item.id))
          tempArr.push(item);
      });

      setMultiSubSubSubCategoryList(tempArr);
    }
  }, [
    branchId,
    watcher,
    menuId,
    categoryId,
    multiSubCategoryList,
    multiSubSubCategoryList,
  ]);

  // console.log(multiSubCategoryList);
  // console.log(multiSubSubCategoryList);
  // console.log(multiSubSubSubCategoryList);
  // console.log(watcher);
  // console.log(memoizedMenu);
  // console.log(menuId);
  // console.log(memoizedCategory);
  // console.log(categoryId);
  // console.log(memoizedSubCategory);

  return (
    <div>
      <div className="space-x-2">
        {memoizedMenu.map((item: any) => (
          <Button
            type="button"
            key={item.id}
            onClick={() => {
              setMenuId(item.id);
              setCategoryId(undefined);
              setAssignedToId(undefined);
            }}
          >
            <div className="flex items-center gap-x-3">
              <Image
                src={item.icon}
                alt={item?.name}
                height={0}
                width={0}
                className="h-7 w-7"
              />{" "}
              <p>{item?.name}</p>
            </div>
          </Button>
        ))}
      </div>

      {memoizedMenu.length ? (
        <div className="my-2 border border-solid border-gray-300" />
      ) : null}

      <div className="flex items-center gap-x-2">
        {memoizedCategory.map((item: any) => (
          <Button
            type="button"
            key={item.id}
            onClick={() => {
              if (item?.assignTo) {
                setCategoryId(item.assignTo);
                setAssignedToId(item.id);
              } else {
                setCategoryId(undefined);
                setAssignedToId(undefined);
              }
            }}
            variant="secondary"
            className={cn(
              "py-3 text-sm font-semibold capitalize text-color-dark sm:text-base",
              item?.id === assignedToId ? "underline" : "no-underline",
            )}
          >
            <p>{item.name}</p>
          </Button>
        ))}
      </div>

      {menuId ? (
        <div className="my-2 border border-solid border-gray-300" />
      ) : null}

      <div className="dropdown">
        {memoizedSubCategory?.length ? (
          <Button type="button" variant="destructive" className="dropbtn">
            <p className="font-normal capitalize ">All Categories</p>
          </Button>
        ) : null}

        {memoizedSubCategory?.length ? (
          <div className="dropdown-content">
            {memoizedSubCategory?.map((item: CategoryProps, index: number) => (
              <div
                key={item?.id}
                className={cn(
                  "dropdown-content-child flex cursor-pointer items-center justify-start gap-x-2 p-3",
                  memoizedSubCategory?.length
                    ? index === subCategoryIndex
                      ? "dropdown-active-child"
                      : null
                    : null,
                )}
                onMouseEnter={() => setSubCategoryIndex(index)}
                onClick={() => {
                  setSubCategoryIndex(index);
                }}
              >
                <Checkbox
                  className="border border-solid border-gray-300 data-[state=checked]:!bg-dark-orange"
                  checked={
                    multiSubCategoryList?.filter(
                      (ele: any) => ele.id === item.id,
                    ).length > 0
                  }
                  onCheckedChange={(checked) => {
                    let tempArr: any = multiSubCategoryList || [];
                    // if true and does not exist in array then push
                    if (
                      checked &&
                      !tempArr.find((ele: CategoryProps) => ele.id === item.id)
                    ) {
                      tempArr = [...tempArr, item];
                    }

                    // if false and exist in array then remove
                    if (
                      !checked &&
                      tempArr.find((ele: CategoryProps) => ele.id === item.id)
                    ) {
                      tempArr = tempArr.filter(
                        (ele: any) => ele.id !== item.id,
                      );
                    }
                    formContext.setValue(
                      name,
                      tempArr.map((ele: any) => ({
                        categoryId: ele.id,
                        categoryLocation: `${menuId},${categoryId},${ele.id.toString()}`,
                      })),
                    );

                    setMultiSubCategoryList(tempArr);
                  }}
                />
                {item?.icon ? (
                  <Image
                    src={item.icon}
                    alt={item?.name}
                    height={24}
                    width={24}
                  />
                ) : (
                  <MdOutlineImageNotSupported size={24} />
                )}
                <p className="text-center text-sm">{item?.name}</p>
              </div>
            ))}
          </div>
        ) : null}

        {multiSubCategoryList
          ?.map(
            (item: { id: number; name: string; icon: string; children: any }) =>
              item?.children,
          )
          ?.flat()?.length ? (
          <div className="dropdown-content-second">
            {multiSubCategoryList
              ?.map((item: CategoryProps) => item?.children)
              ?.flat()
              ?.map((item: CategoryProps, index: number) => (
                <div
                  key={item?.id}
                  className={cn(
                    "dropdown-content-child flex cursor-pointer items-center justify-start gap-x-2 p-3",
                    memoizedSubCategory?.[subCategoryIndex]?.children?.length
                      ? index === subSubCategoryIndex
                        ? "dropdown-active-child"
                        : null
                      : null,
                  )}
                  onMouseEnter={() => setSubSubCategoryIndex(index)}
                  onClick={() => {
                    setSubSubCategoryIndex(index);
                  }}
                >
                  <Checkbox
                    className="border border-solid border-gray-300 data-[state=checked]:!bg-dark-orange"
                    checked={
                      multiSubSubCategoryList?.filter(
                        (ele: any) => ele.id === item.id,
                      ).length > 0
                    }
                    onCheckedChange={(checked) => {
                      let tempArr: any = multiSubSubCategoryList || [];
                      // if true and does not exist in array then push
                      if (
                        checked &&
                        !tempArr.find(
                          (ele: CategoryProps) => ele.id === item.id,
                        )
                      ) {
                        tempArr = [...tempArr, item];

                        formContext.setValue(name, [
                          ...(watcher ?? []),
                          {
                            categoryId: item.id,
                            categoryLocation: `${menuId},${categoryId},${item.parentId.toString()},${item.id.toString()}`,
                          },
                        ]);
                      }

                      // if false and exist in array then remove
                      if (
                        !checked &&
                        tempArr.find((ele: CategoryProps) => ele.id === item.id)
                      ) {
                        tempArr = tempArr.filter(
                          (ele: any) => ele.id !== item.id,
                        );

                        formContext.setValue(
                          name,
                          watcher?.filter((ele: FormCategoryProps) => {
                            if (ele.categoryId !== item.id) {
                              return ele;
                            }
                          }),
                        );
                      }

                      setMultiSubSubCategoryList(tempArr);
                    }}
                  />

                  {item?.icon ? (
                    <Image
                      src={item.icon}
                      alt={item?.name}
                      height={24}
                      width={24}
                    />
                  ) : (
                    <MdOutlineImageNotSupported size={24} />
                  )}
                  <p className="text-center text-sm">{item?.name}</p>
                </div>
              ))}
          </div>
        ) : null}

        {multiSubSubCategoryList
          ?.map(
            (item: { id: number; name: string; icon: string; children: any }) =>
              item?.children,
          )
          ?.flat()?.length ? (
          <div className="dropdown-content-third p-3">
            <div className="grid grid-cols-5">
              {multiSubSubCategoryList
                ?.map((item: CategoryProps) => item?.children)
                ?.flat()
                ?.map((item: CategoryProps, index: number) => (
                  <div
                    key={item?.id}
                    className={cn(
                      "dropdown-content-child flex cursor-pointer items-start justify-start gap-y-2 p-3",
                      memoizedSubCategory?.[subCategoryIndex]?.children?.[
                        subSubCategoryIndex
                      ]?.children?.length
                        ? index === subSubSubCategoryIndex
                          ? "dropdown-active-child"
                          : null
                        : null,
                    )}
                    onMouseEnter={() => setSubSubSubCategoryIndex(index)}
                    onClick={() => {
                      setSubSubSubCategoryIndex(index);
                    }}
                  >
                    <Checkbox
                      className="border border-solid border-gray-300 data-[state=checked]:!bg-dark-orange"
                      checked={
                        multiSubSubSubCategoryList?.filter(
                          (ele: any) => ele.id === item.id,
                        ).length > 0
                      }
                      onCheckedChange={(checked) => {
                        let tempArr: any = multiSubSubSubCategoryList || [];
                        // if true and does not exist in array then push
                        if (
                          checked &&
                          !tempArr.find(
                            (ele: CategoryProps) => ele.id === item.id,
                          )
                        ) {
                          tempArr = [...tempArr, item];

                          let grandParentId;
                          watcher?.map((ele: FormCategoryProps) => {
                            if (ele.categoryId === item.parentId) {
                              const tempId =
                                ele.categoryLocation.split(",")?.[2];

                              grandParentId = tempId;
                            }
                          });

                          formContext.setValue(name, [
                            ...(watcher ?? []),
                            {
                              categoryId: item.id,
                              categoryLocation: `${menuId},${categoryId},${grandParentId},${item.parentId.toString()},${item.id.toString()}`,
                            },
                          ]);
                        }

                        // if false and exist in array then remove
                        if (
                          !checked &&
                          tempArr.find(
                            (ele: CategoryProps) => ele.id === item.id,
                          )
                        ) {
                          tempArr = tempArr.filter(
                            (ele: any) => ele.id !== item.id,
                          );

                          formContext.setValue(
                            name,
                            watcher?.filter((ele: FormCategoryProps) => {
                              if (ele.categoryId !== item.id) {
                                return ele;
                              }
                            }),
                          );
                        }

                        setMultiSubSubSubCategoryList(tempArr);
                      }}
                    />
                    <div className="flex cursor-pointer flex-col items-center justify-start">
                      {item?.icon ? (
                        <Image
                          src={item.icon}
                          alt={item?.name}
                          height={30}
                          width={30}
                        />
                      ) : (
                        <MdOutlineImageNotSupported size={30} />
                      )}
                      <p className="text-center text-sm">{item?.name}</p>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        ) : null}
      </div>

      {memoizedSubCategory?.length ? (
        <div className="my-2 border border-solid border-gray-300" />
      ) : null}
    </div>
  );
};

export default MultiSelectCategory;
