/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** The `TimeSpan` scalar represents an ISO-8601 compliant duration type. */
  TimeSpan: { input: any; output: any; }
  UUID: { input: any; output: any; }
};

/** Defines when a policy shall be executed. */
export enum ApplyPolicy {
  /** After the resolver was executed. */
  AfterResolver = 'AFTER_RESOLVER',
  /** Before the resolver was executed. */
  BeforeResolver = 'BEFORE_RESOLVER',
  /** The policy is applied in the validation step before the execution. */
  Validation = 'VALIDATION'
}

/** Information about the offset pagination. */
export type CollectionSegmentInfo = {
  __typename?: 'CollectionSegmentInfo';
  /** Indicates whether more items exist following the set defined by the clients arguments. */
  hasNextPage: Scalars['Boolean']['output'];
  /** Indicates whether more items exist prior the set defined by the clients arguments. */
  hasPreviousPage: Scalars['Boolean']['output'];
};

export type Contest = {
  __typename?: 'Contest';
  description: Scalars['String']['output'];
  id: Scalars['UUID']['output'];
  problems: Array<Problem>;
  slug: Scalars['String']['output'];
  submissions: Array<Submission>;
  title: Scalars['String']['output'];
};

export type DeleteProblemInput = {
  id: Scalars['ID']['input'];
};

export type DeleteProblemPayload = {
  __typename?: 'DeleteProblemPayload';
  problem?: Maybe<Problem>;
};

export type Error = {
  message: Scalars['String']['output'];
};

export type InvalidCredentialsError = Error & {
  __typename?: 'InvalidCredentialsError';
  message: Scalars['String']['output'];
};

export type KeyValuePairOfStringAndObject = {
  __typename?: 'KeyValuePairOfStringAndObject';
  key: Scalars['String']['output'];
};

export type Language = {
  __typename?: 'Language';
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
};

export type LoginError = InvalidCredentialsError | ValidationError;

export type LoginInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type LoginPayload = {
  __typename?: 'LoginPayload';
  accessToken?: Maybe<Scalars['String']['output']>;
  errors?: Maybe<Array<LoginError>>;
  me?: Maybe<User>;
  refreshToken?: Maybe<Scalars['String']['output']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  deleteProblem: DeleteProblemPayload;
  login: LoginPayload;
  register: RegisterPayload;
};


export type MutationDeleteProblemArgs = {
  input: DeleteProblemInput;
};


export type MutationLoginArgs = {
  input: LoginInput;
};


export type MutationRegisterArgs = {
  input: RegisterInput;
};

/** The node interface is implemented by entities that have a global unique identifier. */
export type Node = {
  id: Scalars['ID']['output'];
};

export type Problem = Node & {
  __typename?: 'Problem';
  description: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  maxMemory: Scalars['Int']['output'];
  maxMemoryString: Scalars['String']['output'];
  maxTime: Scalars['TimeSpan']['output'];
  maxTimeString: Scalars['String']['output'];
  slug: Scalars['String']['output'];
  submissions?: Maybe<SubmissionsCollectionSegment>;
  testCases: Array<TestCase>;
  title: Scalars['String']['output'];
};


export type ProblemSubmissionsArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};

/** A segment of a collection. */
export type ProblemsCollectionSegment = {
  __typename?: 'ProblemsCollectionSegment';
  /** A flattened list of the items. */
  items?: Maybe<Array<Problem>>;
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfo;
};

export type Query = {
  __typename?: 'Query';
  languages: Array<Language>;
  me?: Maybe<User>;
  /** Fetches an object given its ID. */
  node?: Maybe<Node>;
  /** Lookup nodes by a list of IDs. */
  nodes: Array<Maybe<Node>>;
  problemById?: Maybe<Problem>;
  problemBySlug?: Maybe<Problem>;
  problems?: Maybe<ProblemsCollectionSegment>;
  userById?: Maybe<User>;
  users: Array<User>;
};


export type QueryNodeArgs = {
  id: Scalars['ID']['input'];
};


export type QueryNodesArgs = {
  ids: Array<Scalars['ID']['input']>;
};


export type QueryProblemByIdArgs = {
  id: Scalars['ID']['input'];
};


export type QueryProblemBySlugArgs = {
  slug: Scalars['String']['input'];
};


export type QueryProblemsArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryUserByIdArgs = {
  id: Scalars['ID']['input'];
};

export type RegisterError = RegistrationFailedError | ValidationError;

export type RegisterInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
  userName: Scalars['String']['input'];
};

export type RegisterPayload = {
  __typename?: 'RegisterPayload';
  accessToken?: Maybe<Scalars['String']['output']>;
  errors?: Maybe<Array<RegisterError>>;
  me?: Maybe<User>;
  refreshToken?: Maybe<Scalars['String']['output']>;
};

export type RegistrationFailedError = Error & {
  __typename?: 'RegistrationFailedError';
  message: Scalars['String']['output'];
};

export enum Severity {
  Error = 'ERROR',
  Info = 'INFO',
  Warning = 'WARNING'
}

export type Submission = {
  __typename?: 'Submission';
  contest?: Maybe<Contest>;
  contestId?: Maybe<Scalars['UUID']['output']>;
  id: Scalars['UUID']['output'];
  problem: Problem;
  problemId: Scalars['UUID']['output'];
  submitter: User;
  submitterId: Scalars['UUID']['output'];
};

/** A segment of a collection. */
export type SubmissionsCollectionSegment = {
  __typename?: 'SubmissionsCollectionSegment';
  /** A flattened list of the items. */
  items?: Maybe<Array<Submission>>;
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfo;
};

export type TestCase = {
  __typename?: 'TestCase';
  input: Scalars['String']['output'];
  isSample: Scalars['Boolean']['output'];
  key: Scalars['Int']['output'];
  output: Scalars['String']['output'];
};

export type User = Node & {
  __typename?: 'User';
  email?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  internalId: Scalars['UUID']['output'];
  phoneNumber?: Maybe<Scalars['String']['output']>;
  roles: Array<Scalars['String']['output']>;
  userName?: Maybe<Scalars['String']['output']>;
};

export type ValidationError = Error & {
  __typename?: 'ValidationError';
  errors?: Maybe<Array<Maybe<ValidationFailure>>>;
  message: Scalars['String']['output'];
};

export type ValidationFailure = {
  __typename?: 'ValidationFailure';
  errorCode?: Maybe<Scalars['String']['output']>;
  errorMessage?: Maybe<Scalars['String']['output']>;
  formattedMessagePlaceholderValues?: Maybe<Array<KeyValuePairOfStringAndObject>>;
  propertyName?: Maybe<Scalars['String']['output']>;
  severity: Severity;
};

export type Header_UserQueryQueryVariables = Exact<{ [key: string]: never; }>;


export type Header_UserQueryQuery = { __typename?: 'Query', me?: (
    { __typename?: 'User', id: string }
    & { ' $fragmentRefs'?: { 'HeaderAvatar_UserFragmentFragment': HeaderAvatar_UserFragmentFragment } }
  ) | null };

export type HeaderAvatar_UserFragmentFragment = { __typename?: 'User', id: string, userName?: string | null, email?: string | null } & { ' $fragmentName'?: 'HeaderAvatar_UserFragmentFragment' };

export type LoginMutationVariables = Exact<{
  input: LoginInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'LoginPayload', accessToken?: string | null, refreshToken?: string | null, me?: { __typename?: 'User', userName?: string | null } | null, errors?: Array<{ __typename: 'InvalidCredentialsError', message: string } | { __typename: 'ValidationError', message: string }> | null } };

export type RegisterMutationVariables = Exact<{
  input: RegisterInput;
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'RegisterPayload', accessToken?: string | null, refreshToken?: string | null, me?: { __typename?: 'User', email?: string | null } | null, errors?: Array<{ __typename: 'RegistrationFailedError', message: string } | { __typename: 'ValidationError', message: string }> | null } };

export type ProblemPage_ProblemQueryQueryVariables = Exact<{
  slug: Scalars['String']['input'];
}>;


export type ProblemPage_ProblemQueryQuery = { __typename?: 'Query', problemBySlug?: (
    { __typename?: 'Problem', id: string, maxMemory: number, maxTime: any, testCases: Array<{ __typename?: 'TestCase', key: number, input: string, output: string, isSample: boolean }> }
    & { ' $fragmentRefs'?: { 'ProblemStatement_ProblemFragmentFragment': ProblemStatement_ProblemFragmentFragment } }
  ) | null };

export type ProblemCell_ProblemFragmentFragment = { __typename?: 'Problem', id: string, slug: string, title: string, maxMemoryString: string, maxTimeString: string, submissions?: { __typename?: 'SubmissionsCollectionSegment', items?: Array<{ __typename?: 'Submission', id: any }> | null } | null } & { ' $fragmentName'?: 'ProblemCell_ProblemFragmentFragment' };

export type ProblemEditor_LanguagesQueryQueryVariables = Exact<{ [key: string]: never; }>;


export type ProblemEditor_LanguagesQueryQuery = { __typename?: 'Query', languages: Array<{ __typename?: 'Language', id: string, name: string }> };

export type ProblemStatement_ProblemFragmentFragment = { __typename?: 'Problem', title: string, description: string } & { ' $fragmentName'?: 'ProblemStatement_ProblemFragmentFragment' };

export type ProblemsTable_ProblemsQueryQueryVariables = Exact<{
  skip: Scalars['Int']['input'];
  take: Scalars['Int']['input'];
}>;


export type ProblemsTable_ProblemsQueryQuery = { __typename?: 'Query', problems?: { __typename?: 'ProblemsCollectionSegment', items?: Array<(
      { __typename?: 'Problem', id: string }
      & { ' $fragmentRefs'?: { 'ProblemCell_ProblemFragmentFragment': ProblemCell_ProblemFragmentFragment } }
    )> | null, pageInfo: { __typename?: 'CollectionSegmentInfo', hasNextPage: boolean, hasPreviousPage: boolean } } | null };

export const HeaderAvatar_UserFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"HeaderAvatar_UserFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"userName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]} as unknown as DocumentNode<HeaderAvatar_UserFragmentFragment, unknown>;
export const ProblemCell_ProblemFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ProblemCell_ProblemFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Problem"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"maxMemoryString"}},{"kind":"Field","name":{"kind":"Name","value":"maxTimeString"}},{"kind":"Field","name":{"kind":"Name","value":"submissions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<ProblemCell_ProblemFragmentFragment, unknown>;
export const ProblemStatement_ProblemFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ProblemStatement_ProblemFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Problem"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}}]} as unknown as DocumentNode<ProblemStatement_ProblemFragmentFragment, unknown>;
export const Header_UserQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Header_UserQuery"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"HeaderAvatar_UserFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"HeaderAvatar_UserFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"userName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]} as unknown as DocumentNode<Header_UserQueryQuery, Header_UserQueryQueryVariables>;
export const LoginDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Login"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"LoginInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"login"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accessToken"}},{"kind":"Field","name":{"kind":"Name","value":"refreshToken"}},{"kind":"Field","name":{"kind":"Name","value":"me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userName"}}]}},{"kind":"Field","name":{"kind":"Name","value":"errors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Error"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}}]}}]} as unknown as DocumentNode<LoginMutation, LoginMutationVariables>;
export const RegisterDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Register"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"RegisterInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"register"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"email"}}]}},{"kind":"Field","name":{"kind":"Name","value":"accessToken"}},{"kind":"Field","name":{"kind":"Name","value":"refreshToken"}},{"kind":"Field","name":{"kind":"Name","value":"errors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Error"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}}]}}]} as unknown as DocumentNode<RegisterMutation, RegisterMutationVariables>;
export const ProblemPage_ProblemQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ProblemPage_ProblemQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"slug"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"problemBySlug"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"slug"},"value":{"kind":"Variable","name":{"kind":"Name","value":"slug"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"ProblemStatement_ProblemFragment"}},{"kind":"Field","name":{"kind":"Name","value":"maxMemory"}},{"kind":"Field","name":{"kind":"Name","value":"maxTime"}},{"kind":"Field","name":{"kind":"Name","value":"testCases"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"input"}},{"kind":"Field","name":{"kind":"Name","value":"output"}},{"kind":"Field","name":{"kind":"Name","value":"isSample"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ProblemStatement_ProblemFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Problem"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}}]} as unknown as DocumentNode<ProblemPage_ProblemQueryQuery, ProblemPage_ProblemQueryQueryVariables>;
export const ProblemEditor_LanguagesQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ProblemEditor_LanguagesQuery"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"languages"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<ProblemEditor_LanguagesQueryQuery, ProblemEditor_LanguagesQueryQueryVariables>;
export const ProblemsTable_ProblemsQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ProblemsTable_ProblemsQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"skip"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"take"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"problems"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"skip"},"value":{"kind":"Variable","name":{"kind":"Name","value":"skip"}}},{"kind":"Argument","name":{"kind":"Name","value":"take"},"value":{"kind":"Variable","name":{"kind":"Name","value":"take"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"ProblemCell_ProblemFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"pageInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"hasNextPage"}},{"kind":"Field","name":{"kind":"Name","value":"hasPreviousPage"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ProblemCell_ProblemFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Problem"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"maxMemoryString"}},{"kind":"Field","name":{"kind":"Name","value":"maxTimeString"}},{"kind":"Field","name":{"kind":"Name","value":"submissions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<ProblemsTable_ProblemsQueryQuery, ProblemsTable_ProblemsQueryQueryVariables>;