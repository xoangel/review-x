export interface UserData {
    id: number,
    username: string;
    email: string;
    provider: string;
    confirmed: boolean;
    blocked: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface UserResponse{
    id: number,
    data: {
        username: string;
        email: string;
        provider: string;
        confirmed: boolean;
        blocked: boolean;
        createdAt: string;
        updatedAt: string;
    }
}

export interface DiscAttributes {
    title: string;
    artist: string;
    release_year: string;
    total_rate: number;
    genre: string;
    description: string;
    createdAt?: string;
    updatedAt?: string;
    publishedAt?: string;
    cover_link: string;
    type: string | null;
    users_permissions_user?: DiscResponse;
    dynamic_rate: number
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