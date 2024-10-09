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
  /** The `DateTime` scalar represents an ISO-8601 compliant date time type. */
  DateTime: { input: any; output: any; }
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
  submitAnswer: SubmitAnswerPayload;
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


export type MutationSubmitAnswerArgs = {
  input: SubmitAnswerInput;
};

/** The node interface is implemented by entities that have a global unique identifier. */
export type Node = {
  id: Scalars['ID']['output'];
};

/** Information about pagination in a connection. */
export type PageInfo = {
  __typename?: 'PageInfo';
  /** When paginating forwards, the cursor to continue. */
  endCursor?: Maybe<Scalars['String']['output']>;
  /** Indicates whether more edges exist following the set defined by the clients arguments. */
  hasNextPage: Scalars['Boolean']['output'];
  /** Indicates whether more edges exist prior the set defined by the clients arguments. */
  hasPreviousPage: Scalars['Boolean']['output'];
  /** When paginating backwards, the cursor to continue. */
  startCursor?: Maybe<Scalars['String']['output']>;
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
  submissions?: Maybe<SubmissionsConnection>;
  testCases: Array<TestCase>;
  title: Scalars['String']['output'];
};


export type ProblemSubmissionsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
};

/** A connection to a list of items. */
export type ProblemsConnection = {
  __typename?: 'ProblemsConnection';
  /** A list of edges. */
  edges?: Maybe<Array<ProblemsEdge>>;
  /** A flattened list of the nodes. */
  nodes?: Maybe<Array<Problem>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

/** An edge in a connection. */
export type ProblemsEdge = {
  __typename?: 'ProblemsEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node: Problem;
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
  problems?: Maybe<ProblemsConnection>;
  submissionById?: Maybe<Submission>;
  submissions?: Maybe<SubmissionsCollectionSegment>;
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
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
};


export type QuerySubmissionByIdArgs = {
  id: Scalars['ID']['input'];
};


export type QuerySubmissionsArgs = {
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

export type Status = {
  message: Scalars['String']['output'];
};

export type Submission = Node & {
  __typename?: 'Submission';
  contest?: Maybe<Contest>;
  id: Scalars['ID']['output'];
  isFinished: Scalars['Boolean']['output'];
  language: Language;
  problem: Problem;
  sourceCode: Scalars['String']['output'];
  status: Status;
  submittedAt: Scalars['DateTime']['output'];
  submitter: User;
};

export type SubmissionAccepted = Status & {
  __typename?: 'SubmissionAccepted';
  message: Scalars['String']['output'];
};

export type SubmissionCompileError = Status & {
  __typename?: 'SubmissionCompileError';
  error: Scalars['String']['output'];
  message: Scalars['String']['output'];
};

export type SubmissionCompiling = Status & {
  __typename?: 'SubmissionCompiling';
  message: Scalars['String']['output'];
};

export type SubmissionEvaluating = Status & {
  __typename?: 'SubmissionEvaluating';
  message: Scalars['String']['output'];
};

export type SubmissionPending = Status & {
  __typename?: 'SubmissionPending';
  message: Scalars['String']['output'];
};

export type SubmissionRejected = Status & {
  __typename?: 'SubmissionRejected';
  actualOutput: Scalars['String']['output'];
  message: Scalars['String']['output'];
  testCase: TestCase;
};

export type SubmissionRuntimeError = Status & {
  __typename?: 'SubmissionRuntimeError';
  error: Scalars['String']['output'];
  message: Scalars['String']['output'];
};

/** A segment of a collection. */
export type SubmissionsCollectionSegment = {
  __typename?: 'SubmissionsCollectionSegment';
  /** A flattened list of the items. */
  items?: Maybe<Array<Submission>>;
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfo;
};

/** A connection to a list of items. */
export type SubmissionsConnection = {
  __typename?: 'SubmissionsConnection';
  /** A list of edges. */
  edges?: Maybe<Array<SubmissionsEdge>>;
  /** A flattened list of the nodes. */
  nodes?: Maybe<Array<Submission>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

/** An edge in a connection. */
export type SubmissionsEdge = {
  __typename?: 'SubmissionsEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node: Submission;
};

export type SubmitAnswerInput = {
  languageId: Scalars['String']['input'];
  problemId: Scalars['ID']['input'];
  sourceCode: Scalars['String']['input'];
};

export type SubmitAnswerPayload = {
  __typename?: 'SubmitAnswerPayload';
  submission?: Maybe<Submission>;
};

export type Subscription = {
  __typename?: 'Subscription';
  onSubmission: Submission;
};


export type SubscriptionOnSubmissionArgs = {
  id: Scalars['ID']['input'];
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

export type ProblemEditor_LanguagesQueryQueryVariables = Exact<{ [key: string]: never; }>;


export type ProblemEditor_LanguagesQueryQuery = { __typename?: 'Query', languages: Array<{ __typename?: 'Language', id: string, name: string }> };

export type ProblemCell_ProblemFragmentFragment = { __typename?: 'Problem', id: string, slug: string, title: string, maxMemoryString: string, maxTimeString: string } & { ' $fragmentName'?: 'ProblemCell_ProblemFragmentFragment' };

export type ProblemStatement_ProblemFragmentFragment = { __typename?: 'Problem', title: string, description: string } & { ' $fragmentName'?: 'ProblemStatement_ProblemFragmentFragment' };

export type ProblemsTable_ProblemsQueryQueryVariables = Exact<{
  after?: InputMaybe<Scalars['String']['input']>;
}>;


export type ProblemsTable_ProblemsQueryQuery = { __typename?: 'Query', problems?: { __typename?: 'ProblemsConnection', edges?: Array<{ __typename?: 'ProblemsEdge', node: (
        { __typename?: 'Problem', id: string }
        & { ' $fragmentRefs'?: { 'ProblemCell_ProblemFragmentFragment': ProblemCell_ProblemFragmentFragment } }
      ) }> | null, pageInfo: { __typename?: 'PageInfo', endCursor?: string | null } } | null };

export type SubmissionButton_SubmitAnswerMutationMutationVariables = Exact<{
  input: SubmitAnswerInput;
}>;


export type SubmissionButton_SubmitAnswerMutationMutation = { __typename?: 'Mutation', submitAnswer: { __typename?: 'SubmitAnswerPayload', submission?: { __typename?: 'Submission', id: string, isFinished: boolean, status: { __typename: 'SubmissionAccepted', message: string } | { __typename: 'SubmissionCompileError', message: string } | { __typename: 'SubmissionCompiling', message: string } | { __typename: 'SubmissionEvaluating', message: string } | { __typename: 'SubmissionPending', message: string } | { __typename: 'SubmissionRejected', message: string } | { __typename: 'SubmissionRuntimeError', message: string } } | null } };

export type SubmissionButton_OnSubmissionSubscriptionSubscriptionVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type SubmissionButton_OnSubmissionSubscriptionSubscription = { __typename?: 'Subscription', onSubmission: { __typename?: 'Submission', id: string, isFinished: boolean, status: { __typename: 'SubmissionAccepted', message: string } | { __typename: 'SubmissionCompileError', message: string } | { __typename: 'SubmissionCompiling', message: string } | { __typename: 'SubmissionEvaluating', message: string } | { __typename: 'SubmissionPending', message: string } | { __typename: 'SubmissionRejected', message: string } | { __typename: 'SubmissionRuntimeError', message: string } } };

export const HeaderAvatar_UserFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"HeaderAvatar_UserFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"userName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]} as unknown as DocumentNode<HeaderAvatar_UserFragmentFragment, unknown>;
export const ProblemCell_ProblemFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ProblemCell_ProblemFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Problem"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"maxMemoryString"}},{"kind":"Field","name":{"kind":"Name","value":"maxTimeString"}}]}}]} as unknown as DocumentNode<ProblemCell_ProblemFragmentFragment, unknown>;
export const ProblemStatement_ProblemFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ProblemStatement_ProblemFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Problem"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}}]} as unknown as DocumentNode<ProblemStatement_ProblemFragmentFragment, unknown>;
export const Header_UserQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Header_UserQuery"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"HeaderAvatar_UserFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"HeaderAvatar_UserFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"userName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]} as unknown as DocumentNode<Header_UserQueryQuery, Header_UserQueryQueryVariables>;
export const LoginDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Login"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"LoginInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"login"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accessToken"}},{"kind":"Field","name":{"kind":"Name","value":"refreshToken"}},{"kind":"Field","name":{"kind":"Name","value":"me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userName"}}]}},{"kind":"Field","name":{"kind":"Name","value":"errors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Error"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}}]}}]} as unknown as DocumentNode<LoginMutation, LoginMutationVariables>;
export const RegisterDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Register"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"RegisterInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"register"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"email"}}]}},{"kind":"Field","name":{"kind":"Name","value":"accessToken"}},{"kind":"Field","name":{"kind":"Name","value":"refreshToken"}},{"kind":"Field","name":{"kind":"Name","value":"errors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Error"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}}]}}]} as unknown as DocumentNode<RegisterMutation, RegisterMutationVariables>;
export const ProblemPage_ProblemQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ProblemPage_ProblemQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"slug"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"problemBySlug"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"slug"},"value":{"kind":"Variable","name":{"kind":"Name","value":"slug"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"ProblemStatement_ProblemFragment"}},{"kind":"Field","name":{"kind":"Name","value":"maxMemory"}},{"kind":"Field","name":{"kind":"Name","value":"maxTime"}},{"kind":"Field","name":{"kind":"Name","value":"testCases"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"input"}},{"kind":"Field","name":{"kind":"Name","value":"output"}},{"kind":"Field","name":{"kind":"Name","value":"isSample"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ProblemStatement_ProblemFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Problem"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}}]} as unknown as DocumentNode<ProblemPage_ProblemQueryQuery, ProblemPage_ProblemQueryQueryVariables>;
export const ProblemEditor_LanguagesQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ProblemEditor_LanguagesQuery"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"languages"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<ProblemEditor_LanguagesQueryQuery, ProblemEditor_LanguagesQueryQueryVariables>;
export const ProblemsTable_ProblemsQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ProblemsTable_ProblemsQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"after"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"problems"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"IntValue","value":"10"}},{"kind":"Argument","name":{"kind":"Name","value":"after"},"value":{"kind":"Variable","name":{"kind":"Name","value":"after"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"ProblemCell_ProblemFragment"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"pageInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"endCursor"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ProblemCell_ProblemFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Problem"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"maxMemoryString"}},{"kind":"Field","name":{"kind":"Name","value":"maxTimeString"}}]}}]} as unknown as DocumentNode<ProblemsTable_ProblemsQueryQuery, ProblemsTable_ProblemsQueryQueryVariables>;
export const SubmissionButton_SubmitAnswerMutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SubmissionButton_SubmitAnswerMutation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SubmitAnswerInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"submitAnswer"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"submission"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"status"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}},{"kind":"Field","name":{"kind":"Name","value":"isFinished"}}]}}]}}]}}]} as unknown as DocumentNode<SubmissionButton_SubmitAnswerMutationMutation, SubmissionButton_SubmitAnswerMutationMutationVariables>;
export const SubmissionButton_OnSubmissionSubscriptionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"SubmissionButton_OnSubmissionSubscription"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"onSubmission"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"status"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}},{"kind":"Field","name":{"kind":"Name","value":"isFinished"}}]}}]}}]} as unknown as DocumentNode<SubmissionButton_OnSubmissionSubscriptionSubscription, SubmissionButton_OnSubmissionSubscriptionSubscriptionVariables>;