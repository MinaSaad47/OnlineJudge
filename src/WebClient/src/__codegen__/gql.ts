/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n  query Header_UserQuery {\n    me {\n      id\n      ... HeaderAvatar_UserFragment\n    }\n  }\n": types.Header_UserQueryDocument,
    "\n  fragment HeaderAvatar_UserFragment on User {\n    id\n    userName,\n    email\n  } \n": types.HeaderAvatar_UserFragmentFragmentDoc,
    "\n  mutation Login($input: LoginInput!) {\n    login(input: $input) {\n      accessToken\n      refreshToken\n      me {\n        userName\n      }\n      errors {\n        __typename\n        ... on Error {\n          message\n        }\n      }\n    }\n  }\n": types.LoginDocument,
    "\nmutation Register($input: RegisterInput!) {\n  register(input: $input) {\nme {\n    email\n}\naccessToken\nrefreshToken\nerrors {\n    __typename\n    ... on Error {\n        message\n    }\n}\n    }\n}\n    ": types.RegisterDocument,
    "\n  query ProblemPage_ProblemQuery($slug: String!) {\n    problemBySlug(slug: $slug) {\n      id\n      ... ProblemStatement_ProblemFragment\n      maxMemory\n      maxTime\n      testCases {\n        key\n        input\n        output\n        isSample\n      }\n    }\n  }\n": types.ProblemPage_ProblemQueryDocument,
    "\n    fragment ProblemCell_ProblemFragment on Problem {\n        id\n        slug\n        title\n        maxMemoryString\n        maxTimeString\n        submissions {\n          items {\n            id\n          }\n        }\n    }\n": types.ProblemCell_ProblemFragmentFragmentDoc,
    "\n    query ProblemEditor_LanguagesQuery {\n        languages {\n            id\n            name\n        }\n    }\n": types.ProblemEditor_LanguagesQueryDocument,
    "\n  fragment ProblemStatement_ProblemFragment on Problem {\n    title\n    description\n  }\n": types.ProblemStatement_ProblemFragmentFragmentDoc,
    "\n  query ProblemsTable_ProblemsQuery($skip: Int!, $take: Int!) {\n    problems(skip: $skip, take: $take) {\n        items {\n            id\n            ... ProblemCell_ProblemFragment\n        }\n        pageInfo {\n            hasNextPage\n            hasPreviousPage\n        }\n    }\n  }\n": types.ProblemsTable_ProblemsQueryDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query Header_UserQuery {\n    me {\n      id\n      ... HeaderAvatar_UserFragment\n    }\n  }\n"): (typeof documents)["\n  query Header_UserQuery {\n    me {\n      id\n      ... HeaderAvatar_UserFragment\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  fragment HeaderAvatar_UserFragment on User {\n    id\n    userName,\n    email\n  } \n"): (typeof documents)["\n  fragment HeaderAvatar_UserFragment on User {\n    id\n    userName,\n    email\n  } \n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation Login($input: LoginInput!) {\n    login(input: $input) {\n      accessToken\n      refreshToken\n      me {\n        userName\n      }\n      errors {\n        __typename\n        ... on Error {\n          message\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation Login($input: LoginInput!) {\n    login(input: $input) {\n      accessToken\n      refreshToken\n      me {\n        userName\n      }\n      errors {\n        __typename\n        ... on Error {\n          message\n        }\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nmutation Register($input: RegisterInput!) {\n  register(input: $input) {\nme {\n    email\n}\naccessToken\nrefreshToken\nerrors {\n    __typename\n    ... on Error {\n        message\n    }\n}\n    }\n}\n    "): (typeof documents)["\nmutation Register($input: RegisterInput!) {\n  register(input: $input) {\nme {\n    email\n}\naccessToken\nrefreshToken\nerrors {\n    __typename\n    ... on Error {\n        message\n    }\n}\n    }\n}\n    "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query ProblemPage_ProblemQuery($slug: String!) {\n    problemBySlug(slug: $slug) {\n      id\n      ... ProblemStatement_ProblemFragment\n      maxMemory\n      maxTime\n      testCases {\n        key\n        input\n        output\n        isSample\n      }\n    }\n  }\n"): (typeof documents)["\n  query ProblemPage_ProblemQuery($slug: String!) {\n    problemBySlug(slug: $slug) {\n      id\n      ... ProblemStatement_ProblemFragment\n      maxMemory\n      maxTime\n      testCases {\n        key\n        input\n        output\n        isSample\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    fragment ProblemCell_ProblemFragment on Problem {\n        id\n        slug\n        title\n        maxMemoryString\n        maxTimeString\n        submissions {\n          items {\n            id\n          }\n        }\n    }\n"): (typeof documents)["\n    fragment ProblemCell_ProblemFragment on Problem {\n        id\n        slug\n        title\n        maxMemoryString\n        maxTimeString\n        submissions {\n          items {\n            id\n          }\n        }\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    query ProblemEditor_LanguagesQuery {\n        languages {\n            id\n            name\n        }\n    }\n"): (typeof documents)["\n    query ProblemEditor_LanguagesQuery {\n        languages {\n            id\n            name\n        }\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  fragment ProblemStatement_ProblemFragment on Problem {\n    title\n    description\n  }\n"): (typeof documents)["\n  fragment ProblemStatement_ProblemFragment on Problem {\n    title\n    description\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query ProblemsTable_ProblemsQuery($skip: Int!, $take: Int!) {\n    problems(skip: $skip, take: $take) {\n        items {\n            id\n            ... ProblemCell_ProblemFragment\n        }\n        pageInfo {\n            hasNextPage\n            hasPreviousPage\n        }\n    }\n  }\n"): (typeof documents)["\n  query ProblemsTable_ProblemsQuery($skip: Int!, $take: Int!) {\n    problems(skip: $skip, take: $take) {\n        items {\n            id\n            ... ProblemCell_ProblemFragment\n        }\n        pageInfo {\n            hasNextPage\n            hasPreviousPage\n        }\n    }\n  }\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;