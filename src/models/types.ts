import { Schema } from "mongoose";

export enum RolesType {
    Admin,
    User,
}

export interface UserType extends Schema {
    type: RolesType,
    name: string,
    username: string
    password: string
    generateToken: () => string
    validatePassword: (password: string) => Promise<string>
}