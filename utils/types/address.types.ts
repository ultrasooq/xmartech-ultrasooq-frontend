export interface AddressItem {
  id: number;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  address: string;
  city: string;
  country: string;
  province: string;
  postCode: string;
}

export interface AddressCreateRequest {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  cc: string;
  address: string;
  city: string;
  country: string;
  province: string;
  postCode: string;
}

export interface AddressUpdateRequest extends AddressCreateRequest {
  userAddressId: number;
}
