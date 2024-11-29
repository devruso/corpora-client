import { Company } from "./company";

export interface UserProfile {
    id: string;
    username: string;
    email: string;
    role: string;
    companies: Company[]|any;
    accessToken: string;
    refreshToken: string;
}