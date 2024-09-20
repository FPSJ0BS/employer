import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { useDispatch } from "react-redux";
import { openAdminModal } from "../../../Redux/AdminSlice";

interface Column {
  id: "name" | "code" | "population" | "size" | "density";
  label: string;
  minWidth?: number;
  align?: "right";
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  { id: "name", label: "Name", minWidth: 170 },
  { id: "code", label: "ISO\u00a0Code", minWidth: 100 },
  {
    id: "population",
    label: "Population",
    minWidth: 170,
    align: "right",
    format: (value: number) => value.toLocaleString("en-US"),
  },
  {
    id: "size",
    label: "Size\u00a0(km\u00b2)",
    minWidth: 170,
    align: "right",
    format: (value: number) => value.toLocaleString("en-US"),
  },
  {
    id: "density",
    label: "Density",
    minWidth: 170,
    align: "right",
    format: (value: number) => value.toFixed(2),
  },
];

interface Data {
  name: string;
  code: string;
  population: number;
  size: number;
  density: number;
}

function createData(
  name: string,
  code: string,
  population: number,
  size: number
): Data {
  const density = population / size;
  return { name, code, population, size, density };
}

const rows = [
  createData("India", "IN", 1324171354, 3287263),
  createData("India", "IN", 1324171354, 3287263),
  createData("India", "IN", 1324171354, 3287263),
  createData("India", "IN", 1324171354, 3287263),
  createData("India", "IN", 1324171354, 3287263),
  createData("India", "IN", 1324171354, 3287263),
  createData("India", "IN", 1324171354, 3287263),
  createData("India", "IN", 1324171354, 3287263),
  createData("India", "IN", 1324171354, 3287263),
  createData("India", "IN", 1324171354, 3287263),
  createData("India", "IN", 1324171354, 3287263),
];

export const EmployerTable = () => {

  const dispatch = useDispatch();
  const openModalAdmin = () => {
    dispatch(openAdminModal('test'))
  }

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper
      className="h-[100%] cursor-default dark:bg-backgroundOne dark:text-white"
      sx={{ width: "100%", overflow: "hidden" }}
    >
      <TableContainer className="h-[90%] dark:text-white">
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                  className="bg-[#eaeffa] dark:bg-backgroundOne dark:text-white"
                >
                  {column.label}
                </TableCell>
              ))}
              <TableCell className="bg-[#eaeffa] dark:bg-backgroundOne dark:text-white text-center">Actions</TableCell> {/* Add a cell for actions */}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow className="dark:text-white" hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell className="dark:text-white" key={column.id} align={column.align}>
                          {column.format && typeof value === "number"
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                    <TableCell className="text-center"> {/* Cell for buttons */}
                      <button className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600 mr-2">
                        Edit
                      </button>
                      <button onClick={() => openModalAdmin()} className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none focus:bg-red-600">
                        Delete
                      </button>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        className="bg-[#eaeffa] py-2 dark:bg-backgroundOne dark:text-white"
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};
