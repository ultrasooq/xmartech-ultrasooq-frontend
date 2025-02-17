"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import ProductCard from "@/components/modules/checkout/ProductCard";
import {
  useCartListByDevice,
  useCartListByUserId,
  useDeleteCartItem,
  useUpdateCartByDevice,
  useUpdateCartWithLogin,
} from "@/apis/queries/cart.queries";
import AddressCard from "@/components/modules/checkout/AddressCard";
import AddressForm from "@/components/modules/checkout/AddressForm";
// import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/components/ui/use-toast";
import {
  useAllUserAddress,
  useDeleteAddress,
} from "@/apis/queries/address.queries";
import { useRouter } from "next/navigation";
import { CartItem } from "@/utils/types/cart.types";
import { AddressItem } from "@/utils/types/address.types";
import { useClickOutside } from "use-events";
import { getCookie } from "cookies-next";
import { PUREMOON_TOKEN_KEY } from "@/utils/constants";
import { getOrCreateDeviceId } from "@/utils/helper";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useMe } from "@/apis/queries/user.queries";
import { OrderDetails } from "@/utils/types/orders.types";
import Image from "next/image";
import { useOrderStore } from "@/lib/orderStore";
import { Input } from "@/components/ui/input";
import GuestAddressCard from "@/components/modules/checkout/GuestAddressCard";
import validator from "validator";
import GuestAddressForm from "@/components/modules/checkout/GuestAddressForm";
import AddIcon from "@/public/images/addbtn.svg";
import { useAddToWishList } from "@/apis/queries/wishlist.queries";

const CheckoutPage = () => {
  const router = useRouter();
  const wrapperRef = useRef(null);
  const { toast } = useToast();
  const [haveAccessToken, setHaveAccessToken] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedAddressId, setSelectedAddressId] = useState<
    number | undefined
  >();
  const [sameAsShipping, setSameAsShipping] = useState(false);
  const [selectedOrderDetails, setSelectedOrderDetails] =
    useState<OrderDetails>();
  const [addressType, setAddressType] = useState<"shipping" | "billing">();
  const [guestShippingAddress, setGuestShippingAddress] = useState<
    | {
      firstName: string;
      lastName: string;
      cc: string;
      phoneNumber: string;
      address: string;
      city: string;
      country: string;
      province: string;
      postCode: string;
    }
    | undefined
  >();
  const [guestBillingAddress, setGuestBillingAddress] = useState<
    | {
      firstName: string;
      lastName: string;
      cc: string;
      phoneNumber: string;
      address: string;
      city: string;
      country: string;
      province: string;
      postCode: string;
    }
    | undefined
  >();
  const [guestEmail, setGuestEmail] = useState("");

  const deviceId = getOrCreateDeviceId() || "";
  const accessToken = getCookie(PUREMOON_TOKEN_KEY);
  const orders = useOrderStore();
  const [isClickedOutside] = useClickOutside([wrapperRef], (event) => { });

  const me = useMe(haveAccessToken);
  const cartListByDeviceQuery = useCartListByDevice(
    {
      page: 1,
      limit: 10,
      deviceId,
    },
    !haveAccessToken,
  );
  const cartListByUser = useCartListByUserId(
    {
      page: 1,
      limit: 10,
    },
    haveAccessToken,
  );
  const updateCartWithLogin = useUpdateCartWithLogin();
  const updateCartByDevice = useUpdateCartByDevice();
  const deleteCartItem = useDeleteCartItem();
  const addToWishlist = useAddToWishList();
  const allUserAddressQuery = useAllUserAddress(
    {
      page: 1,
      limit: 10,
    },
    haveAccessToken,
  );
  const delteAddress = useDeleteAddress();

  const handleToggleAddModal = () => setIsAddModalOpen(!isAddModalOpen);

  const memoizedCartList = useMemo(() => {
    if (cartListByUser.data?.data) {
      return cartListByUser.data?.data || [];
    } else if (cartListByDeviceQuery.data?.data) {
      return cartListByDeviceQuery.data?.data || [];
    }
    return [];
  }, [cartListByUser.data?.data, cartListByDeviceQuery.data?.data]);

  const calculateDiscountedPrice = (
    offerPrice: string | number,
    consumerDiscount: number,
  ) => {
    const price = offerPrice ? Number(offerPrice) : 0;
    const discount = consumerDiscount || 0;
    return price - (price * discount) / 100;
  };

  const calculateTotalAmount = () => {
    if (cartListByUser.data?.data?.length) {
      return cartListByUser.data?.data?.reduce(
        (
          acc: number,
          curr: {
            productPriceDetails: {
              offerPrice: string;
              consumerDiscount: number;
            };
            quantity: number;
          },
        ) => {
          return (
            acc +
            +calculateDiscountedPrice(
              curr.productPriceDetails?.offerPrice ?? 0,
              curr?.productPriceDetails?.consumerDiscount,
            ) *
            curr.quantity
          );
        },
        0,
      );
    } else if (cartListByDeviceQuery.data?.data?.length) {
      return cartListByDeviceQuery.data?.data?.reduce(
        (
          acc: number,
          curr: {
            productPriceDetails: {
              offerPrice: string;
            };
            quantity: number;
          },
        ) => {
          return (
            acc + +(curr.productPriceDetails?.offerPrice ?? 0) * curr.quantity
          );
        },
        0,
      );
    }
  };

  const memoziedAddressList = useMemo(() => {
    return allUserAddressQuery.data?.data || [];
  }, [allUserAddressQuery.data?.data]);

  const handleAddToCart = async (
    quantity: number,
    actionType: "add" | "remove",
    productPriceId: number,
  ) => {
    if (haveAccessToken) {
      const response = await updateCartWithLogin.mutateAsync({
        productPriceId,
        quantity,
      });

      if (response.status) {
        toast({
          title: `Item ${actionType === "add" ? "added to" : actionType === "remove" ? "removed from" : ""} cart`,
          description: "Check your cart for more details",
          variant: "success",
        });
      }
    } else {
      const response = await updateCartByDevice.mutateAsync({
        productPriceId,
        quantity,
        deviceId,
      });
      if (response.status) {
        toast({
          title: `Item ${actionType === "add" ? "added to" : actionType === "remove" ? "removed from" : ""} cart`,
          description: "Check your cart for more details",
          variant: "success",
        });
      }
    }
  };

  const handleRemoveItemFromCart = async (cartId: number) => {
    const response = await deleteCartItem.mutateAsync({ cartId });
    if (response.status) {
      toast({
        title: "Item removed from cart",
        description: "Check your cart for more details",
        variant: "success",
      });
    }
  };

  const handleDeleteAddress = async (userAddressId: number) => {
    const response = await delteAddress.mutateAsync({ userAddressId });
    if (response.status) {
      toast({
        title: "Address removed",
        description: "Check your address for more details",
        variant: "success",
      });
    } else {
      toast({
        title: "Item not removed from cart",
        description: "Check your cart for more details",
        variant: "danger",
      });
    }
  };

  const handleAddToWishlist = async (productId: number) => {
    const response = await addToWishlist.mutateAsync({ productId });
    if (response.status) {
      toast({
        title: "Item added to wishlist",
        description: "Check your wishlist for more details",
        variant: "success",
      });
    } else {
      toast({
        title: response.message || "Item not added to wishlist",
        description: "Check your wishlist for more details",
        variant: "danger",
      });
    }
  };

  const handleOrderDetails = (
    item: AddressItem,
    addresszType: "shipping" | "billing",
  ) => {
    if (addresszType === "shipping") {
      setSelectedOrderDetails((prevState) => ({
        ...prevState,
        firstName: item.firstName || me.data?.data?.firstName,
        lastName: item.lastName || me.data?.data?.lastName,
        email: me.data?.data?.email,
        cc: item.cc,
        phone: item.phoneNumber,
        shippingAddress: item.address,
        shippingCity: item.city,
        shippingProvince: item.province,
        shippingCountry: item.country,
        shippingPostCode: item.postCode,
      }));
    } else if (addresszType === "billing") {
      setSelectedOrderDetails((prevState) => ({
        ...prevState,
        firstName: item.firstName || me.data?.data?.firstName,
        lastName: item.lastName || me.data?.data?.lastName,
        email: me.data?.data?.email,
        cc: item.cc,
        phone: item.phoneNumber,
        billingAddress: item.address,
        billingCity: item.city,
        billingProvince: item.province,
        billingCountry: item.country,
        billingPostCode: item.postCode,
      }));
    }
  };

  const [selectedShippingAddressId, setSelectedShippingAddressId] = useState<string | null>(
    memoziedAddressList?.length > 0 ? String(memoziedAddressList[0].id) : null
  );
  
  const [selectedBillingAddressId, setSelectedBillingAddressId] = useState<string | null>(
    memoziedAddressList?.length > 0 ? String(memoziedAddressList[0].id) : null
  );

  useEffect(() => {
    if (memoziedAddressList?.length > 0) {
      handleOrderDetails(memoziedAddressList[0], "shipping");
      handleOrderDetails(memoziedAddressList[0], "billing");
    }
  }, [memoziedAddressList]);

  const onSaveOrder = () => {
    if (haveAccessToken) {


      // console.log("Selected Order Details:", selectedOrderDetails);

      const payload = {
        shippingAddress: selectedOrderDetails?.shippingAddress,
        billingAddress: sameAsShipping
          ? selectedOrderDetails?.shippingAddress
          : selectedOrderDetails?.billingAddress,
      };
    
      // console.log("Final Payload:", payload);


      if (!selectedOrderDetails?.shippingAddress) {
        toast({
          title: "Please select a shipping address",
          variant: "danger",
        });
        return;
      }

      const data = {
        ...selectedOrderDetails,
        paymentMethod: "cash",
        cartIds: memoizedCartList?.map((item: CartItem) => item.id) || [],
      };

      if (sameAsShipping) {
        data.billingAddress = data.shippingAddress;
        data.billingCity = data.shippingCity;
        data.billingProvince = data.shippingProvince;
        data.billingCountry = data.shippingCountry;
        data.billingPostCode = data.shippingPostCode;
      }

      // console.log(data);
      // return

      if (!data.billingAddress) {
        toast({
          title: "Please select a billing address",
          variant: "danger",
        });
        return;
      }

      orders.setOrders(data);
      router.push("/orders");
    } else {
      if (!guestEmail) {
        toast({
          title: "Please enter email address",
          variant: "danger",
        });
        return;
      }

      if (!validator.isEmail(guestEmail)) {
        toast({
          title: "Please enter valid email address",
          variant: "danger",
        });
        return;
      }

      let guestOrderDetails: any = {
        guestUser: {
          firstName: "",
          lastName: "",
          email: "",
          cc: "",
          phoneNumber: "",
        },
      };

      if (!guestShippingAddress) {
        toast({
          title: "Please add a shipping address",
          variant: "danger",
        });
        return;
      }

      if (guestShippingAddress) {
        guestOrderDetails = {
          ...guestOrderDetails,
          firstName: guestShippingAddress.firstName,
          lastName: guestShippingAddress.lastName,
          email: "",
          cc: guestShippingAddress.cc,
          phone: guestShippingAddress.phoneNumber,
          shippingAddress: guestShippingAddress.address,
          shippingCity: guestShippingAddress.city,
          shippingProvince: guestShippingAddress.province,
          shippingCountry: guestShippingAddress.country,
          shippingPostCode: guestShippingAddress.postCode,
        };
      }

      if (!guestBillingAddress) {
        toast({
          title: "Please add a billing address",
          variant: "danger",
        });
        return;
      }

      if (guestBillingAddress) {
        guestOrderDetails = {
          ...guestOrderDetails,
          billingAddress: guestBillingAddress.address,
          billingCity: guestBillingAddress.city,
          billingProvince: guestBillingAddress.province,
          billingCountry: guestBillingAddress.country,
          billingPostCode: guestBillingAddress.postCode,
        };
      }

      const data = {
        ...guestOrderDetails,
        email: guestEmail,
        paymentMethod: "cash",
        cartIds: memoizedCartList?.map((item: CartItem) => item.id) || [],
      };

      if (
        data.firstName !== "" &&
        data.lastName !== "" &&
        data.cc != "" &&
        data.phone !== ""
      ) {
        data.guestUser = {
          firstName: data.firstName,
          lastName: data.lastName,
          email: guestEmail,
          cc: data.cc,
          phoneNumber: data.phone,
        };
      }

      orders.setOrders(data);
      router.push("/orders");
    }
  };

  useEffect(() => {
    if (isClickedOutside) {
      setSelectedAddressId(undefined);
    }
  }, [isClickedOutside]);

  useEffect(() => {
    if (accessToken) {
      setHaveAccessToken(true);
    } else {
      setHaveAccessToken(false);
    }
  }, [accessToken]);

  return (
    <div className="cart-page">
      <div className="container m-auto px-3">
        <div className="cart-page-wrapper">
          <div className="cart-page-left">
            <div className="bodyPart">
              <div className="card-item cart-items">
                <div className="card-inner-headerPart">
                  <div className="lediv">
                    <h3>cart items</h3>
                  </div>
                </div>

                <div className="cart-item-lists">
                  {/* {!cartListByUser.data?.data?.length &&
                  !cartListByUser.isLoading ? (
                    <div className="px-3 py-6">
                      <p className="my-3 text-center">No items in cart</p>
                    </div>
                  ) : null} */}

                  {/* <div className="px-3">
                    {cartListByUser.isLoading ? (
                      <div className="my-3 space-y-3">
                        {Array.from({ length: 2 }).map((_, i) => (
                          <Skeleton key={i} className="h-28 w-full" />
                        ))}
                      </div>
                    ) : null}
                  </div> */}

                  {memoizedCartList?.map((item: CartItem) => (
                    <ProductCard
                      key={item.id}
                      cartId={item.id}
                      productId={item.productId}
                      productPriceId={item.productPriceId}
                      productName={
                        item.productPriceDetails?.productPrice_product
                          ?.productName
                      }
                      offerPrice={item.productPriceDetails?.offerPrice}
                      productQuantity={item.quantity}
                      productImages={
                        item.productPriceDetails?.productPrice_product
                          ?.productImages
                      }
                      consumerDiscount={
                        item.productPriceDetails?.consumerDiscount
                      }
                      onAdd={handleAddToCart}
                      onRemove={handleRemoveItemFromCart}
                      onWishlist={handleAddToWishlist}
                      haveAccessToken={haveAccessToken}
                    />
                  ))}
                </div>
              </div>

              {!me.data ? (
                <div className="card-item selected-address">
                  <div className="card-inner-headerPart">
                    <div className="lediv">
                      <h3>Your Informations</h3>
                    </div>
                  </div>

                  <div className="selected-address-lists">
                    <div className="space-y-2 p-3">
                      <Label>Email</Label>
                      <Input
                        className="theme-form-control-s1"
                        placeholder="Enter Your Email"
                        onChange={(e) => setGuestEmail(e.target.value)}
                        value={guestEmail}
                      />
                    </div>
                  </div>
                </div>
              ) : null}

              <div className="card-item selected-address">
                <div className="card-inner-headerPart">
                  <div className="lediv">
                    <h3>
                      {me?.data
                        ? `Select Shipping address`
                        : "Shipping address"}
                    </h3>
                  </div>
                </div>

                <div className="selected-address-lists">
                  {/* {!memoziedAddressList.length &&
                  !allUserAddressQuery.isLoading ? (
                    <div className="px-3 py-6">
                      <p className="my-3 text-center">No address added</p>
                    </div>
                  ) : null} */}

                  {/* <div className="px-3">
                    {allUserAddressQuery.isLoading ? (
                      <div className="my-3 space-y-3">
                        {Array.from({ length: 2 }).map((_, i) => (
                          <Skeleton key={i} className="h-28 w-full" />
                        ))}
                      </div>
                    ) : null}
                  </div> */}

                  <RadioGroup
                    // defaultValue={selectedAddressId?.toString()}
                    value={selectedShippingAddressId?.toString()}
                    onValueChange={(value) => setSelectedShippingAddressId(value)}
                    className=""
                  >
                    {memoziedAddressList?.map((item: AddressItem) => (
                      <AddressCard
                        key={item.id}
                        id={item.id}
                        firstName={item.firstName}
                        lastName={item.lastName}
                        cc={item.cc}
                        phoneNumber={item.phoneNumber}
                        address={item.address}
                        city={item.city}
                        country={item.country}
                        province={item.province}
                        postCode={item.postCode}
                        onEdit={() => {
                          setSelectedAddressId(item.id);
                          handleToggleAddModal();
                        }}
                        onDelete={() => handleDeleteAddress(item.id)}
                        onSelectAddress={() =>
                          handleOrderDetails(item, "shipping")
                        }
                      />
                    ))}
                  </RadioGroup>

                  {guestShippingAddress ? (
                    <GuestAddressCard
                      firstName={guestShippingAddress?.firstName}
                      lastName={guestShippingAddress?.lastName}
                      cc={guestShippingAddress?.cc}
                      phoneNumber={guestShippingAddress?.phoneNumber}
                      address={guestShippingAddress?.address}
                      city={guestShippingAddress?.city}
                      country={guestShippingAddress?.country}
                      province={guestShippingAddress?.province}
                      postCode={guestShippingAddress?.postCode}
                      onEdit={() => {
                        setAddressType("shipping");
                        handleToggleAddModal();
                      }}
                    />
                  ) : null}
                </div>

                {!me.data && !guestShippingAddress ? (
                  <div className="card-item cart-items for-add">
                    <div className="top-heading">
                      <Button
                        variant="outline"
                        type="button"
                        className="add-new-address-btn border-none p-0 !normal-case shadow-none"
                        onClick={() => {
                          setAddressType("shipping");
                          handleToggleAddModal();
                        }}
                      >
                        <Image
                          src={AddIcon}
                          alt="add-icon"
                          height={14}
                          width={14}
                        />{" "}
                        Add a new shipping address
                      </Button>
                    </div>
                  </div>
                ) : null}
              </div>

              <div className="card-item selected-address">
                <div className="card-inner-headerPart">
                  <div className="lediv">
                    <h3>
                      {me?.data ? `Select Billing address` : "Billing address"}
                    </h3>
                  </div>

                  <div className="rgdiv">
                    {selectedOrderDetails?.shippingAddress ? (
                      <div className="textwithcheckbox">
                        <Checkbox
                          id="same_as_shipping"
                          className="border border-solid border-gray-300 bg-white data-[state=checked]:!bg-dark-orange"
                          onCheckedChange={() => {
                            setSameAsShipping(!sameAsShipping);

                            // since state is not updated immediately, making inverted checking
                            if (sameAsShipping) {
                              setSelectedOrderDetails({
                                ...selectedOrderDetails,
                                billingAddress: "",
                                billingCity: "",
                                billingProvince: "",
                                billingCountry: "",
                                billingPostCode: "",
                              });
                            }
                          }}
                          checked={sameAsShipping}
                        />
                        <Label htmlFor="same_as_shipping">
                          Same As Shipping address
                        </Label>
                      </div>
                    ) : null}
                  </div>
                </div>

                <div className="selected-address-lists">
                  {/* {!memoziedAddressList.length &&
                  !allUserAddressQuery.isLoading ? (
                    <div className="px-3 py-6">
                      <p className="my-3 text-center">No address added</p>
                    </div>
                  ) : null} */}

                  {/* <div className="px-3">
                    {allUserAddressQuery.isLoading ? (
                      <div className="my-3 space-y-3">
                        {Array.from({ length: 2 }).map((_, i) => (
                          <Skeleton key={i} className="h-28 w-full" />
                        ))}
                      </div>
                    ) : null}
                  </div> */}

                  {!sameAsShipping ? (
                    <RadioGroup 
                    value={selectedBillingAddressId?.toString()}
                    onValueChange={(value) => setSelectedBillingAddressId(value)}
                    // defaultValue="comfortable" 
                    className="">
                      {memoziedAddressList?.map((item: AddressItem) => (
                        <AddressCard
                          key={item.id}
                          id={item.id}
                          firstName={item.firstName}
                          lastName={item.lastName}
                          cc={item.cc}
                          phoneNumber={item.phoneNumber}
                          address={item.address}
                          city={item.city}
                          country={item.country}
                          province={item.province}
                          postCode={item.postCode}
                          onEdit={() => {
                            setSelectedAddressId(item.id);
                            handleToggleAddModal();
                          }}
                          onDelete={() => handleDeleteAddress(item.id)}
                          onSelectAddress={() =>
                            handleOrderDetails(item, "billing")
                          }
                        />
                      ))}
                    </RadioGroup>
                  ) : (
                    <div className="px-3 py-6">
                      <p className="my-3 text-center">
                        Same as shipping address
                      </p>
                    </div>
                  )}

                  {guestBillingAddress ? (
                    <GuestAddressCard
                      firstName={guestBillingAddress?.firstName}
                      lastName={guestBillingAddress?.lastName}
                      cc={guestBillingAddress?.cc}
                      phoneNumber={guestBillingAddress?.phoneNumber}
                      address={guestBillingAddress?.address}
                      city={guestBillingAddress?.city}
                      country={guestBillingAddress?.country}
                      province={guestBillingAddress?.province}
                      postCode={guestBillingAddress?.postCode}
                      onEdit={() => {
                        setAddressType("billing");
                        handleToggleAddModal();
                      }}
                    />
                  ) : null}
                </div>

                {!me.data && !guestBillingAddress ? (
                  <div className="card-item cart-items for-add">
                    <div className="top-heading">
                      <Button
                        variant="outline"
                        type="button"
                        className="add-new-address-btn border-none p-0 !normal-case shadow-none"
                        onClick={() => {
                          setAddressType("billing");
                          handleToggleAddModal();
                        }}
                      >
                        <Image
                          src={AddIcon}
                          alt="add-icon"
                          height={14}
                          width={14}
                        />{" "}
                        Add a new billing address
                      </Button>
                    </div>
                  </div>
                ) : null}
              </div>

              {me.data ? (
                <div className="card-item cart-items for-add">
                  <div className="top-heading">
                    <Button
                      variant="outline"
                      type="button"
                      className="add-new-address-btn border-none p-0 !normal-case shadow-none"
                      onClick={handleToggleAddModal}
                    >
                      <Image
                        src={AddIcon}
                        alt="add-icon"
                        height={14}
                        width={14}
                      />{" "}
                      Add a new address
                    </Button>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
          <div className="cart-page-right">
            <div className="card-item priceDetails">
              <div className="card-inner-headerPart">
                <div className="lediv">
                  <h3>Price Details</h3>
                </div>
              </div>
              <div className="priceDetails-body">
                <ul>
                  <li>
                    <p>Subtotal</p>
                    <h5>${calculateTotalAmount() || 0}</h5>
                  </li>
                  <li>
                    <p>Shipping</p>
                    <h5>Free</h5>
                  </li>
                </ul>
              </div>
              <div className="priceDetails-footer">
                <h4>Total Amount</h4>
                <h4 className="amount-value">${calculateTotalAmount() || 0}</h4>
              </div>
            </div>
            <div className="order-action-btn">
              <Button
                onClick={onSaveOrder}
                disabled={!memoizedCartList?.length}
                className="theme-primary-btn order-btn"
              >
                Continue
              </Button>
            </div>
          </div>
        </div>
      </div>
      <Dialog open={isAddModalOpen} onOpenChange={handleToggleAddModal}>
        <DialogContent
          className="add-new-address-modal gap-0 p-0"
          ref={wrapperRef}
        >
          {me.data ? (
            <AddressForm
              onClose={() => {
                setIsAddModalOpen(false);
                setSelectedAddressId(undefined);
              }}
              addressId={selectedAddressId}
            />
          ) : (
            <GuestAddressForm
              onClose={() => {
                setIsAddModalOpen(false);
                setSelectedAddressId(undefined);
              }}
              addressType={addressType}
              setGuestShippingAddress={setGuestShippingAddress}
              setGuestBillingAddress={setGuestBillingAddress}
              guestShippingAddress={guestShippingAddress}
              guestBillingAddress={guestBillingAddress}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CheckoutPage;
