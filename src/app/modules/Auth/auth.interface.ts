export type TLoginUser = {
  email: string;
  password: string;
};

export type TExpiresIn =
  | `${number}d`
  | `${number}h`
  | `${number}m`
  | `${number}s`;
