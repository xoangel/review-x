export interface UserAttributes {
    username: string;
    email: string;
    provider: string;
    confirmed: boolean;
    blocked: boolean;
    createdAt: string;
    updatedAt: string;
  }
  
export interface UserData {
    id: number;
    attributes: UserAttributes;
}

export interface UsersPermissionsUser {
    data: UserData;
}

export interface DiscAttributes {
    title: string;
    artist: string;
    release_year: string;
    total_rate: number;
    genre: string;
    description: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    cover_link: string;
    type: string | null;
    users_permissions_user: UsersPermissionsUser;
}

export interface IDisc {
    id: number;
    attributes: DiscAttributes;
}

export interface DiscResponse {
    data: IDisc;
}

export interface AllDiscsResponse {
    data: IDisc[];
}