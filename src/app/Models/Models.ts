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
    id: number;
    name: string;
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
    phoneNumber: string;
    role: UserRole;
    token: string;
  }

  export interface LoggedUser {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    role: UserRole;
  }

  export interface UserProfile {
    id: number;
    businessName: string;
    businessEmail: string;
    businessPhoneNumber: string;
    category: string;
    images: UserImage[];
    motto?: string;
    description: string;
    city: string; 
    areaOfInterest: string[];
    websiteUrl?: string;
    facebookUrl: string;
    instagramUrl: string;
    youtubeUrl: string;
  }

  export interface CreateUser{
    id?: number;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    phoneNumber?: string;
    role: UserRole;
    profile?: CreateProfile;
  }

  export interface CreateProfile {
    businessName: string;
    businessCUI: string;
    motto?: string;
    countyId: number;
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
    description: string;
    image: string;
  }

  

  

  
    