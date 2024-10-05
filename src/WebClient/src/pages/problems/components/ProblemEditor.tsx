import { gql } from "@/__codegen__";
import { useQuery } from "@apollo/client";
import Editor from "@monaco-editor/react";
import {
  Card,
  CardBody,
  CardHeader,
  Select,
  SelectItem,
  Spinner,
} from "@nextui-org/react";
import { useState } from "react";

const ProblemEditor_LanguagesQuery = gql(`
    query ProblemEditor_LanguagesQuery {
        languages {
            id
            name
        }
    }
`);

function ProblemEditor() {
  const { data, loading } = useQuery(ProblemEditor_LanguagesQuery);
  const [language, setLanguage] = useState(data?.languages[0].name ?? "cpp");

  if (loading) {
    return <Spinner className='size-full' />;
  }

  return (
    <Card className='h-full'>
      <CardHeader className='flex p-1 item-center shadow-large'>
        <h2 className='text-lg font-bold'>Problem Editor</h2>
        <Select
          label='Language'
          value={language}
          defaultSelectedKeys={[language]}
          className='w-[25%] ml-auto'
          labelPlacement='inside'
          size='sm'
          onChange={(e) => setLanguage(e.target.value)}>
          {data!.languages.map((language) => (
            <SelectItem key={language.id}>{language.name}</SelectItem>
          ))}
        </Select>
      </CardHeader>
      <CardBody className='p-0 overflow-clip'>
        <Editor
          language={language}
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
