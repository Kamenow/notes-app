const loginFieldNames = {
  email: 'email',
  password: 'password'
} as const;

export type LoginData = (typeof loginFieldNames)[keyof typeof loginFieldNames];
export type LoginFormDataType = Record<LoginData, string>;
export type LoginFormErrors = Record<LoginData, boolean>;

const registerFieldNames = {
  email: 'email',
  password: 'password',
  rePassword: 'rePassword'
} as const;

export type RegisterData =
  (typeof registerFieldNames)[keyof typeof registerFieldNames];
export type RegisterFormDataType = Record<RegisterData, string>;
export type RegisterFormErrors = Record<RegisterData, boolean>;
