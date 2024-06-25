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
import LogoIcon from "@/public/images/logo.png";
import { useWishlistCount } from "@/apis/queries/wishlist.queries";
import { signOut } from "next-auth/react";
import { useAuth } from "@/context/AuthContext";

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
          className="flex cursor-pointer px-10 text-sm font-semibold uppercase text-white md:py-10 md:text-sm lg:text-base xl:text-lg"
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
  const accessToken = getCookie(PUREMOON_TOKEN_KEY);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [menuId, setMenuId] = useState();
  const [categoryId, setCategoryId] = useState();
  const [subCategoryId, setSubCategoryId] = useState();
  const hasAccessToken = !!getCookie(PUREMOON_TOKEN_KEY);
  const deviceId = getOrCreateDeviceId() || "";
  const { clearUser } = useAuth();
  const wishlistCount = useWishlistCount(hasAccessToken);
  const cartCountWithLogin = useCartCountWithLogin(hasAccessToken);
  const cartCountWithoutLogin = useCartCountWithoutLogin(
    { deviceId },
    !hasAccessToken,
  );
  const me = useMe(!!accessToken);
  const categoryQuery = useCategory();

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
            icon: menuBarIconList[index],
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
    if (memoizedCategory.length) {
      tempArr = memoizedCategory?.find(
        (item: any) => item.id === categoryId,
      )?.children;
    }
    return tempArr || [];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryId, menuId]);

  const memoizedSubSubCategory = useMemo(() => {
    let tempArr: any = [];
    if (memoizedSubCategory.length) {
      tempArr = memoizedSubCategory?.find(
        (item: any) => item.id === subCategoryId,
      )?.children;
    }
    return tempArr || [];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subCategoryId, categoryId, menuId]);

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

    router.push(data?.url || "/home");
  };

  const wrapperRef = useRef(null);
  const [isClickedOutside] = useClickOutside([wrapperRef], (event) => {});

  useEffect(() => {
    if (accessToken) {
      setIsLoggedIn(true);
    }
  }, [pathname, accessToken]);

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
              <p>Welcome to Martfury Online Shopping Store !</p>
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
                <li className="px-2 pr-0 text-sm font-normal text-white">
                  <select className="border-0 bg-transparent text-white focus:outline-none">
                    <option className="bg-dark-cyan">English</option>
                    <option className="bg-dark-cyan">German</option>
                    <option className="bg-dark-cyan">French</option>
                  </select>
                </li>
              </ul>
            </div>
          </div>

          <div className="!flex !flex-wrap">
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
            {/* <div className="order-4 flex w-2/12 items-center justify-end py-4 md:!hidden">
              <Image
                src={HamburgerWhiteIcon}
                alt="hamburger-icon"
                height={28}
                width={28}
              />
            </div> */}
          </div>

          <div className="hidden h-[44px] w-full px-3 md:flex md:px-0">
            <div className="flex w-full flex-col flex-wrap items-start justify-start gap-x-1 py-1 md:flex-row md:justify-start">
              {memoizedMenu.map((item: any) => (
                <ButtonLink
                  // type="button"
                  key={item.id}
                  onClick={() => {
                    setMenuId(item.id);
                    setCategoryId(undefined);

                    if (item.name.toLowerCase().includes("store")) {
                      router.push("/trending");
                    }

                    if (item.name.toLowerCase().includes("rfqs")) {
                      router.push("/rfq");
                    }
                  }}
                  href={
                    item.name.toLowerCase().includes("store")
                      ? "/trending"
                      : item.name.toLowerCase().includes("rfqs")
                        ? "/rfq"
                        : "/trending"
                  }
                  // variant="link"
                  // className="flex cursor-pointer px-10 py-3 text-sm font-semibold uppercase text-white md:py-10 md:text-sm lg:text-base xl:text-lg"
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
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="w-full border-b border-solid border-gray-300 bg-white">
        <div className="container m-auto px-3">
          <div className="relative flex flex-row">
            <div className="flex flex-1 gap-x-5">
              <div className="flex items-center py-3">
                <div>
                  <Image
                    src={HamburgerIcon}
                    alt="hamburger-icon"
                    width={16}
                    height={14}
                  />
                </div>
                <p className="mx-3 text-sm font-normal capitalize text-color-dark sm:text-base md:text-lg">
                  All Categories
                </p>
                <div>
                  <Image
                    src={HamburgerDownIcon}
                    alt="hamburger-down-icon"
                    width={13}
                    height={8}
                  />
                </div>
              </div>
              <div className="flex items-center gap-x-5">
                {memoizedCategory.map((item: any) => (
                  <Button
                    type="button"
                    key={item.id}
                    onClick={() => setCategoryId(item.id)}
                    variant="link"
                    className="py-3 text-sm font-semibold capitalize text-color-dark sm:text-base"
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
          <div className="relative h-1" ref={wrapperRef}>
            {categoryId ? (
              <div className="absolute top-2 z-50 h-60 w-full rounded-sm border border-solid border-gray-300 bg-white p-1 shadow-md">
                <div className="flex flex-row gap-x-2">
                  {memoizedSubCategory.length ? (
                    <div className="flex w-1/2 flex-col items-start border border-solid border-gray-300 p-3">
                      {memoizedSubCategory.map((item: any) => (
                        <Button
                          key={item.id}
                          variant="link"
                          className="py-3 text-sm font-semibold capitalize text-color-dark sm:text-base"
                          onClick={() => setSubCategoryId(item.id)}
                        >
                          <p>{item.name}</p>
                        </Button>
                      ))}
                    </div>
                  ) : null}

                  {memoizedSubSubCategory.length ? (
                    <div className="flex w-1/2 flex-col items-start border border-solid border-gray-300 p-3">
                      {memoizedSubSubCategory.map((item: any) => (
                        <Button
                          key={item.id}
                          variant="link"
                          className="py-3 text-sm font-semibold capitalize text-color-dark sm:text-base"
                        >
                          <p>{item.name}</p>
                        </Button>
                      ))}
                    </div>
                  ) : null}

                  <div className="w-1/2"></div>
                  <div className="w-1/2"></div>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
