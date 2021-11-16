export enum Roles {
    Admin,
    User,
}

export interface User {
    type: Roles,
    name: String,
    username: String
    password: String
}