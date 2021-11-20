import { Permission } from "../models/group";

export interface IGroup {
    id: string;
    name: string;
    permissions: Array<Permission>;
}

export interface IGroupDTO {
    id: string;
    name: string;
    permissions: Array<Permission>;
}