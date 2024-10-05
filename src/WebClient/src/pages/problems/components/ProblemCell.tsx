import { FragmentType, gql, useFragment } from "@/__codegen__";
import { Chip, Link } from "@nextui-org/react";
import React from "react";

const ProblemCell_ProblemFragment = gql(`
    fragment ProblemCell_ProblemFragment on Problem {
        id
        slug
        title
        maxMemoryString
        maxTimeString
        submissions {
          items {
            id
          }
        }
    }
`);

type ProblemCellProps = {
  problem: FragmentType<typeof ProblemCell_ProblemFragment>;
  columnKey: React.Key;
};

function ProblemCell(props: ProblemCellProps) {
  const problem = useFragment(ProblemCell_ProblemFragment, props.problem);
  const columnKey = props.columnKey;

  switch (columnKey) {
    case "title":
      return (
        <Link
          href={`/problems/${problem.slug}`}
          underline='hover'
          color='success'>
          {problem.title}
        </Link>
      );
    case "maxMemory":
      return <div>{problem.maxMemoryString}</div>;
    case "maxTime":
      return <div>{problem.maxTimeString}</div>;
    case "status": {
      const submission = problem.submissions?.items?.[0];
      if (submission) {
        return <Chip color='success'>Accepted</Chip>;
      }
      return <Chip color='default'>Not Solved</Chip>;
    }
    default:
      return <></>;
  }
}

export default ProblemCell;
