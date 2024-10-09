import LanguageSelector from "@/pages/problems/components/LanguageSelector";
import SubmissionButton from "@/pages/problems/components/SubmissionButon";

function ProblemHeader() {
  return (
    <div className='flex items-center justify-between'>
      <SubmissionButton />
      <LanguageSelector />
    </div>
  );
}

export default ProblemHeader;
