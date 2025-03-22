import { UserRole } from "../Utilities/enums/Enums";

  export interface ProfileCard {
    id: number;
    name: string;
    profileImage: string;
    coverImage: string;
    motto: string;
    city: string;
    categories: Category[];
    areaOfInterest?: County[];
    averageRating: number;
    numberOfReviews: number;
  }

  export interface City {
    id: number;
    name: string;
    }
    
  export interface  County {
    id: number;
    name: string;
    }
    
  export interface UserCard {
    profileId: number;
    firstName: string;
    lastName: string;
    countyId: number;
    categtoryId: number;
    categoryName: string;
    image: string
    }
    
  export interface UserImage {
    id: number;
    imageUrl: string;
    isProfileImage: boolean;
    }
    
  export interface ProfileDto {
    userId?: number;
    cityId: number;
    motto?: string;
    site: string;
    facebook?: string;
    instagram?: string;
    youtube?: string;
    description: string;
    enabled: boolean;
    businessName: string;
    businessEmail: string;
    businessPhonenumber: string;
    businessCUI?: string;
    address: string;
    category: supplierCategory;
    images: Image[];
    }
    
  export interface Category {
    id: number;
    name: string;
    image?: string;
    showOnLandingPage?: boolean;
    }

  export interface MenuLinks {
    description: string;
    link: string;
  }

  export interface DashboardProfiles {
    id: number;
    profileName: string;
    profilePicture: string;
    dateAdded: string;
    category: String;
    isPaying: boolean;
    location: string;
  }

  export interface PartnerProfile {
    id: number;
    profilePicture: string;
    name: string;
    dateAdded: string;
    location: string;
  }

  export interface ProfilesAddedByMonth {
    monthName: string;
    profilesAdded: number;
  }

  export interface supplierCategory {
    categoryId: number;
    profileId: number;
    deletedAfterApproval: boolean;
    needsApproval: boolean;
  }

  export interface Image {
    id: number;
    imageUrl: string;
    isProfileImage: boolean;
  }

  export interface UsedImage {
    imageId: number;
    imageUrl: string;
    isMaintained: boolean;
  }

  export interface LoginResponse {
    data?: LoggingUserResponse;
    statusCode: number;
  }

  export interface LoggingUserResponse {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    phoneNumber?: string;
    role: UserRole;
    profilesIds?: number[];
    favourtieProfilesIds?: number[];
    token: string;
    refreshToken: string;
    referralCode?: string;
  }

  export interface LoggedUser {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    phoneNumber?: string;
    profilesIds?: number[];
    role: UserRole;
    referralCode?: string;
  }

  export interface UserProfile {
    id: number;
    businessName: string;
    email: string;
    phoneNumber: string;
    categories: Category[];
    images: UserImage[];
    motto?: string;
    description: string;
    cityName: string; 
    areaOfInterestNames: string[];
    websiteUrl?: string;
    facebookUrl?: string;
    instagramUrl?: string;
    youtubeUrl?: string;
    reviews?: Review[]; 
  }

  export interface CreateUser{
    email: string;
    password:string;
    firstName: string;
    lastName: string;
    phoneNumber?: string;
    role: UserRole;
    profile?: CreateProfile;
    partnerId?: number;
  }

  export interface CreateProfile {
    businessName: string;
    businessCUI?: string;
    businessRegCom?: string;
    businessEmail: string;
    motto?: string;
    cityId: number;
    areaOfInterest: number[];
    categoryIds: number[];
    images: string[];
    profileImage: string;
    description: string;  
    websiteUrl?: string;
    facebookUrl?: string;
    instagramUrl?: string;
    youtubeUrl?: string;
  }

  export interface EditUser {
    id?: number;
    email: string;
    password: string;
    firstName: string; //se poate schimba
    lastName: string; //se poate schimba
    phoneNumber: string; //se poate schimba
    role?: UserRole;
    profile?: EditProfile;
  }

  export interface EditProfile {
    profileId: number;
    businessName: string;  //se poate schimba
    businessCUI: string;    // se poate schimba daca nu are valoare
    businessRegCom: string;  //se poate schimba daca nu are valoare
    businessEmail: string;
    motto?: string;  //se poate schimba
    countyId: number;
    cityId: number;
    areaOfInterest: number[];  //se poate schimba
    categoryIds: number[];   //se poate schimba
    description: string; //se poate schimba
    websiteUrl?: string; //se poate schimba
    facebookUrl?: string; //se poate schimba
    instagramUrl?: string; //se poate schimba
    youtubeUrl?: string; //se poate schimba
    imagesToDelete?: number[];  //se poate schimba
    existingImages: Image[]; // vin imaginile 
    images?: string[];  //se poate schimba
    profileImage?: string;  //se poate schimba
    existingProfileImage: Image;
  }

  export interface Section {
    id: number;
    name: string;
    title: string;
    content: string;
    image: string;
  }

  export interface Blog {
    id: number;
    title: string;
    content?: string;
    description?: string;
    imageUrl: string;
    minutesToRead: number;
  }

  export interface Review {
    authorName: string;
    creationDate: Date;
    id: number;
    category: Category;
    responseText?: string;
    reviewText: string;
    score: number;
  }

  export interface ReviewMapped {
    authorName: string;
    creationDate: Date;
    id: number;
    responseText?: string;
    reviewText: string;
    score: number;
    categoryName: string;
    responseShown: boolean;
    responseToBeSent: boolean;
    responseInApproval: boolean;
    responseTextToSend: string;
    responseSent: boolean;
  }

  export interface MainBlog{
    id: number;
    title: string;
    itemsPerRow: number;
    content?: string;
    image: string;
  }

  export interface LandingPage {
    sections: Section[];
    profileCards: ProfileCard[];
    categoryGroups: Category[]; 
    blogCards: Blog[];
    popularProfileCards: ProfileCard[];
  }

  export interface SuppliersChanges {
    id: number;
    firstname: string;
    lastname: string;
  }

  export interface AdminDashboardProfilesChanged {
    id: number;
    name: string;
    category: string;
  }

  export interface AdminDashboardCategory {
    id: number;
    name: string;
    image: string;
    showOnLandingPage: boolean;
  }

  export interface AdminDashboardBlog {
    id: number;
    title: string;
    image: string;
  }

  export interface AdminDashboardPartners {
    id: number;
    firstname: string;
    lastname: string;
  }

  export interface SendReview {
    score: number;
    reviewText: string;
    userId: number;
    profileId: number;
    categoryId: number;
  }

  export interface SendResponse {
    reviewId: number;
    responseText: string;
  }

  export interface ApprovalReview {
    reviewId: number;
    profileName: string;
    reviewText: string;
    responseText: string;
  }

  export interface ChangePasswordRequest {
    userId: number;
    oldPassword: string;
    newPassword: string;
  }

  export interface EditUserRequest {
    userId: number;
    firstName: string;
    lastName: string;
    phoneNumber: string;
  }

  export interface FavoriteProfilesRequest {
    userId: number;
    profileIds: number[];
  }

  export interface PartnerSupplierUser{
    id: number;
    name: string;
    createdAt: Date;
    profiles: PartnerSupplierUserProfile[];
  }

  export interface PartnerSupplierUserProfile{
    id: number;
    name: string;
    category: string;
    createdAt: Date;
    formattedDate: string;
  }

  export interface Group {
    id: number;
    name: string;
    showOnLandingPage: boolean;
    image: string;
    categories: Category[];
  }

  export interface MappedGroup {
    id: number;
    name: string;
    showOnLandingPage: boolean;
    categories: string;
  }

  export interface MappedCategory {
    id: number;
    name: string;
    checked: boolean;
  }

  export interface ReferralResponse {
    id: number;
    name: string;
  }

  export interface UserDetails {
    id?: number;
    email: string;
    firstName: string;
    lastName: string;
    password?: string;
    phoneNumber: string;
    role: UserRole;
  }

  export interface UserAnalytics {
    id: number;
    name: string;
    email: string;
  }

  export interface ProfilesAnalytics
  {
    users: UserAnalytics[];
    lastMonth: number;
    lastThreeMonths: number;
    lastSixMonths: number;
  }




  

  

  

  
    