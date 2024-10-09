import { gql } from "@/__codegen__";
import useProblemStore from "@/stores/problem-store";
import { useMutation, useSubscription } from "@apollo/client";
import { Button } from "@nextui-org/react";

const SubmissionButton_SubmitAnswerMutation = gql(`
  mutation SubmissionButton_SubmitAnswerMutation($input: SubmitAnswerInput!) {
    submitAnswer(input: $input) {
      submission {
        id
        status {
          __typename
          message
        }
        isFinished
      }
    }
  }
`);

const SubmissionButton_SubmitAnswerSubscription = gql(`
  subscription SubmissionButton_OnSubmissionSubscription($id: ID!) {
  onSubmission(id: $id)    {
    id
    status {
      __typename
      message
    }
    isFinished
  }
  }
`);

function SubmissionButton() {
  const language = useProblemStore((state) => state.language);
  const sourceCode = useProblemStore((state) => state.sourceCode);
  const problemId = useProblemStore((state) => state.problemId);
  const setCompileError = useProblemStore((state) => state.setCompileError);
  const setError = useProblemStore((state) => state.setError);

  const [submitAnswer, { loading: mutationLoading, data: mutationData }] =
    useMutation(SubmissionButton_SubmitAnswerMutation);

  const { data: subscriptionData } = useSubscription(
    SubmissionButton_SubmitAnswerSubscription,
    {
      skip: typeof mutationData?.submitAnswer?.submission?.id !== "string",
      variables: {
        id: mutationData?.submitAnswer?.submission?.id ?? "",
      },
      onData: (data) => {
        if (
          data.data.data?.onSubmission.status.__typename ===
          "SubmissionCompileError"
        ) {
          setCompileError("Compile Error");
        }
        if (
          data.data.data?.onSubmission.status.__typename ===
          "SubmissionRuntimeError"
        ) {
          setError("Runtime Error");
        }
      },
      onComplete: () => {
        console.log("complete");
      },
    }
  );

  const onSubmission = async () => {
    await submitAnswer({
      variables: {
        input: {
          problemId,
          languageId: language,
          sourceCode,
        },
      },
    });
  };

  const submission =
    subscriptionData?.onSubmission ?? mutationData?.submitAnswer?.submission;

  return (
    <Button
      className='mt-1'
      isLoading={mutationLoading || submission?.isFinished === false}
      onClick={onSubmission}>
      {submission?.isFinished === false
        ? submission.status.message
        : "Submit Answer"}
    </Button>
  );
}

export default SubmissionButton;
