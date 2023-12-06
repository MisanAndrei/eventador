import { UserRole } from "../Utilities/enums/Enums";

  export interface ProfileCard {
    id: number;
    name: string;
    profileImage: string;
    coverImage: string;
    motto: string;
    city: string;
    category: Category;
    areaOfInterest?: County[];
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
    id?: number;
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
    imageBase64: string;
    isProfileImage: boolean;
    deletedAfterApproval: boolean;
    needsApproval: boolean;
  }

  export interface LoggingUserResponse {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    phoneNumber?: string;
    role: UserRole;
    profileId?: number
    token: string;
  }

  export interface LoggedUser {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    phoneNumber?: string;
    profileId?: number;
    role: UserRole;
  }

  export interface UserProfile {
    id: number;
    businessName: string;
    email: string;
    phoneNumber: string;
    categoryName: string;
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
  }

  export interface CreateProfile {
    businessName: string;
    businessCUI?: string;
    motto?: string;
    cityId: number;
    areaOfInterest: number[];
    categoryId: number;
    images: string[];
    description: string[]; 
    websiteUrl?: string;
    facebookUrl?: string;
    instagramUrl?: string;
    youtubeUrl?: string;
  }

  export interface EditUser {
    id?: number;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    role?: UserRole;
    profile?: CreateProfile;
  }

  export interface EditProfile {
    businessName: string;
    businessCUI: string;
    motto?: string;
    countyId: number;
    cityId: number;
    areaOfInterest: number[];
    categoryId: number;
    description: string[]; 
    websiteUrl?: string;
    facebookUrl?: string;
    instagramUrl?: string;
    youtubeUrl?: string;
    imagesToDelete?: number[];
    images?: string[];
  }

  export interface LandingPage {
    sections: Section[]; 
    blogs: Blog[];
    categories: Category[];
    popularSuppliers: ProfileCard[];
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
    responseShown: boolean;
    responseInApproval: boolean;
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
    categories: Category[]; 
    blogCards: Blog[];
  }

  export interface SuppliersChanges {
    id: number;
    firstname: string;
    lastname: string;
  }

  export interface AdminDashboardProfilesChanged {
    id: number;
    firstname: string;
    lastname: string;
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
  

  

  

  
    