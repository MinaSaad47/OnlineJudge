import { gql } from "@/__codegen__";
import useProblemStore from "@/stores/problem-store";
import { useQuery } from "@apollo/client";
import { Select, SelectItem, Spinner } from "@nextui-org/react";

const LanguageSelector_LanguagesQuery = gql(`
    query ProblemEditor_LanguagesQuery {
        languages {
            id
            name
        }
    }
`);

function LanguageSelector() {
  const { data, loading } = useQuery(LanguageSelector_LanguagesQuery);

  const language = useProblemStore((state) => state.language);
  const setLanguage = useProblemStore((state) => state.setLanguage);

  if (loading) {
    return <Spinner className='size-full' />;
  }

  return (
    <Select
      label='Language'
      value={language}
      defaultSelectedKeys={[language]}
      className='w-[25%] p-0 m-0 h-6'
      classNames={{
        base: "h-6",
      }}
      labelPlacement='outside'
      disableSelectorIconRotation
      onChange={(e) => setLanguage(e.target.value)}>
      {data!.languages.map((language) => (
        <SelectItem key={language.id}>{language.name}</SelectItem>
      ))}
    </Select>
  );
}

export default LanguageSelector;
