export interface IFreeLancerRequest {
  aboutUs: string;
  branchList: {
    address: string;
    businessTypeList: {
      businessTypeId: string;
    }[];
    city: string;
    contactName: string;
    contactNumber: string;
    country: string;
    profileType: string;
    province: string;
    tagList: {
      tagId: string;
    }[];
  }[];
}

export interface IFreeLancer {
  data: any;
  status: boolean;
  message: string;
  error: string;
  // id: number;
  // createdAt: string;
  // updatedAt: string;
  // aboutUs: string;
  // address: string;
  // businessTypeList: {
  //   businessTypeId: string;
  // }[];
  // city: string;
  // contactName: string;
  // contactNumber: string;
  // country: string;
  // profileType: string;
  // province: string;
  // tagList: {
  //   tagId: string;
  // }[];
  // startTime: string;
  // endTime: string;
  // days: any;
}

export interface IBuyerRequest {
  profileImage?: string;
  firstName: string;
  lastName: string;
  gender: string;
  email: string;
  phoneNumberList: {
    phoneNumber: string;
  }[];
  dateOfBirth: string | Date;
  socialLinkList: {
    linkType: string;
    link: string;
  }[];
}

export interface IBuyer {
  data: any;
  status: boolean;
  message: string;
  error: string;
  // id: number;
  // createdAt: string;
  // updatedAt: string;
  // aboutUs: string;
  // address: string;
  // businessTypeList: {
  //   businessTypeId: string;
  // }[];
  // city: string;
  // contactName: string;
  // contactNumber: string;
  // country: string;
  // profileType: string;
  // province: string;
  // tagList: {
  //   tagId: string;
  // }[];
  // startTime: string;
  // endTime: string;
  // days: any;
}

export interface IEditFreelancerProfileRequest {
  userProfileId: number;
  aboutUs: string;
  profileType: string;
}

export interface IEditFreelancerBranchRequest {
  branchId: number;
  businessTypeList?: { businessTypeId: number }[];
  address: string;
  city: string;
  province: string;
  country: string;
  contactNumber: string;
  contactName: string;
  startTime: string;
  endTime: string;
  workingDays: {
    sun: number;
    mon: number;
    tue: number;
    wed: number;
    thu: number;
    fri: number;
    sat: number;
  };
  tagList?: { tagId: number }[];
  profileType: string;
  mainOffice: number;
}

export interface IEditCompanyBranchRequest {
  branchId: number;
  businessTypeList?: { businessTypeId: number }[];
  address: string;
  city: string;
  province: string;
  country: string;
  contactNumber: string;
  contactName: string;
  startTime: string;
  endTime: string;
  workingDays: {
    sun: number;
    mon: number;
    tue: number;
    wed: number;
    thu: number;
    fri: number;
    sat: number;
  };
  tagList?: { tagId: number }[];
  profileType: string;
  mainOffice: number;
}

export interface IEditCompanyProfileRequest {
  userProfileId: number;
  profileType: string;
  companyLogo: string,
  companyName: string,
  annualPurchasingVolume: string,
  businessTypeList: undefined,
  address: string,
  city: string,
  province: string,
  country: string,
  yearOfEstablishment: string,
  totalNoOfEmployee: string,
  aboutUs: string;
}

export interface IEditCompanyBranch {
  data: any;
  status: boolean;
  message: string;
  error: string;
  // id: number;
  // createdAt: string;
  // updatedAt: string;
  // aboutUs: string;
  // address: string;
  // businessTypeList: {
  //   businessTypeId: string;
  // }[];
  // city: string;
  // contactName: string;
  // contactNumber: string;
  // country: string;
  // profileType: string;
  // province: string;
  // tagList: {
  //   tagId: string;
  // }[];
  // startTime: string;
  // endTime: string;
  // days: any;
}

export interface IEditCompanyProfile extends IEditCompanyBranch {}
