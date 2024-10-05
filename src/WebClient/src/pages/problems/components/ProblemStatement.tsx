import { FragmentType, gql, useFragment } from "@/__codegen__";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardBody, CardHeader } from "@nextui-org/react";
import MDEditor from "@uiw/react-md-editor";

const ProblemStatement_ProblemFragment = gql(`
  fragment ProblemStatement_ProblemFragment on Problem {
    title
    description
  }
`);

type ProblemStatementProps = {
  problem: FragmentType<typeof ProblemStatement_ProblemFragment>;
};

function ProblemStatement(props: ProblemStatementProps) {
  const problem = useFragment(ProblemStatement_ProblemFragment, props.problem);

  return (
    <Card className='h-full'>
      <CardHeader className='flex items-center justify-center text-xl font-bold text-white shadow-large'>
        {problem.title}
      </CardHeader>
      <CardBody className='h-0'>
        <ScrollArea>
          <MDEditor.Markdown
            source={problem.description}
            className='p-6'
            style={{
              background: "transparent",
            }}
          />
        </ScrollArea>
      </CardBody>
    </Card>
  );
}

export default ProblemStatement;
