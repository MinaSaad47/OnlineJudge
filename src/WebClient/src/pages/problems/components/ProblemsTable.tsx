import { gql } from "@/__codegen__";
import ProblemCell from "@/pages/problems/components/ProblemCell";
import { useQuery } from "@apollo/client";
import {
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";

const ProblemsTable_ProblemsQuery = gql(`
  query ProblemsTable_ProblemsQuery($after: String) {
    
    problems(first: 10, after: $after) {
      edges {
        node {
          id
          ... ProblemCell_ProblemFragment
        }
      }
      pageInfo {
        endCursor
      }
    }
  }
`);

const columns = [
  {
    name: "Title",
    uid: "title",
    sortable: true,
  },
  {
    name: "MAX TIME",
    uid: "maxTime",
  },
  {
    name: "MAX MEMORY",
    uid: "maxMemory",
  },
  {
    name: "STATUS",
    uid: "status",
  },
  {
    name: "ACTIONS",
    uid: "actions",
  },
];

export default function ProblemsTable() {
  const { data, loading } = useQuery(ProblemsTable_ProblemsQuery, {
    variables: {
      after: null,
    },
  });

  const problems = data?.problems?.edges?.map((edge) => edge.node) ?? [];

  return (
    <Table isCompact selectionMode='none'>
      <TableHeader columns={[...columns]}>
        {(column) => (
          <TableColumn
            key={column.uid}
            align={column.uid === "actions" ? "center" : "start"}
            allowsSorting={column.sortable}>
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody
        emptyContent={"No problems"}
        items={problems}
        isLoading={loading}
        loadingContent={<Spinner />}>
        {(problem) => (
          <TableRow key={problem.id}>
            {(columnKey) => (
              <TableCell>
                {<ProblemCell problem={problem} columnKey={columnKey} />}
              </TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
