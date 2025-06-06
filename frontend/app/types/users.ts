export interface Username {
  username: string;
}
export interface User extends Username {
  password: string;
  confirmPassword: string;
}

export interface UserPayload {
  userId: number;
  username: string;
  exp: number;
}