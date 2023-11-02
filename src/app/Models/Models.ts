  export interface ProfileCard {
    name: string;
    image: string;
    description: string;
    location: string;
    categoryId: number
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
    id?: number;
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
    supplierCategories: supplierCategory[];
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

  

  

  
    