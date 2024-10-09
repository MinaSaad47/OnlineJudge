import { Tokens } from "@/lib/tokens";
import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  split,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { getMainDefinition } from "@apollo/client/utilities";
import { createClient } from "graphql-ws";

const httpLink = createHttpLink({
  uri: "/graphql",
});

const wsLink = new GraphQLWsLink(
  createClient({
    url: "ws://localhost:5000/graphql",
    connectionParams: async () => {
      const token = Tokens.accessToken;
      return {
        authorization: token ? `Bearer ${token}` : undefined,
      };
    },
  })
);

const authLink = setContext(async (_, { headers }) => {
  const token = Tokens.accessToken;

  // await new Promise((resolve) => setTimeout(resolve, 1000));

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  authLink.concat(httpLink)
);

export const apolloClient = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
});
