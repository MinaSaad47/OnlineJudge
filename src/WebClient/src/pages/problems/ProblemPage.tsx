import { gql } from "@/__codegen__";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import ProblemEditor from "@/pages/problems/components/ProblemEditor";
import ProblemHeader from "@/pages/problems/components/ProblemHeader";
import ProblemStatement from "@/pages/problems/components/ProblemStatement";
import { ProblemStoreProvider } from "@/stores/problem-store";
import { useQuery } from "@apollo/client";
import { Spinner } from "@nextui-org/react";
import { useParams } from "react-router-dom";

const ProblemPage_ProblemQuery = gql(`
  query ProblemPage_ProblemQuery($slug: String!) {
    problemBySlug(slug: $slug) {
      id
      ... ProblemStatement_ProblemFragment
      maxMemory
      maxTime
      testCases {
        key
        input
        output
        isSample
      }
    }
  }
`);

const ProblemPage = () => {
  const { slug } = useParams<{ slug: string }>();

  const { data, loading } = useQuery(ProblemPage_ProblemQuery, {
    variables: {
      slug: slug!,
    },
  });

  if (loading) {
    return <Spinner className='flex-1' />;
  }

  return (
    <ProblemStoreProvider problemId={data!.problemBySlug!.id}>
      <div className='flex flex-col h-screen'>
        <ProblemHeader />
        <ResizablePanelGroup direction='horizontal' className='flex-grow'>
          <ResizablePanel defaultSize={50} className='p-2'>
            <ProblemStatement problem={data!.problemBySlug!} />
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={50}>
            <ResizablePanelGroup direction='vertical'>
              <ResizablePanel defaultSize={50} className='p-2'>
                <ProblemEditor />
              </ResizablePanel>
              <ResizableHandle withHandle />
              <ResizablePanel defaultSize={50}></ResizablePanel>
            </ResizablePanelGroup>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </ProblemStoreProvider>
  );
};

export default ProblemPage;
