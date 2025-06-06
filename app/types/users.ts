export interface Username {
  username: string;
}
export interface User extends Username {
  password: string;
}

export interface UserPayload {
  userId: string;
  username: string;
  iat: number;
  exp: number
}