/**
 * @fileoverview User profile type definitions for the Ultrasooq marketplace.
 *
 * Covers the three user trade roles (Freelancer, Company, Buyer) and their
 * respective profile creation, editing, and branch management payloads.
 * Also includes file upload and freelancer online/offline status types.
 *
 * @module utils/types/user.types
 * @dependencies None (pure type definitions).
 */

/**
 * Request payload for creating a freelancer profile.
 *
 * @description
 * Intent: Supplies the "about us" narrative and a list of branch offices
 * with their business types, contact info, tags, and locations.
 *
 * Usage: Submitted from the freelancer profile setup wizard.
 *
 * Data Flow: Profile form -> mutation hook -> API POST /freelancer.
 *
 * @property aboutUs - Description text for the freelancer's profile.
 * @property branchList - Array of branch office definitions.
 * @property branchList[].address - Branch street address.
 * @property branchList[].businessTypeList - Associated business type IDs.
 * @property branchList[].city - Branch city.
 * @property branchList[].contactName - Branch contact person name.
 * @property branchList[].contactNumber - Branch contact phone number.
 * @property branchList[].country - Branch country.
 * @property branchList[].profileType - Profile type classification.
 * @property branchList[].province - Branch province/state.
 * @property branchList[].tagList - Associated tag IDs.
 */
export interface IFreelancerRequest {
  aboutUs: string | undefined;
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

/**
 * Response payload from freelancer profile creation/retrieval.
 *
 * @description
 * Intent: Standard API response wrapper for freelancer operations.
 *
 * Data Flow: API POST/GET /freelancer -> IFreelancer.
 *
 * Notes: The commented-out fields represent a potential future expansion
 * of the response shape with detailed profile data.
 *
 * @property data - The freelancer profile data (generic shape).
 * @property status - Boolean success indicator.
 * @property message - Human-readable response message.
 * @property error - Error description if the request failed.
 */
export interface IFreelancer {
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

/**
 * Response payload from company profile operations.
 *
 * @description
 * Intent: Shares the same response shape as {@link IFreelancer} for
 * consistency across profile types.
 *
 * @extends IFreelancer
 */
export interface ICompany extends IFreelancer {}

/**
 * Request payload for creating/updating a buyer profile.
 *
 * @description
 * Intent: Captures the buyer's personal information including profile
 * picture, demographics, phone numbers, and social media links.
 *
 * Usage: Submitted from the buyer profile edit form.
 *
 * Data Flow: Buyer profile form -> mutation hook -> API PUT /buyer.
 *
 * @property profilePicture - Optional URL of the uploaded profile image.
 * @property firstName - Buyer's first name.
 * @property lastName - Buyer's last name.
 * @property gender - Gender string (e.g., "MALE", "FEMALE").
 * @property email - Buyer's email address.
 * @property phoneNumberList - Array of phone number entries.
 * @property dateOfBirth - Date of birth as ISO string or Date object.
 * @property socialLinkList - Array of social media link entries.
 * @property socialLinkList[].linkType - Social platform identifier (e.g., "facebook").
 * @property socialLinkList[].link - The URL of the social profile.
 */
export interface IBuyerRequest {
  profilePicture?: string;
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

/**
 * Response payload from buyer profile operations.
 *
 * @description
 * Intent: Standard API response wrapper for buyer profile CRUD.
 *
 * Notes: Similar to {@link IFreelancer} response shape. Commented-out
 * fields indicate a potential future expansion.
 *
 * @property data - The buyer profile data (generic shape).
 * @property status - Boolean success indicator.
 * @property message - Human-readable response message.
 * @property error - Error description if the request failed.
 */
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

/**
 * Request payload for editing a freelancer's profile information.
 *
 * @description
 * Intent: Updates the core profile fields (about text, profile type)
 * for an existing freelancer profile.
 *
 * Data Flow: Profile edit form -> mutation hook -> API PUT /freelancer/profile.
 *
 * @property userProfileId - ID of the freelancer profile to update.
 * @property aboutUs - Updated "about us" description text.
 * @property profileType - Updated profile type classification.
 */
export interface IEditFreelancerProfileRequest {
  userProfileId: number;
  aboutUs: string | undefined;
  profileType: string;
}

/**
 * Request payload for editing a freelancer branch office.
 *
 * @description
 * Intent: Updates all details of a freelancer's branch office including
 * location, contact info, business hours, and associated tags/types.
 *
 * Data Flow: Branch edit form -> mutation hook -> API PUT /freelancer/branch.
 *
 * @property branchId - ID of the branch to update.
 * @property businessTypeList - Optional array of business type associations.
 * @property address - Branch street address.
 * @property city - Branch city.
 * @property province - Branch province/state.
 * @property country - Branch country.
 * @property contactNumber - Branch contact phone number.
 * @property contactName - Branch contact person name.
 * @property startTime - Business hours start time (HH:mm format).
 * @property endTime - Business hours end time (HH:mm format).
 * @property workingDays - Map of day abbreviations to 0/1 (0=closed, 1=open).
 * @property tagList - Optional array of tag associations.
 * @property profileType - Profile type classification.
 * @property mainOffice - Whether this is the main office (1) or not (0).
 */
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

/**
 * Union type for freelancer branch edit requests.
 *
 * @description
 * Intent: Allows either a full branch edit or a minimal edit that only
 * updates the branch ID and end time (e.g., for quick schedule changes).
 *
 * Usage: Accepted by the branch-update mutation hook to support both
 * full and partial updates.
 */
export type TUnionEditFreelancerBranchRequest =
  | IEditFreelancerBranchRequest
  | {
      branchId: number;
      endTime: string;
    };

/**
 * Request payload for editing a company branch office.
 *
 * @description
 * Intent: Updates all details of a company's branch office. Shares the
 * same structure as {@link IEditFreelancerBranchRequest}.
 *
 * Data Flow: Company branch edit form -> mutation hook -> API PUT /company/branch.
 *
 * @property branchId - ID of the branch to update.
 * @property businessTypeList - Optional business type associations.
 * @property address - Branch street address.
 * @property city - Branch city.
 * @property province - Branch province/state.
 * @property country - Branch country.
 * @property contactNumber - Branch phone number.
 * @property contactName - Branch contact person.
 * @property startTime - Opening time (HH:mm).
 * @property endTime - Closing time (HH:mm).
 * @property workingDays - Day-of-week open/closed map.
 * @property tagList - Optional tag associations.
 * @property profileType - Profile type classification.
 * @property mainOffice - Main office flag (1 = yes, 0 = no).
 */
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

/**
 * Request payload for editing a company's profile information.
 *
 * @description
 * Intent: Updates the company-level profile fields including branding,
 * location, establishment details, and description.
 *
 * Data Flow: Company profile form -> mutation hook -> API PUT /company/profile.
 *
 * @property userProfileId - ID of the company profile to update.
 * @property profileType - Profile type classification.
 * @property companyLogo - URL of the company logo image.
 * @property companyName - Legal or display company name.
 * @property annualPurchasingVolume - Annual purchasing volume description.
 * @property businessTypeList - Explicitly set to undefined (unused in edit).
 * @property address - Company headquarters address.
 * @property city - Company city.
 * @property province - Company province/state.
 * @property country - Company country.
 * @property yearOfEstablishment - Year the company was established.
 * @property totalNoOfEmployee - Employee count range string.
 * @property aboutUs - Company description text.
 */
export interface IEditCompanyProfileRequest {
  userProfileId: number;
  profileType: string;
  companyLogo: string;
  companyName: string;
  annualPurchasingVolume: string;
  businessTypeList: undefined;
  address: string;
  city: string;
  province: string;
  country: string;
  yearOfEstablishment: string;
  totalNoOfEmployee: string;
  aboutUs: string;
}

/**
 * Response payload from company branch edit operations.
 *
 * @description
 * Intent: Standard API response wrapper for branch update operations.
 *
 * Notes: Commented-out fields indicate potential future typed expansion.
 *
 * @property data - The updated branch data (generic shape).
 * @property status - Boolean success indicator.
 * @property message - Human-readable response message.
 * @property error - Error description if the request failed.
 */
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

/**
 * Response payload from company profile edit operations.
 *
 * @description
 * Intent: Shares the same response shape as {@link IEditCompanyBranch}.
 *
 * @extends IEditCompanyBranch
 */
export interface IEditCompanyProfile extends IEditCompanyBranch {}

/**
 * Response payload from file upload operations.
 *
 * @description
 * Intent: Returns the uploaded file's URL/path after a successful upload.
 *
 * Usage: Consumed after image/document uploads to store the resulting
 * URL in form state (e.g., profile picture, product images, identity docs).
 *
 * Data Flow: File input -> upload mutation -> API POST /upload -> IUploadFile.
 *
 * @property status - Boolean success indicator.
 * @property message - Human-readable response message.
 * @property data - The URL/path of the uploaded file.
 */
export interface IUploadFile {
  status: boolean;
  message: string;
  data: string;
}

/**
 * Request payload for creating a new company branch office.
 *
 * @description
 * Intent: Creates a new branch office under an existing company profile
 * with full location, contact, and scheduling details.
 *
 * Data Flow: Add branch form -> mutation hook -> API POST /company/branch.
 *
 * @property userProfileId - ID of the parent company profile.
 * @property profileType - Profile type classification.
 * @property businessTypeList - Explicitly undefined (handled separately).
 * @property address - Branch street address.
 * @property city - Branch city.
 * @property province - Branch province/state.
 * @property country - Branch country.
 * @property contactNumber - Branch phone number.
 * @property contactName - Branch contact person.
 * @property startTime - Opening time (HH:mm).
 * @property endTime - Closing time (HH:mm).
 * @property workingDays - Day-of-week open/closed map (0 or 1).
 * @property tagList - Optional tag associations.
 * @property mainOffice - Main office flag (1 = yes, 0 = no).
 */
export interface ICreateCompanyBranchRequest {
  userProfileId: number;
  profileType: string;
  businessTypeList: undefined;
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
  mainOffice: number;
}

/**
 * Response payload from creating a company branch.
 *
 * @description
 * Intent: Standard API response confirming branch creation.
 *
 * @property data - The newly created branch data (generic shape).
 * @property status - Boolean success indicator.
 * @property message - Human-readable response message.
 * @property error - Error description if the request failed.
 */
export interface ICreateCompanyBranch {
  data: any;
  status: boolean;
  message: string;
  error: string;
}

/**
 * Response payload for freelancer online/offline status operations.
 *
 * @description
 * Intent: Confirms the freelancer's availability status update.
 *
 * @property data - Status-related data (generic shape).
 * @property status - Boolean success indicator.
 * @property message - Human-readable response message.
 * @property error - Optional error description.
 */
export interface IFreelancerStatus {
  data: any;
  status: boolean;
  message: string;
  error?: string;
}

/**
 * Request payload for updating a freelancer's online/offline status.
 *
 * @description
 * Intent: Toggles the freelancer's availability between online and
 * offline, with an optional scheduling mode.
 *
 * Usage: Triggered from the freelancer dashboard availability toggle.
 *
 * Data Flow: Toggle UI -> mutation hook -> API PUT /freelancer/status.
 *
 * @property onlineOffline - The new availability state (e.g., "ONLINE", "OFFLINE").
 * @property onlineOfflineDateStatus - Scheduling mode or date-based status descriptor.
 */
export interface IFreelancerStatusRequest {
  onlineOffline: string;
  onlineOfflineDateStatus: string;
}
