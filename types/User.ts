export interface UserSchema {
      username: string;
      email: string;
      password: string;
      isAdmin: boolean;
}

export interface User extends UserSchema {
      id: string;
}
