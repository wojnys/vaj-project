export interface Joke {
    categories: string[];
    created_at: string;
    icon_url: string;
    id: string;
    updated_at: string;
    url: string;
    value: string;
}

export interface UserType {
    id: string;
    firstname: string;
    lastname: string;
    username: string;
    email: string;
    password: string;
}
export interface UserTypeUpdate {
    firstname: string;
    lastname: string;
    username: string;
}

export interface JokeType {
    id: number;
    title: string;
    content: string;
    category: string;
    authorId: number;
}
