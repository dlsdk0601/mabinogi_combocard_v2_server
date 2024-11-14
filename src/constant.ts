class Constant {
  readonly THREE_DAY_SECONDS = 3 * 24 * 60 * 60 * 1000;
  readonly REFRESH_TOKEN_EXPIRES_IN = "3d";
  readonly IS_PUBLIC_KEY = "isPublic";
  readonly REFRESH_TOKEN_COOKIE_KEY = "refresh-token";
}

export const CONSTANT = new Constant();
