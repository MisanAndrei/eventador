import { ProfileCard, ProfileDto } from "../Models/Models";

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
    profile: ProfileDto;
  }

  export interface UpsertUserRequest {
    id?: number;
    password: string;
    lastName: string;
    firstName: string;
    email: string;
    phoneNumber: string;
    role?: number;
  }

  export interface UpsertBlogRequest {
    title: string;
    description:string;
    content: string;
    image: string;
    minutesToRead: number;
  }