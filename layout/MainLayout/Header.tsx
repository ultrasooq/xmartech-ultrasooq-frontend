"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { deleteCookie, getCookie } from "cookies-next";
import { PUREMOON_TOKEN_KEY, menuBarIconList } from "@/utils/constants";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import { useQueryClient } from "@tanstack/react-query";
import { useMe } from "@/apis/queries/user.queries";
import { getInitials, getOrCreateDeviceId } from "@/utils/helper";
import { useCategory } from "@/apis/queries/category.queries";
import { Button } from "@/components/ui/button";
import { useClickOutside } from "use-events";
import Link from "next/link";
import {
  useCartCountWithLogin,
  useCartCountWithoutLogin,
} from "@/apis/queries/cart.queries";
import { isArray } from "lodash";
import UnAuthUserIcon from "@/public/images/login.svg";
import WishlistIcon from "@/public/images/wishlist.svg";
import CartIcon from "@/public/images/cart.svg";
import HamburgerIcon from "@/public/images/humberger-icon.svg";
import HamburgerDownIcon from "@/public/images/humberger-down-icon.svg";
import LogoIcon from "@/public/images/logo-v2.png";
import { useWishlistCount } from "@/apis/queries/wishlist.queries";
import { signOut } from "next-auth/react";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { MdOutlineImageNotSupported } from "react-icons/md";
import { useCategoryStore } from "@/lib/categoryStore";
import GoogleTranslate from "@/components/GoogleTranslate";

type CategoryProps = {
  id: number;
  parentId: number;
  name: string;
  icon: string;
  children: any;
};

type ButtonLinkProps = {
  href: string;
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
};

const ButtonLink: React.FC<ButtonLinkProps> = ({
  href,
  onClick,
  children,
  className,
  ...props
}) => {
  return (
    <Link href={href} passHref legacyBehavior>
      <a onClick={onClick} {...props}>
        <button
          type="button"
          className="flex cursor-pointer px-8 text-sm font-semibold uppercase text-white md:py-10 md:text-sm lg:text-base xl:text-lg"
          onClick={onClick}
        >
          {children}
        </button>
      </a>
    </Link>
  );
};

const Header = () => {
  const router = useRouter();
  const pathname = usePathname();
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const accessToken = getCookie(PUREMOON_TOKEN_KEY);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [menuId, setMenuId] = useState();
  const [categoryId, setCategoryId] = useState();
  const [assignedToId, setAssignedToId] = useState();
  // const [subCategoryId, setSubCategoryId] = useState();
  const [subCategoryIndex, setSubCategoryIndex] = useState(0);
  const [subSubCategoryIndex, setSubSubCategoryIndex] = useState(0);
  const [subSubSubCategoryIndex, setSubSubSubCategoryIndex] = useState(0);
  const hasAccessToken = !!getCookie(PUREMOON_TOKEN_KEY);
  const deviceId = getOrCreateDeviceId() || "";
  const { clearUser } = useAuth();
  const wishlistCount = useWishlistCount(hasAccessToken);
  const cartCountWithLogin = useCartCountWithLogin(hasAccessToken);
  const cartCountWithoutLogin = useCartCountWithoutLogin(
    { deviceId },
    !hasAccessToken,
  );
  const category = useCategoryStore();
  const me = useMe(!!accessToken);
  const categoryQuery = useCategory("187");
  const subCategoryQuery = useCategory(
    categoryId ? categoryId : "",
    !!categoryId,
  );

  const memoizedInitials = useMemo(
    () => getInitials(me.data?.data?.firstName, me.data?.data?.lastName),
    [me.data?.data?.firstName, me.data?.data?.lastName],
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
    tempArr.unshift({
      name: "Home",
      id: 0,
      icon: menuBarIconList[0],
    });

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

  // const memoizedSubCategory = useMemo(() => {
  //   let tempArr: any = [];
  //   if (memoizedCategory.length) {
  //     tempArr = memoizedCategory?.find(
  //       (item: any) => item.id === categoryId,
  //     )?.children;
  //   }
  //   return tempArr || [];
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [categoryId, menuId]);

  // const memoizedSubSubCategory = useMemo(() => {
  //   let tempArr: any = [];
  //   if (memoizedSubCategory.length) {
  //     tempArr = memoizedSubCategory?.find(
  //       (item: any) => item.id === subCategoryId,
  //     )?.children;
  //   }
  //   return tempArr || [];
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [subCategoryId, categoryId, menuId]);

  const handleProfile = () => {
    switch (me?.data?.data?.tradeRole) {
      case "BUYER":
        return "/buyer-profile-details";
      case "FREELANCER":
        return "/freelancer-profile-details";
      case "COMPANY":
        return "/company-profile-details";
      default:
        return "/home";
    }
  };

  const handleLogout = async () => {
    setIsLoggedIn(false);
    deleteCookie(PUREMOON_TOKEN_KEY);
    queryClient.clear();
    clearUser();
    const data = await signOut({
      redirect: false,
      callbackUrl: "/home",
    });
    toast({
      title: "Logout Successful",
      description: "You have successfully logged out.",
      variant: "success",
    });

    // router.push(data?.url || "/home");
    router.push("/home");
  };

  const wrapperRef = useRef(null);
  const [isClickedOutside] = useClickOutside([wrapperRef], (event) => {});

  useEffect(() => {
    if (accessToken) {
      setIsLoggedIn(true);
    }
  }, [pathname, accessToken]);

  useEffect(() => {
    if (memoizedMenu.length) {
      setMenuId(memoizedMenu?.[1]?.id);
    }
  }, [memoizedMenu]);

  useEffect(() => {
    if (memoizedCategory.length) {
      setCategoryId(memoizedCategory?.[0]?.assignTo);
      setAssignedToId(memoizedCategory?.[0]?.id);
    }
  }, [memoizedCategory]);

  useEffect(() => {
    if (isClickedOutside) {
      setCategoryId(undefined);
    }
  }, [isClickedOutside]);

  return (
    <header className="relative w-full">
      <div className="w-full bg-dark-cyan">
        <div className="container m-auto px-3">
          <div className="hidden sm:hidden md:flex md:gap-x-2.5">
            <div className="py-4 text-sm font-normal text-white md:w-5/12 lg:w-4/12">
              <p>Welcome to UltraSooq!</p>
            </div>
            <div className="flex justify-end py-4 text-sm font-normal text-white md:w-7/12 lg:w-8/12">
              <ul className="flex justify-end">
                <li className="border-r border-solid border-white px-2 text-sm font-normal text-white">
                  <a href="#">Store Location</a>
                </li>
                {/* {me?.data?.data?.tradeRole === "BUYER" ? ( */}
                <li className="border-r border-solid border-white px-2 text-sm font-normal text-white">
                  <Link href="/my-orders">Track Your Order</Link>
                </li>
                {/* ) : null} */}
                <li className="border-r border-solid border-white px-2 text-sm font-normal text-white">
                  <select className="border-0 bg-transparent text-white focus:outline-none">
                    <option className="bg-dark-cyan">USD</option>
                    <option className="bg-dark-cyan">INR</option>
                    <option className="bg-dark-cyan">AUD</option>
                  </select>
                </li>
                <li className="google_translate px-2 pr-0 text-sm font-normal text-white">
                  <GoogleTranslate />
                  {/* <select className="border-0 bg-transparent text-white focus:outline-none">
                    <option className="bg-dark-cyan">English</option>
                    <option className="bg-dark-cyan">Arabic</option>
                    <option className="bg-dark-cyan">German</option>
                    <option className="bg-dark-cyan">French</option>
                  </select> */}
                </li>
              </ul>
            </div>
          </div>

          <div className="flex flex-wrap items-center">
            <div className="!order-1 !flex !w-5/12 flex-1 !items-center !py-4 md:!w-2/12 lg:!w-1/6">
              <Link href="/home">
                <Image src={LogoIcon} alt="logo" />
              </Link>
            </div>
            <div className="!order-3 flex w-10/12 items-center py-4 md:order-2 md:w-7/12 md:px-3 lg:w-4/6">
              <div className="h-11 w-24 md:w-24 lg:w-auto">
                <select className="h-full w-full focus:outline-none">
                  <option>All</option>
                  <option>Apps & Games</option>
                  <option>Beauty</option>
                  <option>Car & Motorbike</option>
                  <option>Clothing & Accessories</option>
                  <option>Computers & Accessories</option>
                  <option>Electronics</option>
                  <option>Movies & TV Shows</option>
                </select>
              </div>
              <div className="h-11 w-4/6 border-l border-solid border-indigo-200">
                <input
                  type="search"
                  className="form-control h-full w-full p-2.5 text-black focus:outline-none"
                  placeholder="I’m shopping for..."
                />
              </div>
              <div className="h-11 w-1/6">
                <button
                  type="button"
                  className="btn h-full w-full bg-dark-orange text-sm font-semibold text-white"
                >
                  Search
                </button>
              </div>
            </div>
            <div className="order-2 flex w-7/12 justify-end py-4 sm:order-2 sm:w-7/12 md:order-3 md:w-3/12 lg:w-1/6">
              <ul className="flex items-center justify-end gap-x-4">
                <li className="relative flex pb-3 pl-0 pr-1 pt-0">
                  <Link
                    href="/wishlist"
                    className="flex flex-wrap items-center"
                  >
                    <Image
                      src={WishlistIcon}
                      height={28}
                      width={33}
                      alt="wishlist"
                    />
                    <div className="absolute bottom-0 right-0 flex h-6 w-6 items-center justify-center rounded-full bg-dark-orange text-xs font-bold text-white">
                      {wishlistCount.data?.data ? wishlistCount.data?.data : 0}
                    </div>
                  </Link>
                </li>
                <li className="relative flex pb-3 pl-0 pr-1 pt-0">
                  <Link href="/cart" className="flex flex-wrap items-center">
                    <Image
                      src={CartIcon}
                      height={29}
                      width={26}
                      alt="wishlist"
                    />
                    <div className="absolute bottom-0 right-0 flex h-6 w-6 items-center justify-center rounded-full bg-dark-orange text-xs font-bold text-white">
                      {hasAccessToken
                        ? !isArray(cartCountWithLogin.data?.data)
                          ? cartCountWithLogin.data?.data
                          : 0
                        : !isArray(cartCountWithoutLogin.data?.data)
                          ? cartCountWithoutLogin.data?.data
                          : 0}
                    </div>
                  </Link>
                </li>
                <li className="relative flex">
                  {isLoggedIn ? (
                    <DropdownMenu>
                      <DropdownMenuTrigger>
                        {me?.data?.data?.profilePicture ? (
                          <Image
                            src={me?.data?.data?.profilePicture}
                            alt="image-icon"
                            height={44}
                            width={44}
                            className="rounded-full"
                          />
                        ) : (
                          <div className="h-[44px] w-[44px] rounded-full bg-gray-300">
                            <p className="p-2 text-lg font-bold">
                              {memoizedInitials}
                            </p>
                          </div>
                        )}
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <Link href={handleProfile()}>
                          <DropdownMenuItem className="cursor-pointer">
                            Profile Information
                          </DropdownMenuItem>
                        </Link>
                        <DropdownMenuSeparator />
                        {me?.data?.data?.tradeRole !== "BUYER" ? (
                          <>
                          <Link href="/team-members">
                              <DropdownMenuItem>Team Members</DropdownMenuItem>
                            </Link>
                            <Link href="/manage-products">
                              <DropdownMenuItem>Products</DropdownMenuItem>
                            </Link>
                            <DropdownMenuSeparator />
                            <Link href="/seller-orders">
                              <DropdownMenuItem>Orders</DropdownMenuItem>
                            </Link>
                            <DropdownMenuSeparator />
                            <Link href="/rfq-quotes">
                              <DropdownMenuItem>RFQ Quotes</DropdownMenuItem>
                            </Link>
                            <DropdownMenuSeparator />
                            <Link href="/seller-rfq-request">
                              <DropdownMenuItem>
                                RFQ Seller Requests
                              </DropdownMenuItem>
                            </Link>
                            <DropdownMenuSeparator />
                          </>
                        ) : null}
                        <Link href="/my-settings/address">
                          <DropdownMenuItem>My Settings</DropdownMenuItem>
                        </Link>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={handleLogout}
                          className="cursor-pointer"
                        >
                          Logout
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  ) : (
                    <>
                      <Image
                        src={UnAuthUserIcon}
                        height={28}
                        width={28}
                        alt="login-avatar-icon"
                      />
                      <div className="flex flex-col">
                        <Link
                          href="/login"
                          className="ml-1.5 flex cursor-pointer flex-col flex-wrap items-start text-sm font-bold text-white"
                        >
                          Login
                        </Link>
                        <Link
                          href="/register"
                          className="ml-1.5 flex cursor-pointer flex-col flex-wrap items-start text-sm font-bold text-white"
                        >
                          Register
                        </Link>
                      </div>
                    </>
                  )}
                </li>
              </ul>
            </div>
          </div>

          <div className="hidden h-[44px] w-full px-3 md:flex md:px-0">
            <div className="flex w-full flex-col flex-wrap items-start justify-start gap-x-1 py-1 md:flex-row md:justify-start">
              {memoizedMenu.map((item: any) => (
                <>
                  <ButtonLink
                    key={item.id}
                    onClick={() => {
                      setMenuId(item.id);
                      if (item.name.toLowerCase().includes("home")) {
                        router.push("/home");
                      }

                      if (item.name.toLowerCase().includes("store")) {
                        router.push("/trending");
                      }

                      if (item.name.toLowerCase().includes("buy group")) {
                        router.push("/buygroup");
                      }

                      if (item.name.toLowerCase().includes("rfq")) {
                        router.push("/rfq");
                      }
                      if (item.name.toLowerCase().includes("factories")) {
                        router.push("/factories");
                      }
                    }}
                    href={
                      item.name.toLowerCase().includes("home")
                        ? "/home"
                        : item.name.toLowerCase().includes("store")
                          ? "/trending"
                          : item.name.toLowerCase().includes("rfq")
                            ? "/rfq"
                            : item.name.toLowerCase().includes("factories")
                              ? "/factories"
                              : item.name.toLowerCase().includes("buy group")
                                ? "/buygroup"
                                : "/trending"
                    }
                  >
                    <div className="flex gap-x-3">
                      <Image
                        src={item.icon}
                        alt={item?.name}
                        height={0}
                        width={0}
                        className="h-7 w-7"
                      />{" "}
                      <p>{item?.name}</p>
                    </div>
                  </ButtonLink>
                </>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="w-full border-b border-solid border-gray-300 bg-white">
        <div className="container m-auto px-3">
          <div className="relative flex flex-row">
            <div className="flex flex-1 gap-x-5">
              <div className="dropdown">
                <button className="dropbtn flex items-center">
                  <div>
                    <Image src={HamburgerIcon} alt="hamburger-icon" />
                  </div>
                  <p className="mx-3 text-sm font-normal capitalize text-color-dark sm:text-base md:text-lg">
                    All Categories
                  </p>
                  <div>
                    <Image src={HamburgerDownIcon} alt="hamburger-down-icon" />
                  </div>
                </button>

                {memoizedSubCategory?.length ? (
                  <div className="dropdown-content">
                    {memoizedSubCategory?.map(
                      (item: CategoryProps, index: number) => (
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
                            category.setSubCategories(
                              memoizedSubCategory?.[subCategoryIndex]?.children,
                            );
                            // category.setSubSubCategories([]);
                            category.setCategoryId(item?.id.toString());
                            // save index to check for child categories part of parent or not
                            category.setSubCategoryIndex(index);
                            category.setSubCategoryParentName(item?.name);
                            category.setSubSubCategoryParentName(
                              memoizedSubCategory?.[subCategoryIndex]
                                ?.children?.[0]?.name,
                            );
                            category.setSubSubCategories(
                              memoizedSubCategory?.[subCategoryIndex]
                                ?.children?.[0]?.children,
                            );

                            //reset for second level category active index
                            category.setSecondLevelCategoryIndex(0);
                          }}
                        >
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
                          <p
                            title={item?.name}
                            className="text-beat text-start text-sm"
                          >
                            {item?.name}
                          </p>
                        </div>
                      ),
                    )}
                  </div>
                ) : null}

                {memoizedSubCategory?.[subCategoryIndex]?.children?.length ? (
                  <div className="dropdown-content-second">
                    {memoizedSubCategory?.[subCategoryIndex]?.children?.map(
                      (item: CategoryProps, index: number) => (
                        <div
                          key={item?.id}
                          className={cn(
                            "dropdown-content-child flex cursor-pointer items-center justify-start gap-x-2 p-3",
                            memoizedSubCategory?.[subCategoryIndex]?.children
                              ?.length
                              ? index === subSubCategoryIndex
                                ? "dropdown-active-child"
                                : null
                              : null,
                          )}
                          onMouseEnter={() => setSubSubCategoryIndex(index)}
                          onClick={() => {
                            setSubSubCategoryIndex(index);
                            category.setSubSubCategories(
                              memoizedSubCategory?.[subCategoryIndex]
                                ?.children?.[subSubCategoryIndex]?.children,
                            );
                            category.setCategoryId(item?.id.toString());
                            category.setSecondLevelCategoryIndex(index);
                            category.setSubSubCategoryParentName(item?.name);
                            //FIXME: need condition
                            if (
                              category.subCategoryIndex !== subCategoryIndex
                            ) {
                              category.setSubCategories([]);
                              category.setSubCategoryParentName("");
                            }
                          }}
                        >
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
                          <p
                            title={item?.name}
                            className="text-beat text-start text-sm"
                          >
                            {item?.name}
                          </p>
                        </div>
                      ),
                    )}
                  </div>
                ) : null}

                {memoizedSubCategory?.[subCategoryIndex]?.children?.[
                  subSubCategoryIndex
                ]?.children?.length ? (
                  <div className="dropdown-content-third p-3">
                    <h4 className="mb-2 text-sm">
                      {memoizedSubCategory?.[subCategoryIndex]?.children?.[
                        subSubCategoryIndex
                      ]?.name || ""}
                    </h4>
                    <div className="grid grid-cols-5">
                      {memoizedSubCategory?.[subCategoryIndex]?.children?.[
                        subSubCategoryIndex
                      ]?.children?.map((item: CategoryProps, index: number) => (
                        <div
                          key={item?.id}
                          className={cn(
                            "dropdown-content-child flex cursor-pointer flex-col items-center justify-start gap-y-2 p-3",
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
                            category.setCategoryId(item?.id.toString());
                          }}
                        >
                          <div className="relative h-8 w-8">
                            {item?.icon ? (
                              <Image
                                src={item.icon}
                                alt={item?.name}
                                // height={30}
                                // width={30}
                                fill
                                className="object-contain"
                              />
                            ) : (
                              <MdOutlineImageNotSupported size={30} />
                            )}
                          </div>
                          <p
                            title={item?.name}
                            className="text-beat text-center text-sm"
                          >
                            {item?.name}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : null}
              </div>

              <div className="flex items-center gap-x-5">
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
                    variant="link"
                    className={cn(
                      "py-3 text-sm font-semibold capitalize text-color-dark sm:text-base",
                      item?.id === assignedToId ? "underline" : "no-underline",
                    )}
                  >
                    <p>{item.name}</p>
                  </Button>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-end">
              <ul className="flex items-center justify-end gap-x-4">
                <li className="py-1.5 text-sm font-normal capitalize text-light-gray sm:text-base md:text-lg">
                  <a href="#" className="text-light-gray">
                    Buyer Central
                  </a>
                </li>
                <li className="py-1.5 text-sm font-normal capitalize text-light-gray sm:text-base md:text-lg">
                  <a href="#" className="text-light-gray">
                    Help Center
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
