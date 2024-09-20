/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect, useRef } from "react";
import {
  Button,
  Table as MuiTable,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  Select,
  MenuItem,
  FormControl,
  IconButton,
} from "@mui/material";
import { Add, MoreVert } from "@mui/icons-material";

interface PageOptions {
  pageSize: number;
  current: number;
  total: number;
  showSizeChanger: boolean;
  pageSizeOptions?: number[];
}

interface TableProps<T> {
  headers: Array<{
    dataIndex: string;
    label: string;
    sortable?: boolean;
    render?: any;
    className?: any;
  }>;
  data: T[];
  onSelect?: (selectedRows: T[]) => void;
  pageOptions?: PageOptions;
  className?: string;
  onChange?: (ref: any) => void;
  length?: number;
  modalOnPress?: () => void;
  menuOnPress?: (event: any, id: any) => void;
  open?: any;
  buttonText?: string;
}

type ITable<T> = TableProps<T>;

const TableComponent = <T extends Record<string, any>>(props: ITable<T>) => {
  const {
    headers,
    data,
    onSelect,
    onChange,
    className,
    modalOnPress,
    menuOnPress,
    open,
    buttonText,
  } = props;

  const listInnerRef = useRef<any>(null);
  const [sortedData, setSortedData] = useState<T[]>(data);
  const [selectedRows, setSelectedRows] = useState<T[]>([]);
  const [sortColumn, setSortColumn] = useState<keyof T | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);

  const handleSort = (column: keyof T) => {
    setSortColumn(column);
    setSortOrder(sortColumn === column && sortOrder === "asc" ? "desc" : "asc");
  };

  useEffect(() => {
    let sorted = [...data];
    if (sortColumn) {
      sorted = sorted.sort((a, b) => {
        const valueA = a[sortColumn];
        const valueB = b[sortColumn];

        if (valueA < valueB) {
          return sortOrder === "asc" ? -1 : 1;
        }
        if (valueA > valueB) {
          return sortOrder === "asc" ? 1 : -1;
        }
        return 0;
      });
    }

    setSortedData(sorted);
  }, [data, sortColumn, sortOrder]);

  const handleRowSelect = (row: T) => {
    const isSelected = selectedRows.some((selectedRow) => selectedRow === row);
    if (isSelected) {
      setSelectedRows(
        selectedRows.filter((selectedRow) => selectedRow !== row)
      );
    } else {
      setSelectedRows([...selectedRows, row]);
    }
  };

  const handleSelectAll = () => {
    const allSelected = sortedData.length === selectedRows.length;
    if (allSelected) {
      setSelectedRows([]);
    } else {
      setSelectedRows([...sortedData]);
    }
  };

  useEffect(() => {
    if (onSelect) {
      onSelect(selectedRows);
    }
  }, [onSelect, selectedRows]);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: any) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const onScroll = () => {
    onChange?.(listInnerRef);
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      {modalOnPress && buttonText && (
        <div className="flex justify-between mb-4">
          <Button
            variant="contained"
            color="error"
            startIcon={<Add />}
            className="bg-mainBgColor p-[10px] text-white rounded-lg"
            onClick={modalOnPress}
          >
            {buttonText}
          </Button>
        </div>
      )}
      <TableContainer
        component={Paper}
        className={`${className} overflow-x-auto`}
        onScroll={onScroll}
        ref={listInnerRef}
      >
        <MuiTable className="shadow-md sm:rounded-lg w-full text-left text-white divide-y divide-grayBold h-auto">
          <TableHead className="bg-white sticky top-0 w-full">
            <TableRow>
              {headers.map((header) => (
                <TableCell
                  key={header.dataIndex as string}
                  onClick={() =>
                    header.sortable && handleSort(header.dataIndex)
                  }
                  className={`pb-6 last:pr-4 text-base font-semibold leading-6 ${header?.className}`}
                >
                  {header.label.charAt(0).toUpperCase() + header.label.slice(1)}
                </TableCell>
              ))}
              {onSelect && (
                <TableCell>
                  <input
                    type="checkbox"
                    checked={
                      sortedData.length > 0 &&
                      sortedData.length === selectedRows.length
                    }
                    onChange={handleSelectAll}
                  />
                </TableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody className="divide-y divide-grayBold text-base font-normal leading-6 ">
            {sortedData.length > 0 ? (
              sortedData
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, rowIndex) => (
                  <TableRow
                    key={rowIndex}
                    className="flex-1 items-center gap-5 "
                    onClick={() => handleRowSelect(row)}
                  >
                    {headers.map((header) =>
                      header.dataIndex !== "Action" ? (
                        <TableCell
                          className="py-2.5 flex-1 items-center pr-6 align-top "
                          key={`${rowIndex}-${String(header.dataIndex)}`}
                        >
                          <div className="flex flex-row gap-2">
                            {header.dataIndex === "firstName" && (
                              <>
                                {(row?.image || row?.user?.image) && (
                                  <img
                                    src={row?.image || row?.user?.image}
                                    className="rounded w-[26px] max-h-[26px] mt-1.5"
                                  />
                                )}
                              </>
                            )}
                            {header.render ? (
                              <header.render {...row} index={rowIndex} />
                            ) : (
                              row[header.dataIndex]
                            )}
                          </div>
                        </TableCell>
                      ) : (
                        menuOnPress && (
                          <TableCell>
                            <IconButton
                              aria-label="more"
                              aria-controls={open ? "long-menu" : undefined}
                              aria-haspopup="true"
                              onClick={(e) => menuOnPress(e, row)}
                              sx ={{padding:0}}
                            >
                              <MoreVert />
                            </IconButton>
                          </TableCell>
                        )
                      )
                    )}
                  </TableRow>
                ))
            ) : (
              <TableRow>
                <TableCell
                  className="px-6 py-4 text-center"
                  colSpan={headers.length + (onSelect ? 1 : 0)}
                >
                  No data available
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </MuiTable>
        <div className="flex items-center justify-between p-2">
          <FormControl variant="outlined" size="small">
            <Select
              value={String(rowsPerPage)}
              onChange={handleChangeRowsPerPage}
              className="bg-white"
            >
              {[10, 25, 50].map((size) => (
                <MenuItem key={size} value={size}>
                  Show {size}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TablePagination
            rowsPerPageOptions={[10, 25, 50]}
            component="div"
            count={data.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </div>
      </TableContainer>
    </div>
  );
};

export default TableComponent;
