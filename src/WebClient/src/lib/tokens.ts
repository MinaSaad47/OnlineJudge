export abstract class Tokens {
  static get accessToken(): string | null {
    return localStorage.getItem("accessToken");
  }

  static set accessToken(token: string | null) {
    if (token) {
      localStorage.setItem("accessToken", token);
    } else {
      localStorage.removeItem("accessToken");
    }
  }

  static get refreshToken(): string | null {
    return localStorage.getItem("refreshToken");
  }

  static set refreshToken(token: string | null) {
    if (token) {
      localStorage.setItem("refreshToken", token);
    } else {
      localStorage.removeItem("refreshToken");
    }
  }
}
