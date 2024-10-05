import { apolloClient } from "@/lib/apollo-client";
import { Tokens } from "@/lib/tokens";

export abstract class Auth {
  public static logout() {
    Tokens.accessToken = null;
    Tokens.refreshToken = null;
    apolloClient.cache.modify({
      id: "ROOT_QUERY",
      fields: {
        me: () => null,
      },
    });
  }
}
