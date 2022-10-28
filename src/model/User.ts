import { RoleType } from "./RoleType";

export interface User {
  readonly username: string;
  hash: string;
  token: string;
  role: RoleType;
}

