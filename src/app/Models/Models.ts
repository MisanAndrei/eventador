export interface CreateUserRequest {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    role: number;
    profile: ProfileCard;
  }

  export interface EditUserRequest {
    email: string;
    password: string;
    firstname: string;
    lastname: string;
    phoneNumber: string;
    images: string[];
    imagesToDelete: number[];
    profile: Profile;
  }


  export interface ProfileCard {
    name: string;
    image: string;
    description: string;
    location: string;
    categoryId: number
  }

  enum UserRole {
    admin = 0,
    partner = 1,
    supplier = 2,
    customer = 3
  }

  export interface City {
    id: number;
    name: string;
    }
    
  export interface  County {
    id: number;
    name: string;
    cities?: City[]; //nullable
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
    
  export interface Profile {
    businessName: string;
    businessEmail: string;
    businessPhonenumber: string;
    category: Category[];
    description: string;
    images: UserImage[];
    motto: string;
    websiteUrl: string;
    facebookUrl: string;
    instagramUrl: string;
    youtubeUrl: string;
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

  

  
    