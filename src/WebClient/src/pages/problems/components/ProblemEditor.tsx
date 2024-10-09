import useProblemStore from "@/stores/problem-store";
import Editor from "@monaco-editor/react";
import { Card, CardBody, CardHeader } from "@nextui-org/react";

function ProblemEditor() {
  const sourceCode = useProblemStore((state) => state.sourceCode);
  const setSourceCode = useProblemStore((state) => state.setSourceCode);

  return (
    <Card className='h-full'>
      <CardHeader className='flex h-8 p-1 item-center shadow-large'>
        <h2 className='font-bold'>Problem Editor</h2>
      </CardHeader>
      <CardBody className='p-0 overflow-clip'>
        <Editor
          language={"cpp"}
          value={sourceCode}
          onChange={(value) => setSourceCode(value ?? "")}
          theme='vs-dark'
          options={{
            minimap: { enabled: false },
          }}
        />
      </CardBody>
    </Card>
  );
}

export default ProblemEditor;
