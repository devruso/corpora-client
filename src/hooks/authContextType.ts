import { UserProfile } from "@/interfaces/userProfile";

export interface AuthContextType {
    user: UserProfile | null;
    login: (userData: UserProfile) => void;
    logout: () => void;
  }