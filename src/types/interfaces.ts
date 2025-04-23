export interface ISignUpFormValues {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirm_password: string;
}

export interface ICustomInput {
  name: string;
  placeholder?: string;
  type: string;
  errorMessage: string | undefined;
  labelText?: string;
  register: any;
}

export interface IUser {
  userInfo?: string | null; //Change later
  loginUser?: (info: string) => void; //Change later
  logoutUser?: () => void;
}
